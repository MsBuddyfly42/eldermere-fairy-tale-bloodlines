# Eldermere — The Fairy-Tale Bloodlines
A browser-based 3D fantasy game for Templar. Static hosting serves `dist/`; no build or external runtime CDN is needed. Three.js 0.180.0 is vendored with its MIT license.

## Version 3: one connected kingdom with a live world map
- All eleven outdoor districts coexist in one retained 3D landscape, joined by roads and bridges; walking between districts does not reload the outdoor world.
- An on-demand live map shows the entire kingdom, the traveler, residents, rivers, buildings, and the walking route. Click to choose a destination; enlarge it for detail.
- Whole World View frames every district at once on wide and narrow screens; ground and first-person views remain available. The game starts at a close, playable follow distance. Visible zoom buttons, a camera-distance slider, and Focus on Me controls adjust the view; zooming in also exits distant Whole World View.
- Adventure and travel panels hide while idle or when the player returns to the scene; the enlarged map closes after destination selection. The map hides when idle; zoom controls remain visible.
- Easy play: click a path or district to walk/run there, click a building to approach and enter, use always-visible direction arrows, toggle Walk/Run, and cancel travel with Stop. A gold ground trail marks chosen routes.
- World coordinates are retained in browser saves and restored within validated bounds.
- Static repeated scenery is batched with InstancedMesh while retaining per-instance interactions.
- Twenty-two furnished interiors. Buildings open into playable rooms; entry and exit use camera fades.
- Animated elven traveler and residents, perspective follow camera, optional first-person view, orbit and zoom, lighting, shadows, fog, fireflies, flowing water, and rain toggle.
- Click-to-walk routing around exterior buildings, keyboard and touch movement, proximity interaction prompts, and continuous paths between districts.
- In-world interactive desks, bookshelves, chests, counters, portraits, workbenches, and characters.
- Shoemaking with clickable cutting and stitching patterns, coin payouts, furniture purchase, and actual 3D home decorations.
- Six-clue Silverstitch mystery, gated orphanage, family reunion, two additional village cases, royal council, bloodlines gallery, ancestral room visits, gardening, creatures, professions, academy activities, and festival games.
- Just Visit mode; browser-local saves with JSON export/import. Existing v1 progress is retained.

## Living-world update
Villagers now walk between breakfast, work, evening social time, and home; outdoor sleeping residents disappear after reaching their doorway. Dialogue remembers visits and responds to completed crafting and investigations.

The Witness’s Hidden Letter is an additional playable Silverstitch investigation: talk to Rowan in the archive, follow Courier Sable, overhear her meeting with Bram, inspect the hidden paving stone, verify Nessa’s letter with Mirelle, and compare its seal with the workshop tools. The investigation pays 75 mooncoins once and preserves its progress and testimony in the journal. Sable waits when the player falls behind. Existing case progress remains valid. Players who solved the original case can meet Nessa in the capital.

## Controls
Click ground to walk; click buildings to approach their door and enter. Click an object/person or press E nearby. WASD/arrows move; drag looks around; wheel zooms. First-person mode is available in the header. Esc leaves an interior; M enlarges the live map; J opens the journal. Touch arrows are shown on smaller screens.

## Validation
From the project root:
```
node --check dist/game.js
node --check dist/live-realm.js
node tests/core-loop.cjs
node --experimental-vm-modules tests/world.mjs
```
World tests instantiate the actual Three.js scene with a renderer stub, construct every district and interior, verify reachable doors, bridge routes across the kingdom, map/world coordinate alignment, whole-world camera framing on desktop and portrait aspect ratios, and return-to-doorway exits, and exercise furniture and core interactions. They do not verify WebGL pixels. Browser visual QA was unavailable in the managed environment.

