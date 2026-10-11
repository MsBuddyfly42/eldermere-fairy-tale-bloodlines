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
