import { Quests } from './QuestsData.js';
import EQOAzones from '../Map/Zones.js';

export { Quests };
export const Map = EQOAzones;

export const Images = {
  cons_con_darkblue: new URL("../images/cons/con_darkblue.png", import.meta.url).href,
  cons_con_green: new URL("../images/cons/con_green.png", import.meta.url).href,
  cons_con_lightblue: new URL("../images/cons/con_lightblue.png", import.meta.url).href,
  cons_con_red: new URL("../images/cons/con_red.png", import.meta.url).href,
  cons_con_white: new URL("../images/cons/con_white.png", import.meta.url).href,
  cons_con_yellow: new URL("../images/cons/con_yellow.png", import.meta.url).href,
  EOQA_Map_BG: new URL("../images/EOQA_Map_BG.png", import.meta.url).href,
  EQOA_BG: new URL("../images/EQOA_BG.png", import.meta.url).href,
  EQOA_Map: new URL("../images/EQOA_Map.png", import.meta.url).href,
  EQOA_Norrath: new URL("../images/EQOA_Norrath.png", import.meta.url).href,
  quests_35_idol_of_lust: new URL("../images/quests/35_idol_of_lust.png", import.meta.url).href,
  quests_35_idol_of_malice: new URL("../images/quests/35_idol_of_malice.png", import.meta.url).href,
  weres_bearwere: new URL("../images/weres/bearwere.png", import.meta.url).href,
  weres_gatorwere: new URL("../images/weres/gatorwere.png", import.meta.url).href,
  weres_lionwere: new URL("../images/weres/lionwere.png", import.meta.url).href,
  weres_ratwere: new URL("../images/weres/ratwere.png", import.meta.url).href,
  weres_vampire: new URL("../images/weres/vampire.png", import.meta.url).href,
  weres_werehunter: new URL("../images/weres/werehunter.png", import.meta.url).href,
  weres_wolfwere: new URL("../images/weres/wolfwere.png", import.meta.url).href,
} as const;

export default { Quests, Map, Images };