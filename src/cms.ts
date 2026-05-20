import { Quests } from './QuestsData.js';

export type CMSFilterId = 'race' | 'class' | 'type';
export type CMSFilterCategory = 'Race' | 'Class' | 'Type';
export type CMSClassType = 'Tank' | 'Healer' | 'Melee' | 'Caster';
export type CMSRaceToClassesMap = Record<string, string[]>;
export type CMSClassToTypeMap = Record<string, CMSClassType>;

export interface CMSFilterDefinition {
  id: CMSFilterId;
  category: CMSFilterCategory;
  options: string[];
}

export interface CMSFilters {
  filters: readonly CMSFilterDefinition[];
  raceToClasses: CMSRaceToClassesMap;
  classToRaces: CMSRaceToClassesMap;
  classToType: CMSClassToTypeMap;
}

const CMSClassToType = {
  Alchemist: 'Caster',
  Bard: 'Melee',
  Cleric: 'Healer',
  Druid: 'Healer',
  Enchanter: 'Caster',
  Magician: 'Caster',
  Monk: 'Melee',
  Necromancer: 'Caster',
  Paladin: 'Tank',
  Ranger: 'Melee',
  Rogue: 'Melee',
  Shadowknight: 'Tank',
  Shaman: 'Healer',
  Warrior: 'Tank',
  Wizard: 'Caster',
} as const satisfies CMSClassToTypeMap;

const CMSGroupApplicability = [
  Quests['30,40,49']['group-1-good'].applicable,
  Quests['30,40,49']['group-2-good'].applicable,
  Quests['30,40,49']['group-3-good'].applicable,
  Quests['30,40,49']['group-4-evil'].applicable,
  Quests['30,40,49']['group-5-evil'].applicable,
  Quests['30,40,49']['group-6-evil'].applicable,
] as Array<Record<string, string[]>>;

function buildCMSRaceToClasses(): CMSRaceToClassesMap {
  const raceToClasses = new globalThis.Map<string, Set<string>>();

  for (const applicable of CMSGroupApplicability) {
    for (const [race, classes] of Object.entries(applicable)) {
      const knownClasses = raceToClasses.get(race) ?? new Set<string>();
      for (const className of classes) {
        knownClasses.add(className);
      }
      raceToClasses.set(race, knownClasses);
    }
  }

  const entries = Array.from(raceToClasses.entries())
    .sort(([leftRace], [rightRace]) => leftRace.localeCompare(rightRace))
    .map(([race, classes]) => [race, Array.from(classes).sort()] as const);

  return Object.fromEntries(entries);
}

export const CMSRaceToClasses = buildCMSRaceToClasses();
export const CMSClassTypes = CMSClassToType;
export const CMSFilterDefinitions = [
  { id: 'race', category: 'Race', options: Object.keys(CMSRaceToClasses) },
  { id: 'class', category: 'Class', options: Object.keys(CMSClassToType).sort() },
  { id: 'type', category: 'Type', options: ['Tank', 'Healer', 'Melee', 'Caster'] },
] as const satisfies readonly CMSFilterDefinition[];

export function getCMSFilters(): CMSFilters {
  const classToRaces = Object.fromEntries(
    Object.keys(CMSClassToType)
      .sort()
      .map((className) => [
        className,
        Object.entries(CMSRaceToClasses)
          .filter(([, classes]) => classes.includes(className))
          .map(([race]) => race),
      ]),
  );

  return {
    filters: CMSFilterDefinitions,
    raceToClasses: CMSRaceToClasses,
    classToRaces,
    classToType: CMSClassToType,
  };
}