'use strict';
// Keep the original storage key and plain JSON format for existing saves.
window.EldoriaSaves = (() => {
  const key = 'templar-eldermere-v1', backupKey = key + '-backup', damagedKey = key + '-damaged';
  const limit = 5 * 1024 * 1024;
  let blocked = false, notice = '', lastSaved = null, checkpointAt = Date.now();
  const record = x => x !== null && typeof x === 'object' && !Array.isArray(x);
  const number = x => Number.isFinite(x) && x >= 0;
  const count = x => Number.isSafeInteger(x) && x >= 0;
  const text = x => typeof x === 'string';
  const bool = x => typeof x === 'boolean';
  const oneOf = values => x => values.includes(x);
  const list = test => x => Array.isArray(x) && x.every(test);
  const unique = test => x => list(test)(x) && new Set(x).size === x.length;
  const map = test => x => record(x) && Object.values(x).every(test);
  const shape = fields => x => record(x) && Object.entries(fields).every(([k, test]) => !(k in x) || test(x[k]));
  const required = fields => x => record(x) && Object.entries(fields).every(([k, test]) => k in x && test(x[k]));
  const point = x => record(x) && Number.isFinite(x.x) && Number.isFinite(x.z);
  const districts = ['capital', 'workshop', 'market', 'home', 'academy', 'forest', 'forgotten', 'festival', 'court', 'gardens', 'library'];
  const reward = x => record(x) && number(x.amount) && text(x.title) && (!('returnedAt' in x) || number(x.returnedAt));
  const schema = {
    coins: number, scene: oneOf(districts), minutes: x => number(x) && x < 1440,
    clues: unique(oneOf(['archive', 'manor', 'oak', 'orphanage', 'carriage', 'merchant'])),
    inventory: unique(oneOf(['lantern', 'rug', 'books', 'plant', 'harp'])), placed: unique(text),
    crafted: count, academy: count, day: x => count(x) && x > 0, solved: bool,
    mode: oneOf(['adventure', 'visit']), court: bool,
    homeType: oneOf(['Cottage', 'Treehouse', 'Manor', 'Little castle']),
    profession: oneOf(['Explorer', 'Shoemaker', 'Healer', 'Royal advisor', 'Detective', 'Merchant', 'Baker', 'Librarian', 'Guard', 'Teacher']),
    visitors: unique(oneOf(['Pip', 'Fern', 'Liora'])), mysteries: unique(oneOf(['jewel', 'letter'])),
    garden: x => Array.isArray(x) && x.length <= 6 && x.every(p => record(p) && p.name === 'Moonflower' && number(p.time)),
    worldPosition: point, friendships: map(count),
    witnessQuest: x => required({stage: text})(x) && shape({stage: oneOf(['available', 'follow', 'listen', 'letter', 'verify', 'seal', 'complete']), observed: number, rewarded: bool})(x),
    bellCase: x => required({stage: text})(x) && shape({stage: oneOf(['available', 'opening', 'search', 'question', 'follow', 'workshop', 'cellar', 'decision', 'complete']), clues: unique(text), answers: unique(text), rewarded: bool, choice: x => x === null || text(x)})(x),
    silverStory: x => required({step: count})(x) && shape({step: x => count(x) && x <= 11, spoken: unique(text), rewarded: bool})(x),
    cityElves: shape({friends: map(count), greeted: map(bool)}),
    cityCottage: shape({completed: map(bool), projects: map(bool), bag: map(count), comfort: map(bool), patches: map(required({readyAt: number})), journal: x => text(x) && x.length <= 2000, made: count}),
    citySky: shape({view: oneOf(['auto','day','night']), claimed: map(bool)}),
    cityNeighborhood: shape({visits: map(count), moments: map(bool)}),
    cityCounty: shape({initialized: bool, lastPromise: count, seen: map(count), stories: map(required({step: x => count(x) && x <= 3, complete: bool})), campDays: map(map(bool)), celebrated: map(bool), hidden: map(bool), reactions: map(bool), displays: map(bool), tent: bool,
      events: list(required({key: text, title: text, text: text, kind: text, day: text})), pending: list(x => required({source: count, kind: text, title: text, night: text})(x) && shape({done: bool})(x)), letters: list(required({key: text, person: text, title: text, text: text, day: text})), photos: map(required({title: text, image: text, day: text})), campKeepsakes: unique(text), sleep: required({key: text, dawn: count, woke: bool})}),
    cityPromise: shape({intention: text, initialized: bool, serial: count, seen: map(count), claimed: map(bool), answers: map(bool), items: list(required({id: count, title: text, kind: text, quality: oneOf(['Perfect']), night: text, purpose: text}))}),
    cityFortune: shape({initialized: bool, seen: map(count), waiting: map(count), made: count, earned: count, gift: count, nights: count, lastDawn: count, ledger: list(text)}),
    cityHeritage: shape({progress: map(x => count(x) && x <= 6), completed: map(bool), spells: map(bool), exhibits: unique(text), magicOn: bool}),
    cityAtmosphere: shape({clock: oneOf(['real']), timeZone: text, hemisphere: oneOf(['north','south']), seasonMode: oneOf(['real','manual']), season: oneOf(['spring','summer','autumn','winter']), weatherMode: oneOf(['seasonal','manual']), weather: oneOf(['clear','rain','sleet','snow','thunderstorm','snowstorm','blizzard']), sound: bool, musicVolume: x => number(x) && x <= 1, effectsVolume: x => number(x) && x <= 1}),
    cityExperience: shape({openingSeen: bool, investigations: map(required({found: unique(text), solved: bool}))}),
    cityLife: shape({v: x => x === 1, xp: count, questSteps: count, shifts: count, games: count,
      jobs: map(count), worked: map(bool), quests: map(required({step: x => count(x) && x <= 3, complete: bool})),
      friends: map(count), social: map(bool), bag: map(count), daily: map(shape({jobs: count, quests: count, games: count, talks: count, discoveries: count})),
      claimed: map(bool), discoveries: map(bool), upgrades: map(bool), played: map(bool), collection: unique(text), history: list(text),
      activeJob: required({id: text, key: text, day: count, step: x => count(x) && x < 2}),
      activeGame: required({id: text, key: text, step: x => count(x) && x < 2})}),
    endlessAdventure: x => required({completed: count})(x) && shape({stage: oneOf(['collect', 'deliver'])})(x),
    community: x => required({completed: count, step: count})(x) && shape({clues: unique(text), history: list(required({title: text, choice: text})), harePosition: point})(x),
    life: shape({bag: map(count), family: map(oneOf(['new', 'found', 'complete'])), events: map(bool), furniture: map(point), drawer: bool, outfit: oneOf(['Twilight', 'Moss', 'Rose', 'Ember']), hair: oneOf(['Chestnut', 'Silver', 'Gold']), skin: oneOf(['Warm', 'Deep', 'Porcelain'])}),
    headquarters: shape({pending: list(reward), history: list(reward), accepted: map(required({title: text, startedAt: number})), active: text}),
    farms: map(x => required({stage: oneOf(['empty', 'planted', 'growing', 'ready'])})(x) && shape({crop: text, readyAt: number})(x)),
    animalCare: map(required({visits: count})), citizenMemories: map(shape({visited: bool, gift: bool})),
    dailyLife: required({day: x => count(x) && x > 0, greeting: text, announced: bool}),
    owlStories: unique(count), handsOnHistory: list(required({title: text, profile: text, day: count})), cupboardWork: map(count),
    weather: oneOf(['clear', 'rain', 'sleet', 'snow']), visualQuality: oneOf(['balanced', 'eco', 'high']),
    _saveVersion: x => x === 1, _savedAt: number
  };
  for (const k of ['cookedMeals', 'fishingCatches', 'gardensTended', 'harvestSales', 'marketSales', 'mealsEnjoyed', 'owlBlessings', 'tournamentBest', 'tournamentEntries', 'councilVisits']) schema[k] = count;
  for (const k of ['deskPrepared', 'welcome3D', 'lifeIntroduced', 'continuousWorldSeen']) schema[k] = bool;

  function validate(value) {
    if (!record(value)) throw Error('The save must contain game progress.');
    // Reject unsafe keys, non-JSON numbers and excessive nesting before merging.
    let nodes = 0;
    function inspect(v, depth = 0) {
      if (++nodes > 100000 || depth > 24) throw Error('The save is too complex.');
      if (typeof v === 'number' && !Number.isFinite(v)) throw Error('Invalid number.');
      if (v && typeof v === 'object') for (const [k, child] of Object.entries(v)) {
        if (['__proto__', 'prototype', 'constructor'].includes(k)) throw Error('Invalid save key.');
        inspect(child, depth + 1);
      }
    }
    inspect(value);
    for (const k of ['coins', 'scene', 'clues', 'inventory', 'placed']) if (!(k in value)) throw Error('Missing progress: ' + k);
    for (const [k, test] of Object.entries(schema)) if (k in value && !test(value[k])) throw Error('Invalid progress: ' + k);
    if (value.placed.some(id => !value.inventory.includes(id))) throw Error('A decoration is not owned.');
    return value;
  }
  function parse(raw) {
    if (typeof raw !== 'string' || raw.length > limit) throw Error('Save file is too large or empty.');
    return validate(JSON.parse(raw));
  }
  function status(message) {
    notice = message;
    const el = document.getElementById('saveStatus');
    if (el && el.textContent !== message) el.textContent = message;
    const warning = document.getElementById('saveWarning');
    if (warning) {
      warning.hidden = !/unavailable|could not|Recovered/.test(message);
      warning.textContent = warning.hidden ? '' : message + ' Open Map → Save & backups.';
    }
  }
  function load(fresh) {
    let raw, backup;
    try { raw = localStorage.getItem(key); backup = localStorage.getItem(backupKey); }
    catch { blocked = true; status('Browser saving is unavailable. Download a backup before leaving.'); return fresh(); }
    if (raw !== null) {
      try { return {...fresh(), ...parse(raw)}; } catch {}
    } else if (backup === null) return fresh();
    // Preserve the damaged original before any automatic replacement.
    if (raw !== null) {
      try { localStorage.setItem(damagedKey, raw); }
      catch { blocked = true; }
    }
    try {
      const recovered = {...fresh(), ...parse(backup)};
      status('Recovered your previous automatic backup. Recent progress may be missing. Download a backup now.');
      return recovered;
    } catch {
      blocked = true;
      status('Your saved progress could not be read. Autosaving is paused to protect it. Restore a backup or choose Start a new save in Save & backups.');
      return fresh();
    }
  }
  function write(value, preservePrevious = false) {
    if (blocked && !preservePrevious) return false;
    try {
      const raw = JSON.stringify({...validate(value), _saveVersion: 1, _savedAt: Date.now()});
      if (raw.length > limit) throw Error('Save is too large.');
      const old = localStorage.getItem(key);
      if (old !== null) {
        let valid = false;
        try { parse(old); valid = true; } catch {}
        if (!valid) localStorage.setItem(damagedKey, old);
        // Retain a checkpoint for five minutes; rapid autosaves and reloads must not erase it.
        if (valid && (preservePrevious || localStorage.getItem(backupKey) === null || Date.now() - checkpointAt >= 300000)) {
          localStorage.setItem(backupKey, old); checkpointAt = Date.now();
        }
      }
      localStorage.setItem(key, raw);
      blocked = false; lastSaved = Date.now();
      if (!notice.startsWith('Recovered')) status('Progress saved in this browser. Download backups to keep a copy elsewhere.');
      return true;
    } catch {
      status('Progress could not be saved. Download a backup before leaving, then free browser storage or allow site storage.');
      return false;
    }
  }
  function checkpoint() {
    if (blocked || notice.startsWith('Recovered')) return;
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        parse(raw);
        let usable = false;
        try { parse(localStorage.getItem(backupKey)); usable = true; } catch {}
        if (!usable) localStorage.setItem(backupKey, raw);
      }
    } catch { status('An automatic backup could not be created. Download a backup to protect your progress.'); }
  }
  function download(value, filename = 'Eldoria-save.json') {
    const a = document.createElement('a'), url = URL.createObjectURL(new Blob([JSON.stringify(validate(value), null, 2)], {type: 'application/json'}));
    a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function backup() { return parse(localStorage.getItem(backupKey)); }
  function startNew(value) {
    try {
      const old = localStorage.getItem(key);
      if (old !== null) localStorage.setItem(damagedKey, old);
    } catch { status('The original save could not be preserved. Download a backup before trying again.'); return false; }
    return write(value, true);
  }
  return {load, validate, parse, write, checkpoint, download, backup, startNew, status, limit, get blocked() {return blocked;}, get notice() {return notice;}, get lastSaved() {return lastSaved;}};
})();

