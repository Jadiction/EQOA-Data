import { Quests } from './QuestsData.js';
import { Information } from './InformationData.js';
import EQOAzones from '../Map/Zones.js';

export { Quests, Information };
export const Map = EQOAzones;

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

export default { Quests, Information, Map, Images };