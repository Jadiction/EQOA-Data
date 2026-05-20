import { getCMSFilters } from './cms.js';

export {
  CMSClassTypes,
  CMSFilterDefinitions,
  CMSRaceToClasses,
  getCMSFilters,
} from './cms.js';
export type * from './cms.js';
export type * from './items.js';

export interface EQOAImages {
  [key: string]: string;
}

export interface Contributor {
  login: string;
  id: number;
  commits: number;
}

export type Alignment = 'good' | 'neutral' | 'evil';
export type PoiCategory = 'quest' | 'rare-mob' | 'raid-mob' | 'other';

export interface Location {
  x: number;
  y: number;
}

export interface Town extends Location {
  name: string;
  alignment: Alignment;
  aka?: string;
}

export interface Biome extends Location {
  name: string;
}

export interface POI extends Location {
  name: string;
  icon: string;
  style?: Record<string, string | number>;
  category?: PoiCategory;
  questGuideIds?: string[];
  poiImageKey?: string;
  levelRange?: `${number}-${number}`;
}

export interface MapData {
  towns: Town[];
  biomes: Biome[];
  pois: POI[];
}

export type CoachMapData = Record<string, string[]>;

export const Quests: Record<string, string | object>;
export const Information: Record<string, string | object>;
export const Map: MapData;
export const CoachMap: CoachMapData;
export const MapContributors: Contributor[];
export const Images: EQOAImages;

declare const _default: {
  Quests: typeof Quests;
  Information: typeof Information;
  Map: typeof Map;
  CoachMap: typeof CoachMap;
  MapContributors: typeof MapContributors;
  Images: typeof Images;
  getCMSFilters: typeof getCMSFilters;
};

export default _default;