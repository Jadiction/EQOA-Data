export interface EQOAImages {
  [key: string]: string;
}

export type CMSFilterId = 'race' | 'class' | 'type';
export type CMSFilterCategory = 'Race' | 'Class' | 'Type';
export type CMSClassType = 'Tank' | 'Healer' | 'Melee' | 'Caster';

export interface CMSFilterDefinition {
  id: CMSFilterId;
  category: CMSFilterCategory;
  options: string[];
}

export type CMSRaceToClassesMap = Record<string, string[]>;
export type CMSClassToTypeMap = Record<string, CMSClassType>;

export interface CMSFilters {
  filters: CMSFilterDefinition[];
  raceToClasses: CMSRaceToClassesMap;
  classToRaces: Record<string, string[]>;
  classToType: CMSClassToTypeMap;
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
  style?: React.CSSProperties;
  category?: PoiCategory;
  questGuideIds?: string[];
}

export interface MapData {
  towns: Town[];
  biomes: Biome[];
  pois: POI[];
}

export const Quests: Record<string, string | object>;
export const Information: Record<string, string | object>;
export const Map: MapData;
export const Images: EQOAImages;
export const CMSRaceToClasses: CMSRaceToClassesMap;
export const CMSClassTypes: CMSClassToTypeMap;
export const CMSFilterDefinitions: CMSFilterDefinition[];
export function getCMSFilters(): CMSFilters;

declare const _default: {
  Quests: typeof Quests;
  Information: typeof Information;
  Map: typeof Map;
  Images: typeof Images;
  getCMSFilters: typeof getCMSFilters;
};

export default _default;