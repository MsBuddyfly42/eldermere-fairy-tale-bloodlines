# Eldoria — The Fairy-Tale Bloodlines

A lighter, direct-control adventure with an optional complete 3D elven kingdom with connected districts, furnished buildings, the Silverstitch family campaign, recurring adventures, citizen households, a marketplace, gardens, wildlife, weather, and Aurelin’s storytelling treehouse.

## City-style play

The default game now follows the scene-first city format of Monopoly City: a front entrance, photographic-style street scenes, clickable building targets, connected room tabs, adjacent-street walk controls, pan/approach/reset controls, activity panels, neighborhood conversations, and a live realm map beside the scene. All eleven districts remain connected; a twelfth map destination leads to Aurelin’s treehouse. Eldoria keeps its mooncoin economy and investigation. Dice and property-rent rules are not added.

The treehouse has a photographic-style exterior with a believable staircase and porch, a separate furnished story-room interior, sixteen retained Aurelin tales, page navigation, and optional browser read-aloud. Room and porch location survive reloads. Every outdoor scene uses the new photographic-style environment atlases, while indoors use the retained photographic room images. The city view does not load WebGL. Failed image loads show an explanation while map and activity controls remain usable.

The clock advances one game minute per eight visible seconds and pauses in menus, on the front entrance, and in hidden tabs. This grants no offline income. City travel advances five game minutes. Saved 3D-specific quests, inventory, pending rewards, and other records remain intact, with the same browser-save, download, and restore controls.

The previous direct adventure remains at `?view=direct`; the previous walkable realm remains at `?view=3d`. The normal interface opens the photographic city. Switching presentations does not reset progress.

## Play locally

City play requires a modern browser; the retained 3D version requires WebGL2. From this folder, run:

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. Serve the files over HTTP rather than opening index.html directly. All game assets and Three.js are included; no npm dependencies or external runtime CDN are required.

## Retained 3D controls

- Click the ground to walk; click a building to approach and enter.
- WASD or keyboard arrows move. E interacts; Esc leaves a room.
- Drag to rotate the camera; wheel or +/− controls zoom.
- Your adventure includes Take me there. Map is available on demand; M opens the enlarged map and J the journal.
- Enable Sound for ambience; click the weather badge to change weather.

## Hands-on work

Room activities open a large interactive canvas work surface over the retained photographic room. The surfaces and tools are illustrated; the room photographs are unchanged. They support mouse, touch, and keyboard input without an additional graphics context or external dependencies.

- The cupboard has a draggable hinged door, shelves, a jar you move to the counter and return, and a closing step.
- Twelve harvest recipes require ingredient handling, preparation, circular mixing, hearth placement, heat adjustment, actively tended cooking, and serving. Bread adds kneading; potion brewing follows its own ingredients.
- Thirty-four activity types cover cooking, cupboards, gardening, crafting, animal care, records, trading, parcels, equipment, furniture arrangements, music, runes, fishing, archery, and lanterns.
- Hold and drag objects into the receiving area. Follow cut/seam guides, work back and forth, circle to stir, tilt to pour, or hold to stamp and tend heat. Keyboard: Enter holds/releases; arrow keys move/work; Escape leaves.
- Invalid drops and incomplete gestures do not advance. Waiting without input does not finish work. Cancelling or leaving preserves unfinished recipe ingredients and gives no completion reward. Completed recipes use the original inventory and yield rules.
- **Room activities** finds the stations; **Cook in my cottage** and **Kitchen & harvest** open the recipes. The writing desk activity organizes working materials around the photographic desk.

`tests/hands-on.cjs` checks all activity plans and gesture rules. The world suite checks integration, inventory, rewards, cancellation, cupboard operation, and leaving rooms. Work surfaces can be visually rendered with a standard 2D canvas; the outdoor WebGL scene still needs device testing.

## Keep your progress

Saves are stored in the current browser and website. Before switching from the existing game to Render, export your progress using the map’s save controls. Import that JSON file on the new site. Different website addresses do not automatically share saves. There is no account or cloud-save backend.

Open **Map → Save & backups** to download current progress, restore a downloaded JSON file, or download/restore the previous automatic backup. Restoring valid progress reloads the world and keeps your current saved progress as the fallback backup. Existing Eldoria JSON exports remain supported, including invitations for Pip, Fern and Liora.

