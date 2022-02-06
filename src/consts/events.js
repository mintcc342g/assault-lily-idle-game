// Common
export const EVENT_PROBABILITY_20 = 20;
export const EVENT_PROBABILITY_90 = 90;
export const EVENT_TEXTBOX = 'event_textbox';
export const EVENT_TO_DO_TEXTBOX = 'event_to_do_textbox';

// Raimu
export const EVENT_CONVERSATION_WITH_SACHIE = 'conversation_with_sachie';
export const EVENT_WATCHED_OVER_BY_MIRAI = 'watched_over_by_mirai';
export const EVENT_LIST_RAIMU = new Map([
  [EVENT_PROBABILITY_20, EVENT_TO_DO_TEXTBOX],
  [EVENT_PROBABILITY_90, EVENT_TEXTBOX],
  // [EVENT_PROBABILITY_10, EVENT_CONVERSATION_WITH_SACHIE],
  // [EVENT_PROBABILITY_5, EVENT_WATCHED_OVER_BY_MIRAI],
]);

// Mai
export const EVENT_WITH_TAZUSA = 'with_tazusa';
export const EVENT_LIST_MAI = new Map([
  [EVENT_PROBABILITY_20, EVENT_TO_DO_TEXTBOX],
  [EVENT_PROBABILITY_90, EVENT_TEXTBOX],
  // [EVENT_PROBABILITY_10, EVENT_WITH_TAZUSA],
]);