## Current limits
Stylized low-poly 3D, not photorealistic movie graphics. Interiors have open front walls for a follow camera. Buildings, large furnishings, and rivers outside bridge crossings have navigation collision. Outdoor residents follow four time-of-day routines; indoor residents remain available for gameplay. The Silverstitch story is the full family investigation; the other family rooms have compact heirloom restoration adventures. Activities use focused panels from in-world objects. The festival is continuously available rather than tied to real-date holidays. Saves remain on the current browser unless exported. Requires WebGL2.


## Hands-on life update
Map now starts hidden. Map reveals it for ten seconds of inactivity; choosing a route dismisses it. M opens the larger map. Names are larger with high-contrast labels. Click the weather badge to cycle clear/rain/sleet/snow; precipitation follows the player and weather persists locally. Roads bypass building footprints with extra bridges, palace collision includes its wings, and the follow camera rises when buildings interrupt the sight line.

Satchel & style contains supplies, usable bread, carried objects and outfit/hair/skin choices. Cottage pantry supplies can be collected once; cooking consumes ingredients. Hearth seating, home guests and a movable writing desk add interior activities. Nine houses have distinct collectible heirlooms and restoration actions in their ancestral rooms, with saved completion and one-time rewards. District delivery surprises, footsteps and weather-specific synthesized ambient tones, and brief cinematic captions add atmosphere. These are compact adventures, synthesized audio and stylized characters, rather than full-length cinematic campaigns or realistic character art. Browser GPU rendering remains unverified; automated world tests use real Three.js scene geometry with a stub renderer.


## The Bell Beneath the Floor
Begin with Fern inside Moonleaf Tavern. Watch Maren carry a parcel across the room, search two physical clue props, question both witnesses, follow Maren along a routed walk to the workshop, obtain the ledger/key, and return to the tavern pantry stair for a furnished storm cellar. The bell and threatening note unlock two evidence-based endings; relationships, journal outcome and a single 90-coin payout persist. A watch referral adds Ash to the final tavern scene. Escort pauses when the player falls behind. Trees are excluded from road/bridge/door corridors; road sections share an aligned six-unit width and use right-angle building bypasses. Automated tests cover the mystery sequence, both consequences and repeat-reward prevention; GPU visual QA remains unavailable.


## River and completion audit
River channels are cut out of each district grass surface; eleven river surfaces are no longer concealed by terrain. Continuous river tiles match navigation boundaries. Bridge walking height and approach ramps keep the player on the wooden deck without stalling click routes. Map roads trace the physical right-angle bypasses. Water ripples use bounded animation rather than accumulating drift. Seating positions align with chairs, guests stand separately and repeat invitations cannot farm friendship; cellar exits consistently return upstairs; Nessa appears immediately after the original case resolves; garden meshes reflect saved planting and growth. Save import resets escort movement and applies appearance. Geometry raycast tests verify exposed river surfaces in every district and a completed elevated bridge walk.


## The Eight Silver Stitches story campaign
The connected narrative is adapted into ten readable in-game chapters and an eleven-step investigation. Start at the awakened book in the Royal Archive, then recover the orphanage memory button and first shoe, open the Hollow Oak passage, join the Keeper’s witness memory, examine the Vale estate ledger and release Dain, return the one Silver Last to Finren, hear all eight siblings in the market, visit Aldren and Mirelle, present evidence at court, and join the Lantern Pavilion finale. The player remains Templar, helping the story’s characters rather than replacing a sibling. Original quests remain available and their save progress is retained. The additional chronicle is tracked independently; reward is 150 coins once.

Story button opens a chapter shelf. Chapter text in dist/stories/silverstitch-scenes.json is an adapted in-game edition, not a verbatim reproduction of the long connected draft. The supplied source manuscript is retained unchanged in dist/stories/original-manuscript.md. New hidden-village and Vale-records scenes use stylized 3D rooms. Automated tests cover every campaign step, all eight voices, room access, evidence gates and repeat-reward prevention. Actual browser/GPU appearance remains unverified.