Saves are checked before loading or importing, including nested inventory, quest, crop, and reward records. An unreadable primary save is preserved under a separate browser storage key before recovering a valid fallback. If neither copy is usable, autosaving pauses so it cannot overwrite the original; restore a downloaded backup or explicitly start a new save. Storage denial and quota failures display a warning, and you can still download your in-memory progress.

The automatic fallback is retained through rapid autosaves and reloads, and refreshes after five minutes of continuous play. The game also saves when its page is hidden or closed. Browser backups can still be lost when site data is cleared: keep a downloaded copy elsewhere. There is no cross-device sync.


## Check the project

Node.js 22 or newer:

```sh
npm test
```

Tests check gameplay logic and scene construction using a renderer stub; they do not verify browser graphics or audio. The game uses stylized procedural graphics. Recurring activities continue after the finite story campaign, with rotating themes.

## Publish on GitHub and Render

1. Upload this folder’s contents to the root of a GitHub repository, keeping dist and tests intact.
2. In Render, create a Static Site connected to that repository, branch main.
3. Set Build Command to npm run check and Publish Directory to dist.

Alternatively, create a Render Blueprint using the included render.yaml. No environment variables, database, paid server, or install step is required.

The original story manuscript and adapted chapters are included in dist/stories. CHANGELOG.md records the game’s features and limitations. Vendored Three.js carries its MIT license in dist/vendor/LICENSE.

## Cottage adventure headquarters

Go home opens your cottage adventure board. Choose investigations, recurring errands, community jobs, family heirlooms, guild work, academy activities, gardening, festival games, or storytelling visits. Existing quest progress remains intact. Adventure coin rewards are recorded in your browser save and collected only at the cottage board; kingdom parcels are turned in there too. Shop sales still pay at the marketplace. Story scenes, evidence, and relationships continue at their original locations.

## Visible physical activities

Gardening, repairs, heirloom crafts, animal care, parcel handling, evidence inspection, records, guild work, council decisions, meals, lanterns, music, runes and trading now use short 3D activity scenes. Click the glowing prop in order; a small activity panel gives the current instruction and Cancel control. Existing shoemaking patterns and story reenactments remain interactive. Archery displays bow/arrow actions and the lantern-catching game uses moving 3D lights. Activity scenes use stylized procedural props and animations, rather than full character motion capture. Completion still uses the original evidence gates, inventory consumption and home reward system. Cancelling or traveling away does not complete the action.

Hands-on controls: prepare an ingredient and drag it into the bowl; stir in circles; knead with alternating strokes; drag the mixture to the oven. Kingdom activities use drag-and-drop receiving rings, repeated working strokes, timed tilted pours, seam tracing, and pull-and-release gestures. Mouse and touch share these controls. Release an incomplete gesture to retry; canceling grants no reward.

Garden plots now support direct work at each outdoor bed and all six conservatory beds: digging strokes with a held shovel, seed placement, covering soil, lifting and tilting the watering jug, visible water and wet soil, timed crop growth, and pulling ripe sprigs into a basket. Canceling unfinished work preserves plot progress and inventory. Existing conservatory plant timers are retained.

Physical work also covers shoemaking from the first material choice, furniture placement/removal, carried equipment, home reward turn-ins, parcel dispatch, clue records and chests, moonwell wishes, trades, and remembrance lanterns. Steps select their own gestures (pull, place, stroke, trace, tilt, hold, turn, or stamp); menus and conversation remain immediately accessible.



The garden now offers 22 crops in every outdoor and conservatory plot: moonleaf, strawberries, carrots, pumpkins, mint, basil, moonflowers, starblossoms, tomatoes, potatoes, corn, wheat, lettuce, onions, peas, apples, blueberries, lavender, rosemary, sunflowers, silverberries and starlight mushrooms. All use the complete sow → water → timed growth → harvest cycle with directly controlled activity steps, four spaced plants and crop-specific geometry. Each crop has its own growth time (45–90 seconds) and harvest quantity, deposited in the satchel. Existing moonleaf saves and timers continue unchanged.


## Everyday life and harvests
Use **Kitchen & harvest** for twelve crop/fish recipes, market sales and saved flower arrangements. Cooking shows preparation, stirring, heat and serving; original bread/potion activities remain. Canceling leaves ingredients intact. Citizens carry baskets/tools, shoppers visit stalls, guards alternate watches and families head home in the evening. Interiors have moving curtains, opening stocked cupboards and flickering hearths. Turn Sound on for location-based river/waterfall/hearth ambience and grass/stone/wood footstep tones. Mobile rendering uses a lower pixel ratio.

