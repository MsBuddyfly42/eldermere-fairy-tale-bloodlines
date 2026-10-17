const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const key = 'templar-eldermere-v1', backupKey = key + '-backup';
const save = () => ({coins: 137, scene: 'library', clues: ['archive'], inventory: ['lantern'], placed: ['lantern'], minutes: 815, crafted: 4, academy: 2, solved: false, mode: 'adventure'});
function boot(entries = {}, game = false) {
  const storage = new Map(Object.entries(entries)), elements = {}, listeners = {}, downloads = [];
  let failRead = false, failWrite = null, offset = 0;
  class TestDate extends Date {static now() {return Date.now() + offset;}}
  function element() {return {style: {}, dataset: {}, children: [], classList: {toggle() {}}, append(x) {this.children.push(x);}, insertAdjacentHTML() {}, showModal() {this.open = true;}, close() {this.open = false;}, click() {downloads.push(this);}, value: ''};}
  const context = vm.createContext({
    window: {addEventListener(name, fn) {listeners[name] = fn;}},
    document: {getElementById(id) {return elements[id] ??= element();}, createElement: element, querySelectorAll() {return [];}},
    localStorage: {getItem(k) {if(failRead) throw Error('Storage denied');return storage.get(k) ?? null;}, setItem(k,v) {if(failWrite === '*' || failWrite === k) throw Error('Storage full');storage.set(k,v);}},
    URL: {createObjectURL() {return 'blob:test';}, revokeObjectURL() {}}, Blob,
    setTimeout() {}, clearTimeout() {}, setInterval() {}, console, Date: TestDate, Math, Set
  });
  vm.runInContext(fs.readFileSync('dist/save-system.js', 'utf8'), context);
  if (game) vm.runInContext(fs.readFileSync('dist/game.js', 'utf8'), context);
  return {context, api: context.window.EldoriaSaves, storage, elements, listeners, downloads, advance(ms) {offset += ms;}, failReads() {failRead = true;}, failWrites(k = '*') {failWrite = k;}};
}
const old = save(), raw = JSON.stringify(old);
{
  const b = boot({[key]: raw});
  assert.equal(b.api.load(save).coins, 137);
  b.api.checkpoint();
  assert(b.api.write({...old, coins: 150}));
  assert(b.api.write({...old, coins: 170}));
  assert.equal(b.storage.get(backupKey), raw, 'autosaves must retain the session checkpoint');
  assert.equal(JSON.parse(b.storage.get(key)).coins, 170);
  assert.equal(JSON.parse(b.storage.get(key))._saveVersion, 1);
  b.advance(300001);
  assert(b.api.write({...old, coins: 190}));
  assert.equal(JSON.parse(b.storage.get(backupKey)).coins, 170, 'refresh the checkpoint after five minutes');
  const recovered = boot({[key]: '{bad json', [backupKey]: raw});
  assert.equal(recovered.api.load(save).coins, 137);
  assert.equal(recovered.storage.get(key + '-damaged'), '{bad json');
  assert(recovered.api.notice.includes('Recovered'));
  assert(recovered.api.write(old));
  assert.equal(recovered.storage.get(backupKey), raw);
  const recoveredGame = boot({[key]: '{bad json', [backupKey]: raw}, true);
  assert(recoveredGame.elements.saveWarning.textContent.includes('Recovered'));
  assert.equal(recoveredGame.elements.saveWarning.hidden, false);
}
{
  const b = boot({[key]: '{bad json'});
  b.api.load(save);
  assert.equal(b.api.blocked, true);
  assert.equal(b.api.write(old), false);
  assert.equal(b.storage.get(key), '{bad json', 'unrecoverable saves must not be overwritten by autosave');
  assert(b.api.startNew(save()));
  assert.equal(b.storage.get(key + '-damaged'), '{bad json');
  assert.equal(b.api.blocked, false);
}
{
  const b = boot({[key]: raw});b.failReads();b.api.load(save);
  assert.equal(b.api.blocked, true);
  assert(b.api.notice.includes('unavailable'));
  b.api.download(old);assert.equal(b.downloads.length, 1, 'download must work when browser saving is denied');
}
for (const k of [key, backupKey]) {
  const b = boot({[key]: raw});b.failWrites(k);
  assert.equal(b.api.write({...old, coins: 999}, true), false);
  assert.equal(b.storage.get(key), raw);
  assert(b.api.notice.includes('could not be saved'));
}
const invalid = [null, [], {coins: -1}, {scene: 'toString'}, {minutes: 'midnight'}, {minutes: 1440}, {crafted: -1}, {solved: 'yes'}, {clues: ['archive', 'archive']}, {clues: ['constructor']}, {inventory: {}}, {placed: ['harp']}, {life: []}, {life: {bag: {moonleaf: -1}}}, {life: {furniture: {chair: {x: 'bad', z: 1}}}}, {silverStory: {spoken: 'Nessa'}}, {headquarters: {pending: [{amount: '50', title: 'Quest'}]}}, {community: {history: {}}}, {community: {}}, {farms: {0: {}}}, {animalCare: {cat: {}}}, {headquarters: {accepted: {quest: {}}}}, {garden: [null]}, {_saveVersion: 999}];
const validator = boot().api;
for (const patch of invalid) assert.throws(() => validator.parse(JSON.stringify(patch === null || Array.isArray(patch) ? patch : {...old, ...patch})));
assert.throws(() => validator.parse(raw.replace('137', '1e999')));
assert.throws(() => validator.parse(raw.replace('"coins":137', '"__proto__":{},"coins":137')));
assert.throws(() => validator.parse(' '.repeat(validator.limit + 1)));
const rich = {...old, day: 12, visitors: ['Pip', 'Fern', 'Liora'], life: {bag: {moonleaf: 8}, family: {Glassmere: 'complete'}, events: {wish: true}, furniture: {chair: {x: 1, z: -2}}}, headquarters: {pending: [{amount: 25, title: 'A quest'}], history: [], accepted: {'quest': {title: 'A quest', startedAt: 500}}}, farms: {'conservatory:1': {stage: 'growing', crop: 'carrots', readyAt: 100000}}, silverStory: {step: 8, spoken: ['Nessa'], rewarded: false}, weather: 'sleet', futureFeature: {progress: 3}};
assert.deepEqual(JSON.parse(JSON.stringify(validator.parse(JSON.stringify(rich)))), rich, 'valid progress and future extension fields survive');