## Clear streets and decorated entrances
All 22 buildings have bordered stone entrance walks connected to the road, patterned paving, a doorway accent and planters where clearance allows. Roadside lamps sit beyond the lane edges; building lamps avoid footprint/entrance corridors. Flowers are omitted from the same reserved lanes, riverbank stones leave both bridge approaches clear, and the capital fountain moved into an off-road garden pocket. Tests count all entrance walks and check their center lines and lamp/bridge clearance.


## Acted Silverstitch scenes and clue examinations
Four brief 3D reenactments show the festival confusion, Dain crossing the opened door, the siblings approaching their parents at the first crossing, and the lantern finale. Scenes temporarily pause player movement, animate their cast, display sequential captions, and return to the same scene position; Skip scene completes the same transition once. Four illustrated evidence inspections require looking at three details and choosing a supported conclusion before advancing. Incorrect conclusions keep the examination open. Guide me routes to current evidence or the appropriate building; the hidden village/estate use the Hollow Oak passage. Tests cover automatic completion, skipping, position restoration, wrong-answer handling, one-time callbacks and guide routes. Scene dialogue remains captioned with synthesized audio rather than recorded voice acting. Browser visual QA is unavailable in this managed environment, so this update does not establish that a full browser playthrough has passed.


## Adventure card travel
Each unfinished adventure card includes Take me there, which fast-travels into the correct room or beside the current outdoor objective. It positions the player on accessible ground, closes the panel, restores a close camera, and leaves the activity for the player to click or interact with. The original case, witness investigation, bell mystery and connected Silverstitch campaign all resolve their current step. Completed cases hide travel. Tests cover all eleven campaign destinations and every witness/bell stage without auto-completion or coin rewards.

Camera: drag for a full 360° orbit, hold Q/R to turn, or expand Look around for front, rear, side and tilt controls. Inside view supports looking almost straight up/down. Living scenery includes bobbing sailboats, rotating windmills, birds, clouds and pennants; roads remain reserved for travel.

The Everlasting Kingdom: repeatable pickup/delivery errands across all eleven districts. Six rotating narrative themes, one reward per delivery, automatic next errand, saved completion count, and direct destination guidance. It continues after the main campaign ends; themes repeat, rather than generating new story chapters. Look around is collapsed by default, closes after eight idle seconds, and closes when opening Your adventure or using the world canvas.

Population: 52 additional named outdoor elves including eight children with nearby family supervisors, shoppers, tradespeople, farmers, travelers, nobles and guards. Local collision-aware walking routes, work/play gestures, proximity waves, conversations, nighttime rest and continued guard patrols. Three travelers populate the tavern; royal officials populate the palace. Walled royal quarter includes towers, an open raised gate and a gatekeeper; bridge roads remain traversable. Elf models have slender proportions, long pointed ears, facial features and layered tunics. These are stylized procedural 3D figures.

Elven settlement additions: eleven accessible residential halls with household registers assigning all citizens a home; four outdoor market stalls selling usable satchel provisions; five tended moonflower plots; eight roaming deer, rabbits and cats; daylight birdsong when Sound is on. The existing flying birds continue overhead.

Aurelin, cherished owl of the sacred Memorybough in the Whispering Woods: six paged tales (the traditional shoemaker tale, original continuations, and Eldermere lore), optional browser read-aloud, an enterable timber treehouse with balcony/stairs/reading room, and nighttime fireflies. Keyboard arrows and WASD move relative to the camera; clicking the world focuses keyboard input.

Aurelin now has 16 tales, including ten newly written fairy-tale aftermaths. Room clicks resolve nearby reachable floor around furniture and room edges; ordinary unreachable decor clicks no longer issue the repeated generic path warning.

Living Kingdom: five rotating adventures (repair, hare escort, evidence/choice investigation, harvest donation, melody performance); gift/visit memories; five planting/watering/one-minute-growing/harvesting garden plots; feeding and greeting animals; market trading, recorded royal priorities and a three-shot timing tournament. Includes saved history, controlled payouts, household visits and subtle breathing animation. Browser GPU/layout/audio QA remains unavailable in this environment.