The elven visual pass adds leaf carvings, silver accents, woven cloth and timber surfaces, curved bridge rails, styled interiors, articulated woodland animals, windblown grass and foliage, and animated river surfaces. The **Elven graphics** button offers Balanced, High and Light detail without changing adventure progress. Automated scene checks use a renderer stub; GPU appearance and device performance require a browser check.

Roofs now follow the supplied elven cottage reference: layered blue scalloped shingles, sweeping curved roof surfaces and timber edges, warm arched dormers and slender spires. This is an original procedural 3D interpretation of the reference rather than a reproduction of the illustration.

The whole-scene reference pass extends that style to organic timber facades and doorway frames, warm pointed-arch windows, textured masonry and stone paths, flowering borders, meadow blossoms and ferns, gnarled tree trunks and irregular foliage, distant mountain citadels, dawn/dusk skies and carved interior furniture. It retains the existing world layout and gameplay.

The connected path network joins outdoor entrances and activities to the kingdom roads with collision-aware stone paving. The sacred treehouse remains in natural woodland with its wooden stairs and no paved approach. Existing and added paths share stone colors, world-scaled paving and brown/gold borders. Bridge decks remain timber, with paved approaches at each end. An off-path saved arrival receives a road connector on reload. New approaches join the nearest reachable existing paving or road, so nearby destinations share branches. Roads between districts are included when choosing connections and leaving junctions open. Travel reuses the same network.

The kingdom is surrounded on all four sides by a layered wilderness of mountains, rolling hills and mixed woodland. This perimeter scenery remains outside the playable districts and roads.

Woodland foliage uses textured individual leaves instead of opaque rounded canopy balls. Meadow textures use consistent world coordinates and moss variation. The old rectangular Whispering Woods brook is removed, restoring meadow beside the cottage walkway. Outdoor pond surfaces sit below the paving.



## Browser regression checks

`tests/comfortable-browser.cjs` checks the direct adventure in real Chromium: all districts, clue gates and the complete investigation, crafting, shopping, placement, alchemy, the lantern game, saved reload, story chapters, and mobile navigation. Install Playwright separately (`npm install --no-save playwright` and `npx playwright install chromium`), then run `node tests/comfortable-browser.cjs`. Screenshots go to the system temporary directory unless `ELDORIA_SCREENSHOTS_DIR` is set.

## City browser checks

With Playwright installed, `node tests/city-browser.cjs` verifies all photographic districts, street/room/activity transitions, the six-clue investigation, crafting, shopping, home placement, alchemy, lantern games, save preservation, treehouse exterior/interior, stories, saved-room resume, viewpoint controls, and phone navigation. The direct-presentation suite explicitly uses `?view=direct`. Screenshots go to the system temporary directory or `ELDORIA_SCREENSHOTS_DIR`.

## Playable manuscript and neighborhood life

The default city view now puts **The Eight Silver Stitches** campaign first. Eleven saved objectives carry the player from the awakened archive book through the hidden village, Dain's rescue, eight sibling conversations, a chosen reunion welcome, the evidence hearing and the festival. `silverStory` is shared with existing 3D saves; campaign completion awards its 150 coins only once. The manuscript remains available under Family story.

Adventures & jobs opens eight careers with three promotion ranks, eight three-step neighborhood quests, five two-round leisure challenges, eight friendships, eleven district discoveries, daily objectives, collections and six cottage projects. Work and leisure pay once per activity per game day. Daily activities refresh at real midnight in your selected timezone. Side activities are optional and never charge an entry fee for the campaign. Home projects are remembered in the cottage's Made by you panel; they do not replace the photographic room backdrop.

`npm test` includes pure campaign/life rules. `node tests/city-story-browser.cjs` runs the complete campaign, every sibling conversation, a work shift, a full neighborhood quest, daily/social reward caps, save/reload and phone layout in Chromium. Existing city and direct browser suites remain available.

## Opening, investigations, cottage projects and atmosphere

The default city now has a four-scene photographic prologue (optional read-aloud, skip and replay), six searchable evidence scenes with saved object notes and ordered reconstruction, and six photographic cottage furnishings. Purchased projects are visible and clickable in the cottage; the reading chair, tea table, sewing corner, herb rack, flower box and supper table open their matching activities. Existing campaign steps are preserved; only the player's current and future evidence scenes require the new investigation.

