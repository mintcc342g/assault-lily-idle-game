export const EVENT_PROBABILITY_20 = 20;
export const EVENT_PROBABILITY_30 = 30;
export const EVENT_PROBABILITY_90 = 90;

/**
 * Common Events
 * 
 */
export const EVENT_SELF_SPEECH = 'event_self_speech';
export const EVENT_CHECK_TO_DO_LIST = 'event_check_to_do_list';
export const EVENT_CONVERSATION = 'event_conversation';
export const EVENT_CONVERSATION_DONE = 'event_conversation_done';


/**
 * Character Events
 * 
 */

// Raimu
export const EVENT_APPEAR_SACHIE = 'event_appear_sachie';
// export const EVENT_WATCHED_OVER_BY_MIRAI = 'watched_over_by_mirai';

// Mai
// export const EVENT_WITH_TAZUSA = 'with_tazusa';


/**
 * Character Event List
 * 
 */

// Raimu
export const EVENT_LIST_RAIMU = new Map([
  [EVENT_PROBABILITY_20, EVENT_APPEAR_SACHIE],
  [EVENT_PROBABILITY_30, EVENT_CHECK_TO_DO_LIST],
  [EVENT_PROBABILITY_90, EVENT_SELF_SPEECH],
  // [EVENT_PROBABILITY_5, EVENT_WATCHED_OVER_BY_MIRAI],
]);

// Mai
export const EVENT_LIST_MAI = new Map([
  [EVENT_PROBABILITY_30, EVENT_CHECK_TO_DO_LIST],
  [EVENT_PROBABILITY_90, EVENT_SELF_SPEECH],
  // [EVENT_PROBABILITY_20, EVENT_WITH_TAZUSA],
]);