## Complete activity controls and garden plots
- Added direct gardening at outdoor beds and six conservatory plots, with held tools, seed placement, wet soil, visible pouring and crop growth.
- Extended physical controls to equipment, decorations, dispatch/rewards, clue handling, wishes and the full shoemaking bench.
- Added gesture and cancellation checks for both garden types, growth gates, harvest inventory, and activity coverage.

## Easier activity controls and tidy plots
- Default to click/tap/E/Use actions; keep precision gestures optional.
- One garden action performs the visible sequence; simplify stirring and kneading.
- Remove the nested soil patch and duplicate crops; space four plants and move the basket beside the bed.
- Verify easy completion, cancellation, duplicate-click safety and crop geometry ownership.

## Activity start fix
- Start garden work immediately from the selected action.
- Route Use/E directly to active work and accept easy clicks across the bed.
- Check completion through the real update loop, not only isolated activity ticks.

## Eight crop varieties
- Add strawberries, carrots, pumpkins, mint, basil, moonflowers and starblossoms alongside moonleaf.
- All crops support sowing, watering, timed visible growth and harvest in every garden type.
- Preserve crop identities, prevent early/duplicate harvests, and retain legacy moonleaf saves.
- Verify all eight crop cycles in both outdoor and conservatory plots.

- Extend immediate single-command acted sequences to all existing physical activity profiles, while keeping game challenges interactive.

### Expanded garden selection
Added 14 freely available crops, for 22 total, with the same complete one-click acted growing cycle in outdoor and conservatory plots. Added vegetable, grain, sapling, herb and glowing mushroom geometry. All 22 crop cycles are tested in both garden types.

### Clearer kingdom and detailed cottages
Replaced dense exponential haze with distant linear fog: clear daytime stays unobscured for 140 world units; interiors have no fog. Weather retains gentle distant atmosphere. Cottage exteriors now have pitched tiled gable roofs, stone-textured plaster, masonry plinths, timber framing, shutter slats, layered windows and doors, attic windows and sheltered entrances, within existing walking clearances.

### Kingdom-wide architectural appearance
Extended masonry texture, corner stones, cornices, layered windows and doorway surrounds to palaces, towers and ruins. Palace towers gain masonry bands and parapets; ruins gain boarded windows and facade ivy. Roads retain stone paving; sidewalks, terrain and bridge decks gain surface texture and plank details. Geometry remains within existing entrances and collision clearances; gameplay, commands, saves and controls are unchanged.

Nature appearance: deterministic mottled grass texture, rounded broadleaf canopies with visible branches, smoother evergreen silhouettes, gradient day/night/weather skies and translucent distant cloud groups. Outdoor sky is hidden indoors. Existing tree positions, path exclusions, collisions and weather behavior are retained.

### Remove obsolete roofs
Removed the original four-sided cone roof meshes and their stripe overlays entirely. Cottages retain their new tiled gables; all other main buildings now use replacement pitched roof groups with tile courses and gable walls. Entrances, collisions and controls are unchanged.

### Labels on approach
Character names show only within six world units; building labels show within ten units of their entrance. Labels hide in whole-world view and follow moving characters. Dialogue, click targets, entrances and controls are preserved.

### Mountains, river life and celestial sky
Cragged multi-ring mountains use elevation-colored rock and snow. River ripples flow and translucent water reveals 176 animated fish representing eight species. Every district has a fishing-permitted sign and an easy acted cast/bite/reel cycle that saves catches to the satchel. Daytime sky is brighter blue with a visible sun and drifting cloud groups; clear nights show a cratered moon and 650 stars. Existing travel and activity controls are retained.

### Fishing access and marketplace detail
Larger permanent fishing signboards advertise click/E, with broader interaction range and a Go fishing shortcut. Fishing shows rod movement and the caught fish. Market stalls gain striped sloping awnings, valances, timber posts, counter boards, produce trays and barrels. Submerged riverbed stones add depth beneath the swimming fish.
