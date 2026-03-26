import { Quests } from './QuestsData.js';
import { Information } from './InformationData.js';
import EQOAzones from '../Map/zones.json' with { type: "json" };

export { Quests, Information };
export const Map = EQOAzones;

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
} as const;

const CMSGroupApplicability = [
  Quests['30,40,49']['group-1-good'].applicable,
  Quests['30,40,49']['group-2-good'].applicable,
  Quests['30,40,49']['group-3-good'].applicable,
  Quests['30,40,49']['group-4-evil'].applicable,
  Quests['30,40,49']['group-5-evil'].applicable,
  Quests['30,40,49']['group-6-evil'].applicable,
] as Array<Record<string, string[]>>;

function buildCMSRaceToClasses() {
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

  return Object.fromEntries(entries) as Record<string, string[]>;
}

export const CMSRaceToClasses = buildCMSRaceToClasses();
export const CMSClassTypes = CMSClassToType;
export const CMSFilterDefinitions = [
  { id: 'race', category: 'Race', options: Object.keys(CMSRaceToClasses) },
  { id: 'class', category: 'Class', options: Object.keys(CMSClassToType).sort() },
  { id: 'type', category: 'Type', options: ['Tank', 'Healer', 'Melee', 'Caster'] },
] as const;

export function getCMSFilters() {
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

export const Images = {
  city_maps_Fayspire: new URL("../images/city_maps/Fayspire.png", import.meta.url).href,
  city_maps_Freeport: new URL("../images/city_maps/Freeport.png", import.meta.url).href,
  city_maps_Grobb: new URL("../images/city_maps/Grobb.png", import.meta.url).href,
  city_maps_Halas: new URL("../images/city_maps/Halas.png", import.meta.url).href,
  city_maps_Highbourne: new URL("../images/city_maps/Highbourne.png", import.meta.url).href,
  city_maps_KlikAnon: new URL("../images/city_maps/KlikAnon.png", import.meta.url).href,
  city_maps_Moradhim: new URL("../images/city_maps/Moradhim.png", import.meta.url).href,
  city_maps_Neriak_Nektulos: new URL("../images/city_maps/Neriak-Nektulos.png", import.meta.url).href,
  city_maps_Oggok: new URL("../images/city_maps/Oggok.png", import.meta.url).href,
  city_maps_Qeynos: new URL("../images/city_maps/Qeynos.png", import.meta.url).href,
  city_maps_Rivervale: new URL("../images/city_maps/Rivervale.png", import.meta.url).href,
  city_maps_Surefall_Glade: new URL("../images/city_maps/Surefall_Glade.png", import.meta.url).href,
  city_maps_Tethelin: new URL("../images/city_maps/Tethelin.png", import.meta.url).href,
  cons_con_darkblue: new URL("../images/cons/con_darkblue.png", import.meta.url).href,
  cons_con_green: new URL("../images/cons/con_green.png", import.meta.url).href,
  cons_con_lightblue: new URL("../images/cons/con_lightblue.png", import.meta.url).href,
  cons_con_red: new URL("../images/cons/con_red.png", import.meta.url).href,
  cons_con_white: new URL("../images/cons/con_white.png", import.meta.url).href,
  cons_con_yellow: new URL("../images/cons/con_yellow.png", import.meta.url).href,
  epic_weapons_49_Alchemist_Hands: new URL("../images/epic_weapons/49/Alchemist_Hands.jpg", import.meta.url).href,
  epic_weapons_49_Alchemist_Robe: new URL("../images/epic_weapons/49/Alchemist_Robe.gif", import.meta.url).href,
  epic_weapons_49_Bard_Rapier: new URL("../images/epic_weapons/49/Bard_Rapier.jpg", import.meta.url).href,
  epic_weapons_49_Bard_Sabre: new URL("../images/epic_weapons/49/Bard_Sabre.jpg", import.meta.url).href,
  epic_weapons_49_Cleric_Greathammer: new URL("../images/epic_weapons/49/Cleric_Greathammer.jpg", import.meta.url).href,
  epic_weapons_49_Cleric_Hammer: new URL("../images/epic_weapons/49/Cleric_Hammer.jpg", import.meta.url).href,
  epic_weapons_49_Druid_Scimitar: new URL("../images/epic_weapons/49/Druid_Scimitar.jpg", import.meta.url).href,
  epic_weapons_49_Druid_Staff: new URL("../images/epic_weapons/49/Druid_Staff.jpg", import.meta.url).href,
  epic_weapons_49_Enchanter_Rod: new URL("../images/epic_weapons/49/Enchanter_Rod.jpg", import.meta.url).href,
  epic_weapons_49_Enchanter_Staff: new URL("../images/epic_weapons/49/Enchanter_Staff.jpg", import.meta.url).href,
  epic_weapons_49_Magician_Rod: new URL("../images/epic_weapons/49/Magician_Rod.jpg", import.meta.url).href,
  epic_weapons_49_Magician_Staff: new URL("../images/epic_weapons/49/Magician_Staff.jpg", import.meta.url).href,
  epic_weapons_49_Monk_Knuckles: new URL("../images/epic_weapons/49/Monk_Knuckles.jpg", import.meta.url).href,
  epic_weapons_49_Monk_Staff: new URL("../images/epic_weapons/49/Monk_Staff.jpg", import.meta.url).href,
  epic_weapons_49_Necromancer_Sickle: new URL("../images/epic_weapons/49/Necromancer_Sickle.jpg", import.meta.url).href,
  epic_weapons_49_Necromancer_Totem: new URL("../images/epic_weapons/49/Necromancer_Totem.jpg", import.meta.url).href,
  epic_weapons_49_Paladin_Greatsword: new URL("../images/epic_weapons/49/Paladin_Greatsword.jpg", import.meta.url).href,
  epic_weapons_49_Paladin_Warhammer: new URL("../images/epic_weapons/49/Paladin_Warhammer.jpg", import.meta.url).href,
  epic_weapons_49_Ranger_Longsword: new URL("../images/epic_weapons/49/Ranger_Longsword.jpg", import.meta.url).href,
  epic_weapons_49_Ranger_Scimitar: new URL("../images/epic_weapons/49/Ranger_Scimitar.jpg", import.meta.url).href,
  epic_weapons_49_Rogue_Dagger: new URL("../images/epic_weapons/49/Rogue_Dagger.jpg", import.meta.url).href,
  epic_weapons_49_Rogue_Stiletto: new URL("../images/epic_weapons/49/Rogue_Stiletto.jpg", import.meta.url).href,
  epic_weapons_49_Shadowknight_Greatsword: new URL("../images/epic_weapons/49/Shadowknight_Greatsword.jpg", import.meta.url).href,
  epic_weapons_49_Shadowknight_Polearm: new URL("../images/epic_weapons/49/Shadowknight_Polearm.jpg", import.meta.url).href,
  epic_weapons_49_Shaman_Club: new URL("../images/epic_weapons/49/Shaman_Club.jpg", import.meta.url).href,
  epic_weapons_49_Shaman_Spear: new URL("../images/epic_weapons/49/Shaman_Spear.jpg", import.meta.url).href,
  epic_weapons_49_Warrior_Greataxe: new URL("../images/epic_weapons/49/Warrior_Greataxe.jpg", import.meta.url).href,
  epic_weapons_49_Warrior_Longsword: new URL("../images/epic_weapons/49/Warrior_Longsword.jpg", import.meta.url).href,
  epic_weapons_49_Wizard_Rod: new URL("../images/epic_weapons/49/Wizard_Rod.jpg", import.meta.url).href,
  epic_weapons_49_Wizard_Staff: new URL("../images/epic_weapons/49/Wizard_Staff.jpg", import.meta.url).href,
  EQOA_BG: new URL("../images/EQOA_BG.png", import.meta.url).href,
  EQOA_Map: new URL("../images/EQOA_Map.png", import.meta.url).href,
  EQOA_Norrath: new URL("../images/EQOA_Norrath.png", import.meta.url).href,
  info_how_to_play_1: new URL("../images/info/how_to_play/1.png", import.meta.url).href,
  info_how_to_play_10: new URL("../images/info/how_to_play/10.png", import.meta.url).href,
  info_how_to_play_11: new URL("../images/info/how_to_play/11.png", import.meta.url).href,
  info_how_to_play_12: new URL("../images/info/how_to_play/12.png", import.meta.url).href,
  info_how_to_play_13: new URL("../images/info/how_to_play/13.png", import.meta.url).href,
  info_how_to_play_2: new URL("../images/info/how_to_play/2.png", import.meta.url).href,
  info_how_to_play_3: new URL("../images/info/how_to_play/3.png", import.meta.url).href,
  info_how_to_play_4: new URL("../images/info/how_to_play/4.png", import.meta.url).href,
  info_how_to_play_5: new URL("../images/info/how_to_play/5.png", import.meta.url).href,
  info_how_to_play_6: new URL("../images/info/how_to_play/6.png", import.meta.url).href,
  info_how_to_play_7: new URL("../images/info/how_to_play/7.png", import.meta.url).href,
  info_how_to_play_8: new URL("../images/info/how_to_play/8.png", import.meta.url).href,
  info_how_to_play_9: new URL("../images/info/how_to_play/9.png", import.meta.url).href,
  quests_35_idol_of_lust: new URL("../images/quests/35_idol_of_lust.png", import.meta.url).href,
  quests_35_idol_of_malice: new URL("../images/quests/35_idol_of_malice.png", import.meta.url).href,
  spell_icons_Bleeding_Heart: new URL("../images/spell_icons/Bleeding_Heart.png", import.meta.url).href,
  spell_icons_Boot_Shackled: new URL("../images/spell_icons/Boot_Shackled.png", import.meta.url).href,
  spell_icons_Boot_Sticky: new URL("../images/spell_icons/Boot_Sticky.png", import.meta.url).href,
  spell_icons_Boot: new URL("../images/spell_icons/Boot.png", import.meta.url).href,
  spell_icons_Brazier: new URL("../images/spell_icons/Brazier.png", import.meta.url).href,
  spell_icons_Cold: new URL("../images/spell_icons/Cold.png", import.meta.url).href,
  spell_icons_Defense_Active: new URL("../images/spell_icons/Defense_Active.png", import.meta.url).href,
  spell_icons_DoT: new URL("../images/spell_icons/DoT.png", import.meta.url).href,
  spell_icons_Fear: new URL("../images/spell_icons/Fear.png", import.meta.url).href,
  spell_icons_Fire: new URL("../images/spell_icons/Fire.png", import.meta.url).href,
  spell_icons_Forage: new URL("../images/spell_icons/Forage.png", import.meta.url).href,
  spell_icons_Gate: new URL("../images/spell_icons/Gate.png", import.meta.url).href,
  spell_icons_Heal: new URL("../images/spell_icons/Heal.png", import.meta.url).href,
  spell_icons_Mask: new URL("../images/spell_icons/Mask.png", import.meta.url).href,
  spell_icons_Muscle_Arm: new URL("../images/spell_icons/Muscle_Arm.png", import.meta.url).href,
  spell_icons_Physical_Alteration: new URL("../images/spell_icons/Physical_Alteration.png", import.meta.url).href,
  spell_icons_Physical_Stat: new URL("../images/spell_icons/Physical_Stat.png", import.meta.url).href,
  spell_icons_Play_Instruments: new URL("../images/spell_icons/Play_Instruments.png", import.meta.url).href,
  spell_icons_Poison: new URL("../images/spell_icons/Poison.png", import.meta.url).href,
  spell_icons_Profile_Cloud: new URL("../images/spell_icons/Profile_Cloud.png", import.meta.url).href,
  spell_icons_Profile_Lightning: new URL("../images/spell_icons/Profile_Lightning.png", import.meta.url).href,
  spell_icons_Profile_Pinch: new URL("../images/spell_icons/Profile_Pinch.png", import.meta.url).href,
  spell_icons_Profile_Web: new URL("../images/spell_icons/Profile_Web.png", import.meta.url).href,
  spell_icons_Red_Cross: new URL("../images/spell_icons/Red_Cross.png", import.meta.url).href,
  spell_icons_Scales: new URL("../images/spell_icons/Scales.png", import.meta.url).href,
  spell_icons_Summon: new URL("../images/spell_icons/Summon.png", import.meta.url).href,
  spell_icons_Summoning: new URL("../images/spell_icons/Summoning.png", import.meta.url).href,
  spell_icons_Sword: new URL("../images/spell_icons/Sword.png", import.meta.url).href,
  spell_icons_Wand: new URL("../images/spell_icons/Wand.png", import.meta.url).href,
  spell_icons_Waves: new URL("../images/spell_icons/Waves.png", import.meta.url).href,
  spell_icons_Weapons_Ranged: new URL("../images/spell_icons/Weapons_Ranged.png", import.meta.url).href,
  weres_bearwere: new URL("../images/weres/bearwere.png", import.meta.url).href,
  weres_gatorwere: new URL("../images/weres/gatorwere.png", import.meta.url).href,
  weres_lionwere: new URL("../images/weres/lionwere.png", import.meta.url).href,
  weres_ratwere: new URL("../images/weres/ratwere.png", import.meta.url).href,
  weres_vampire: new URL("../images/weres/vampire.png", import.meta.url).href,
  weres_werehunter: new URL("../images/weres/werehunter.png", import.meta.url).href,
  weres_wolfwere: new URL("../images/weres/wolfwere.png", import.meta.url).href,
} as const;

export default { Quests, Information, Map, Images, getCMSFilters };