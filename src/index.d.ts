export interface EQOAImages {
  [key: string]: string;
}

export const Quests: Record<string, string | object>;
export const Map: [string, number, number][];
export const Images: EQOAImages;

declare const _default: {
  Quests: typeof Quests;
  Map: typeof Map;
  Images: typeof Images;
};

export default _default;