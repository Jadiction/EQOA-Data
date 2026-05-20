export type ItemCategory =
  | 'armor'
  | 'jewelry'
  | 'weapons'
  | 'held'
  | 'crafting'
  | 'miscellaneous'
  | 'unknown'
  | 'gems';

export type ArmorItemType =
  | 'head'
  | 'robe'
  | 'chest'
  | 'forearm'
  | 'twoForearm'
  | 'hands'
  | 'legs'
  | 'feet';

export type JewelryItemType = 'earring' | 'neck' | 'ring' | 'belt';

export type WeaponItemType = 'primary' | 'secondary' | 'twoHand' | 'bow' | 'thrown';

export type HeldItemType = 'shield' | 'held';

export type CraftingItemType =
  | 'fishing'
  | 'weaponCraft'
  | 'armorCraft';

export type MiscellaneousItemType = 'miscellaneous';

export type UnknownItemType = 'unknown';

export type GemCraftingType =
  | 'jewel crafting'
  | 'armor crafting'
  | 'tailoring'
  | 'weapon crafting';

export type GemAssignedAttribute =
  | 'ac'
  | 'agi'
  | 'ar'
  | 'arcane dot'
  | 'arcane hp drain'
  | 'arcane pow drain'
  | 'cha'
  | 'cold proc'
  | 'cr'
  | 'cursed proc'
  | 'dex'
  | 'dr'
  | 'ethereal non dmg proc'
  | 'fire proc'
  | 'fr'
  | 'hp'
  | 'hp major'
  | 'hp max'
  | 'hp minor'
  | 'int'
  | 'lr'
  | 'malign proc'
  | 'poison dot'
  | 'pow'
  | 'pow major'
  | 'pow max'
  | 'pow minor'
  | 'pr'
  | 'sta'
  | 'str'
  | 'wis'
  | 'withering non dmg proc';

export type GemRarity = 'common' | 'uncommon' | 'rare' | 'ultra rare';

export type ItemType =
  | ArmorItemType
  | JewelryItemType
  | WeaponItemType
  | HeldItemType
  | CraftingItemType
  | MiscellaneousItemType
  | UnknownItemType;

export type ItemClassRequirement =
  | 'ALL'
  | 'WAR'
  | 'RAN'
  | 'PAL'
  | 'SK'
  | 'MNK'
  | 'BRD'
  | 'ROG'
  | 'DRU'
  | 'SHM'
  | 'CLR'
  | 'MAG'
  | 'NEC'
  | 'ENC'
  | 'WIZ'
  | 'ALC';

export type ItemRaceRequirement =
  | 'ALL'
  | 'HUM'
  | 'ELF'
  | 'DELF'
  | 'GNO'
  | 'DWF'
  | 'TRL'
  | 'BAR'
  | 'HLF'
  | 'ERU'
  | 'OGR';

export interface ItemRequirements {
  level?: number;
  class?: ItemClassRequirement[];
  race?: ItemRaceRequirement[];
}

export type ItemStatKey =
  | 'str'
  | 'sta'
  | 'agi'
  | 'dex'
  | 'wis'
  | 'int'
  | 'cha'
  | 'hp'
  | 'pow'
  | 'pot'
  | 'hot'
  | 'ac'
  | 'pr'
  | 'dr'
  | 'fr'
  | 'cr'
  | 'lr'
  | 'ar'
  | 'proc';

export interface ItemStats {
  str?: number;
  sta?: number;
  agi?: number;
  dex?: number;
  wis?: number;
  int?: number;
  cha?: number;
  hp?: number;
  pow?: number;
  pot?: number;
  hot?: number;
  ac?: number;
  pr?: number;
  dr?: number;
  fr?: number;
  cr?: number;
  lr?: number;
  ar?: number;
  proc?: number;
}

export interface Item {
  name: string;
  type: ItemType;
  description: string | null;
  requirements?: ItemRequirements;
  maxStack?: number;
  itemHp?: number;
  durability?: number;
  damage?: number;
  attackType?: number;
  stats?: ItemStats;
  noTrade?: true;
  rent?: true;
  lore?: true;
  craft?: true;
}

export interface GemItem {
  name: string;
  type: GemCraftingType;
  assignedAttributes: GemAssignedAttribute[];
  rarity: GemRarity | null;
}

export interface ItemCategoryData {
  items: Item[];
}

export interface GemsItemsData {
  items: GemItem[];
}

export type ArmorItemsData = ItemCategoryData;
export type JewelryItemsData = ItemCategoryData;
export type WeaponsItemsData = ItemCategoryData;
export type HeldItemsData = ItemCategoryData;
export type CraftingItemsData = ItemCategoryData;
export type MiscellaneousItemsData = ItemCategoryData;
export type UnknownItemsData = ItemCategoryData;