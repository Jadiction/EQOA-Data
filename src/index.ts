import { Quests } from './QuestsData.js';
import EQOAzones from '../Map/Zones.js';

/**
 * Usage:
 *   import { Quests, Map } from 'eqoa-data';
 *   // Quests['17'], Quests['Misc'], etc.
 *   // Map is the EQOAzones array
 */
export { Quests };
export const Map = EQOAzones;

export default { Quests, Map };