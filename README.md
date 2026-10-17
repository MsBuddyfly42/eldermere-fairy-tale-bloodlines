# Eldoria — The Fairy-Tale Bloodlines

A playable 3D elven kingdom with connected districts, furnished buildings, the Silverstitch family campaign, recurring adventures, citizen households, a marketplace, gardens, wildlife, weather, and Aurelin’s storytelling treehouse.

## Play locally

Requires a modern browser with WebGL2. From this folder, run:

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. Serve the files over HTTP rather than opening index.html directly. All game assets and Three.js are included; no npm dependencies or external runtime CDN are required.

## Controls

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

