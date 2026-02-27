export interface EQOAImages {
  [key: string]: string;
}

export const Quests: Record<string, string | object>;
export const Information: Record<string, string | object>;
export const Map: [string, number, number][];
export const Images: EQOAImages;

declare const _default: {
  Quests: typeof Quests;
  Information: typeof Information;
  Map: typeof Map;
  Images: typeof Images;
};

export default _default;