The default clock now follows the real Gregorian date and time, initially America/Chicago, with a timezone selector, monthly calendar, leap-year support, and real-midnight daily renewal. Rest and travel do not skip the real clock. Calendar seasons use northern or southern meteorological seasons, with an optional manual season override. Weather is a **seasonal simulation**, not a live weather forecast: clear, rain, sleet, snow, thunderstorm, snowstorm and blizzard. Each can be selected manually. Particle effects respect reduced-motion preferences; weather is subdued indoors.

Enable elven music & sound starts an original synthesized Dorian harp/flute score, investigation variation, and rain, sleet, soft snow wind, storm wind and thunder layers. Sound requires a user gesture, pauses in hidden tabs, and has separate music/effects sliders plus mute. No external audio service or downloads are required. Reopening a saved visit asks the player to resume sound.

Additional checks: `node tests/city-experience-browser.cjs` tests the complete prologue, search/reconstruction/save gates, all six purchased furnishings and a sewing interaction, real calendar/month navigation/timezones/midnight, all weather/seasons, actual WebAudio start/mute and mobile layout. Pure rules for investigations, Gregorian dates, DST and seasons run with `npm test`.

## The original shoemaker's shop and living midnight magic

The Shoemaker's Quarter now has two distinct shops: the existing Silverstitch Workshop for present-day work and **The Original Shoemaker's Shop**, a furnished interpretation of the cottage from *The Elves and the Shoemaker*. The preserved room includes the bench, hand tools, hearth, curtain, living/sleeping furnishings, and tiny thank-you clothes. Six objects carry memories of the original tale. A six-stage playable retelling follows the last leather, the first night, the first customer, the discovery behind the curtain, the gift-making, and the elves' freedom to leave.

Magic & the original shop also opens nine activity chains, the Hall of Shared Memories in the library district, and the Spell Atelier in the academy. Activities teach Mending Light, Waylight and Bloomcall and award their first completion once; practice remains available. New rooms restore correctly from saved cityView. Ambient lights honor reduced-motion and can be quieted.

**The midnight blessing** is an ongoing mechanic. Completed boots, academy work, garden harvests, productive career shifts, built home projects and first heritage completions receive an elven-finished quality record and five extra mooncoins. Existing completed work is baselined when this feature first loads. Saves and repeated render calls never re-award the same creation. Overnight work is queued in the saved fortune ledger.

Between real local midnight and 6 a.m. the original shop shows the helpers' heightened stitching magic. At the next real dawn, a pair worth 12 mooncoins plus two per queued creation waits at the original shop. Returning after an offline night resolves the saved queue; claiming the gift requires visiting that shop and pays once. Neither memory reenactments nor rest change the real clock.

`tests/city-heritage.cjs` and `tests/city-fortune.cjs` run with npm test. `node tests/city-heritage-browser.cjs` exercises the original shop, preserved objects, full retelling, new rooms, spell learning/casting, save compatibility and phone layout. `node tests/city-midnight-browser.cjs` completes actual shoemaking, checks its extra quality payout, advances a mocked real clock through midnight/dawn, collects the saved morning gift once and verifies reload protection.

## Eldoria County's Midnight Promise

The founding enchantment is county-wide during the real local **midnight hour, 00:00–00:59**, in the selected world timezone. All eleven districts and their rooms receive silver lights, an enchanted status, midnight whispers, and a high-flute variation of the existing music. The original shoemaker's midnight-to-dawn helpers and morning fortune remain their own ongoing tradition.

The Midnight Promise panel accepts a named in-game intention and fulfills eight kinds of actual game outcomes: a consumable wonderful feast, a handmade masterwork, rare moonflowers plus ready-to-harvest plants, evidence/answers for the current campaign scene, a completed neighborhood quest and its normal reward, a visible usable cottage project, a learned spell and keepsake, or a warm friendship/visitor result. The first request per target per night is saved to prevent replay payouts; different goals remain available. Free-text intentions are journal labels attached to these supported in-game outcomes. The answer intention reveals evidence without skipping the player's story choices or sibling conversations.

During the enchanted hour, normal puzzle attempts are guided into their correct result, shoemaking cuts/stitches/enchantments succeed, alchemy balances its ingredients, rune work finds its proper order, and planted moonflowers become ready. Baking shifts produce a saved perfect feast. Midnight home projects receive their needed materials. An explicit guidance action is available in task dialogs. Existing location, valid task, and completed reward gates remain; at 01:00 normal play resumes.

