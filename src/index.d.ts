export interface EQOAImages {
  [key: string]: string;
}

export const Quests: Record<string, string | object>;
export const Map: [string, number, number][];

declare const _default: {
  Quests: typeof Quests;
  Map: typeof Map;
};

export default _default;