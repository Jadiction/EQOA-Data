# EQOA Data
Structured EverQuest Online Adventures (EQOA) data package for quests, map zone coordinates, and image assets used by Jadiction.com (and free for others to use).

## What This Repo Offers
- `Quests`: quest datasets grouped by level range and questline (`Quests/*.json`).
- `Information`: supplemental reference datasets (`Information/*.json`).
- `Images`: generated URL exports for all images in `images/` (including nested folders).

This package is published as ESM and intended for apps/sites that need EQOA reference data without scraping or manual copy/paste.

## Install
```bash
npm install github:Jadiction/EQOA-Data
```

## Usage
```ts
import { Quests, Information, Images } from "eqoa-data";

const lowLevelQuests = Quests["1-20"];
const startingCities = Information.starting_cities;
const bearWereImage = Images.weres_bearwere;
```

You can also import published images directly:
```ts
import mapImage from "eqoa-data/images/EQOA_Map.png";
```

## Repository Layout
- `Quests/`: source JSON files for quest data.
- `Information/`: source JSON files for non-quest reference data.
- `images/`: static image assets (supports nested folders).
- `src/QuestsData.ts`: generated quest aggregation into exported `Quests`.
- `src/InformationData.ts`: generated information aggregation into exported `Information`.
- `src/index.ts`: main package exports (`Quests`, `Information`, `Images`).
- `scripts/generate-json-exports.mjs`: regenerates JSON data exports from `Quests/` and `Information/`.
- `scripts/generate-images-export.mjs`: regenerates the `Images` export block from `images/`.

Available scripts:
- `npm run generate:data`: rebuilds `src/QuestsData.ts` and `src/InformationData.ts` from JSON folders.
- `npm run generate:images`: rebuilds `Images` in `src/index.ts` from `images/` recursively.
- `npm run build`: builds distributable output to `dist/` via `tsup`.
- `npm run dev`: watch mode build.

## Contributing
Contributions are welcome for quest corrections, new or improved quest data/formatting, and image assets (such as screenshots to better help with the guides).

### Contribution Flow
(Easy) Utilize the editor at [https://jadiction.com/en/eqoa/editor](https://jadiction.com/en/eqoa/editor)

*OR*
```
1. Fork the repo and create a branch.
2. Make your changes.
5. Run `npm run build` to ensure the package still compiles.
6. Open a Pull Request (PR) with change notes.
```

### Contribution Guidelines/Notes
- To your best ability, use proper grammar. Currently the generated guides are not matching a consistent formatting or holding the ideal standards, although I'd like to improve this later on.
- "cons color" in strings used in guides get automatically replaced with a standard "CONS color [Image]"
- To utilize images (once added to `images/quests/`) in the markdown, use this format:
```
![image alt attribute aka simple text explanation|WIDTHxHEIGHT](file_name)
![simple image summary|WxH](file_name)
```

**In-use examples** (can be found in `Quests/23-47.json`):

```
![Idol of Malice location|319x205](35_idol_of_malice)
![Idol of List location|320x205](35_idol_of_lust)
```
- Preserve existing JSON style and key naming patterns.
- When adding quest images into `images/quests/`, stick to the naming convention of level/category_relation.png

**Examples**:
- 1-20_freeport_bard_level_1_example.png
- 17_klick_anon_example.png
- 35_idol_of_lust.png