Perfect work is recorded in a saved journal with date, kind, quality and purpose. Dishes and treasures remain in the midnight pantry afterward; a feast can be eaten or shared with Fern, consuming it once and growing friendship when shared. The clock never skips. Existing progress is baselined, and daytime work is unaffected.

`tests/city-promise.cjs` checks all intention outcomes, midnight boundaries, guided/normal task behavior, saved results and repeat protection. `node tests/city-promise-browser.cjs` exercises all eleven districts, all eight intentions and their actual game effects, ordinary alchemy/story guidance, saved journal, 01:00 behavior and phone layout.

## County life, Embermere and a legacy at home

**Bonfire & camping** visits the photographic Embermere Campground & Bonfire Circle in Whispering Woods. Eight activities include pitching a saved canvas tent, tending the fire, cooking stew, toasting treats, songs, stories, star charts and hosting the bonfire festival. Prepare fire, food and a song or story before hosting; midnight guidance remains active. Campfire cooking creates saved edible supplies and keepsakes, with daily first-time records instead of duplicate rewards. Sixteen existing tales can be read around the fire. A real overnight stay saves your tent and produces a breakfast, letter and morning memory after dawn, including when you return from an offline visit. Rest does not skip the clock. The fire has its own synthesized crackling ambience and responds to the existing audio controls.

**County life & newspaper** opens *The Eldoria Lantern*. Its dated edition combines actual saved camp activities, resident outcomes, seasonal gatherings and morning reactions to midnight work. Pending midnight events become letters and neighbor reactions after real 6 a.m.; replies affect friendship once. Existing creations are baselined when the feature loads. The newspaper and correspondence keep their history after reload.

Three resident story chains help Fern reopen an accessible bakery, help Aurelia recover a melody that becomes audible at camp, and help Pip host an inclusive family celebration. Four selected-season gatherings cover spring planting, summer fireflies, the autumn harvest bonfire and winter storytelling. The real calendar includes the season's gathering and Saturday campfire invitations. Camp is available every day.

Two new photographic hidden places—the midnight market and secret moonflower garden—appear during the Midnight Promise. Their keepsakes and photographs remain after the path closes at 1 a.m.; entry and claims are time-gated, and closing a path returns the player to the ordinary district. Your furnished **Legacy Room** beside the cottage offers eight visible display frames for earned creations, camp keepsakes, real in-game letters and saved scene photographs. Displays and room resume are saved. Outdoor particle canvases use a transparent background so the photographic world stays visible; outdoor camp and hidden paths receive full outdoor weather.

Pure county rules run with `npm test`. `node tests/city-county-browser.cjs` checks all eight camp activities, fire audio start/mute, overnight dawn, midnight doors/closure, newspaper/letters/reactions, all three resident stories/open bakery, four seasonal gatherings, real photo/letter displays, save/reload, calendar and phone layout.

Camp meals can also be eaten or shared with Willow from the campground menu; this consumes a saved serving, records the supper, and grows friendship when shared.

## Willowwood is a neighborhood

The front of your cottage now has a clear side-path entrance to **Willowwood Neighborhood Lane**. Its photographic outdoor scene leads to four distinct furnished private homes: Pip's cottage, Fern's baker's cottage, Master Cobble's home and Keeper Willow's cottage. Your own cottage and legacy room remain separate and keep their saved belongings.

The cottage frontage shows your home and the lane entrance; neighbors' homes are reached through the lane rather than cluttering the front garden with unrelated doors. Each private home's front door returns to that lane. Room trails connect the lane, neighboring homes and your own cottage. The lane receives outdoor weather; the homes shelter their interiors. All five new locations restore from cityView.

Neighbors offer daily conversations, tea and bouquets, with at-home/away context. When a working neighbor is out, you can reply to their welcome note or leave a tea invitation. Visits and shared moments are saved, bouquets consume a flower material, and friendship increases once per neighbor/moment per real date. Pip is available at home; working neighbors are home before 9 a.m. and from 5 p.m.

`tests/city-neighborhood.cjs` runs with npm test. `node tests/city-neighborhood-browser.cjs` verifies the side entrance, all four photographed furnished interiors, route back to your own home, indoor/outdoor weather, daily relationship caps, house/lane reload and phone navigation.