(async () => {
  const b = boot({[key]: raw}, true);
  b.context.window.onRealmSaveRestored = () => {b.context.restores = (b.context.restores || 0) + 1;};
  const input = {files: [{size: 4, async text() {return '{bad';}}], value: 'chosen'};
  const before = b.storage.get(key);
  assert.equal(await b.elements.savefile.onchange({target: input}), false);
  assert.equal(b.storage.get(key), before);
  assert.equal(b.context.restores, undefined);
  assert.equal(input.value, '');
  const oversized = {files: [{size: b.api.limit + 1, text() {throw Error('Must not read oversized files');}}]};
  assert.equal(await b.elements.savefile.onchange({target: oversized}), false);
  assert.equal(await b.elements.savefile.onchange({target: {files: []}}), false);
  vm.runInContext('state.coins=185', b.context);
  input.files = [{async text() {return JSON.stringify(rich);}}];
  assert.equal(await b.elements.savefile.onchange({target: input}), true);
  assert.equal(b.context.restores, 1, 'rebuild the world only after a valid restore');
  assert.equal(JSON.parse(b.storage.get(backupKey)).coins, 185, 'preserve current in-memory progress before import');
  assert.equal(JSON.parse(b.storage.get(key)).day, 12);
  const reloaded = boot(Object.fromEntries(b.storage));
  reloaded.api.load(save);reloaded.api.checkpoint();
  assert.equal(JSON.parse(reloaded.storage.get(backupKey)).coins, 185, 'reload after import must retain the pre-import backup');
  b.listeners.pagehide();
  assert.equal(JSON.parse(b.storage.get(key)).coins, rich.coins);
  b.failWrites();
  input.files = [{async text() {return raw;}}];
  assert.equal(await b.elements.savefile.onchange({target: input}), false);
  assert.equal(vm.runInContext('state.coins', b.context), rich.coins);
  assert.equal(b.context.restores, 1);
  console.log('Passed: legacy/full save validation, corrupt-save recovery, protected originals, stable checkpoints, denied/quota storage, safe imports, backup downloads and page-exit saves.');
})().catch(error => {console.error(error);process.exitCode = 1;});
