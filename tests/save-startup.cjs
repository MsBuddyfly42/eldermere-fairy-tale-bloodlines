const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');

const source = (fs.readFileSync('dist/save-system.js', 'utf8')+'\n'+fs.readFileSync('dist/game.js', 'utf8'));
const districts = ['capital', 'workshop', 'market', 'home', 'academy', 'forest', 'forgotten', 'festival', 'court', 'gardens', 'library'];
for (const scene of districts) {
  const elements = {};
  const writes = [];
  const save = {coins: 137, clues: ['archive'], inventory: ['lantern'], placed: ['lantern'], crafted: 4, academy: 2, solved: false, mode: 'adventure', scene, minutes: 815};
  function element() {
    return {style: {}, dataset: {}, children: [], classList: {toggle() {}}, append(child) {this.children.push(child);}, insertAdjacentHTML() {}, value: ''};
  }
  const context = vm.createContext({
    document: {getElementById(id) {return elements[id] ??= element();}, createElement: element, querySelectorAll() {return [];}},
    localStorage: {getItem() {return JSON.stringify(save);}, setItem(key, value) {if(key === 'templar-eldermere-v1') writes.push(JSON.parse(value));}},
    window: {addEventListener() {}}, setInterval() {}, setTimeout() {}, clearTimeout() {}, console, Date, Math, Set
  });
  assert.doesNotThrow(() => vm.runInContext(source, context), `Reloading a save in ${scene} must start the game`);
  assert.equal(vm.runInContext('scene', context), scene);
  assert.equal(elements.title.textContent, vm.runInContext('scenes[scene].name', context));
  assert.equal(elements.clock.textContent, '13:35');
  assert.equal(writes.length, 1, 'Only persist after all districts and UI extensions are ready');
  for (const field of ['coins', 'scene', 'minutes', 'crafted', 'academy']) assert.equal(writes[0][field], save[field]);
  assert.deepEqual(writes[0].clues, save.clues);
  assert.deepEqual(writes[0].placed, save.placed);
}
console.log('Passed: saved startup in all eleven districts, restored titles/time, preserved progress, and one initialized save write.');
