import { CHARACTER_RAIMU_ID, CHARACTER_MAI_ID } from './ids.js';

/**
 * Character Event List
 * 
 */

// Raimu
const EVENT_LIST_RAIMU = new Map([
  [20, 'event_appear_sachie'],
  [30, 'event_check_to_do_list'],
  [90, 'event_thinking'],
]);

// Mai
const EVENT_LIST_MAI = new Map([
  [30, 'event_check_to_do_list'],
  [90, 'event_thinking'],
]);


/**
 * Export Data
 * 
 */

export const CHARACTER_EVENT_LIST = new Map([
  [CHARACTER_RAIMU_ID, EVENT_LIST_RAIMU],
  [CHARACTER_MAI_ID, EVENT_LIST_MAI],
]);

export const PROBABILITIES = [20, 30, 90];
