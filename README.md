# Eldermere — The Fairy-Tale Bloodlines

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

## Keep your progress

Saves are stored in the current browser and website. Before switching from the existing game to Render, export your progress using the map’s save controls. Import that JSON file on the new site. Different website addresses do not automatically share saves. There is no account or cloud-save backend.

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

Easy controls are now the default: click/tap the highlighted object, press E/Use, or choose the action button. One garden action plays the full digging/planting, watering, or harvesting sequence; baking has single-action stirring and kneading. Precision gestures remain optional under More hands-on controls. Garden beds show four spaced plants, no duplicate crop layer or smaller soil patch, and a basket beside the bed.

Selecting Plant moonleaf, Water the seedlings, or Harvest two moonleaf sprigs immediately begins the visible sequence. Use/E targets the active work directly and does not depend on the nearby-object selection.

The garden now offers 22 crops in every outdoor and conservatory plot: moonleaf, strawberries, carrots, pumpkins, mint, basil, moonflowers, starblossoms, tomatoes, potatoes, corn, wheat, lettuce, onions, peas, apples, blueberries, lavender, rosemary, sunflowers, silverberries and starlight mushrooms. All use the complete sow → water → timed growth → harvest cycle with one-click animated actions, four spaced plants and crop-specific geometry. Each crop has its own growth time (45–90 seconds) and harvest quantity, deposited in the satchel. Existing moonleaf saves and timers continue unchanged.

Activity commands now immediately start their full visible sequence, including crafting, equipment, decorations, feeding, gifts, trades, evidence handling and home deliveries/rewards. Easy controls do not require a second confirmation or repeated gesture steps. Archery and lantern-catching retain player input for their game challenges.

## Everyday life and harvests
Use **Kitchen & harvest** for twelve crop/fish recipes, market sales and saved flower arrangements. Cooking shows preparation, stirring, heat and serving; original bread/potion activities remain. Canceling leaves ingredients intact. Citizens carry baskets/tools, shoppers visit stalls, guards alternate watches and families head home in the evening. Interiors have moving curtains, opening stocked cupboards and flickering hearths. Turn Sound on for location-based river/waterfall/hearth ambience and grass/stone/wood footstep tones. Mobile rendering uses a lower pixel ratio.

The elven visual pass adds leaf carvings, silver accents, woven cloth and timber surfaces, curved bridge rails, styled interiors, articulated woodland animals, windblown grass and foliage, and animated river surfaces. The **Elven graphics** button offers Balanced, High and Light detail without changing adventure progress. Automated scene checks use a renderer stub; GPU appearance and device performance require a browser check.

Roofs now follow the supplied elven cottage reference: layered blue scalloped shingles, sweeping curved roof surfaces and timber edges, warm arched dormers and slender spires. This is an original procedural 3D interpretation of the reference rather than a reproduction of the illustration.
