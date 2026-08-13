export type Question = {
  id: string;
  text: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
};

/** Mock question bank — a test draws 10 random questions from here. */
export const QUESTION_BANK: Question[] = [
  {
    id: "q1",
    text: "What is the safe holding temperature for hot ready-to-eat food?",
    options: ["Above 60°C", "Between 20°C and 40°C", "Below 5°C", "Any temperature"],
    answer: 0,
  },
  {
    id: "q2",
    text: "How long should you wash your hands before handling food?",
    options: ["3 seconds", "At least 20 seconds", "1 minute", "No need if using gloves"],
    answer: 1,
  },
  {
    id: "q3",
    text: "Which colour chopping board is used for raw meat in our outlets?",
    options: ["Green", "Blue", "Red", "Yellow"],
    answer: 2,
  },
  {
    id: "q4",
    text: "What should you do first when a guest complains about their order?",
    options: [
      "Explain that the kitchen is busy",
      "Listen and apologise, then offer a solution",
      "Call the supervisor and walk away",
      "Ask the guest to fill a form",
    ],
    answer: 1,
  },
  {
    id: "q5",
    text: "When must the cold storage temperature log be filled in?",
    options: [
      "Once a week",
      "Only when the audit comes",
      "Every shift",
      "Once a month",
    ],
    answer: 2,
  },
  {
    id: "q6",
    text: "What is the maximum time cooked food may stay in the danger zone?",
    options: ["2 hours", "6 hours", "8 hours", "12 hours"],
    answer: 0,
  },
  {
    id: "q7",
    text: "Who is allowed to sign off a stock adjustment at the outlet?",
    options: [
      "Any crew member",
      "The supervisor on duty",
      "The guest",
      "Nobody, adjustments are not allowed",
    ],
    answer: 1,
  },
  {
    id: "q8",
    text: "What should be done with a chipped serving plate?",
    options: [
      "Use it for staff meals",
      "Use it only for dry food",
      "Remove it from service and discard it",
      "Turn the chip away from the guest",
    ],
    answer: 2,
  },
  {
    id: "q9",
    text: "Which document must be checked when receiving a delivery?",
    options: [
      "Only the invoice total",
      "Delivery note, expiry dates and product temperature",
      "The driver's ID",
      "Nothing, the warehouse already checked",
    ],
    answer: 1,
  },
  {
    id: "q10",
    text: "What is the first step if you notice a small fire in the kitchen?",
    options: [
      "Take a photo for the report",
      "Open all the windows",
      "Raise the alarm and use the nearest extinguisher if it is safe",
      "Continue working and tell the supervisor later",
    ],
    answer: 2,
  },
  {
    id: "q11",
    text: "How should allergen information be handled when a guest asks?",
    options: [
      "Guess based on the menu picture",
      "Check the allergen sheet and confirm with the kitchen",
      "Tell the guest all items are safe",
      "Ask another guest",
    ],
    answer: 1,
  },
  {
    id: "q12",
    text: "When should a crew member report a workplace injury?",
    options: [
      "Immediately, no matter how small",
      "Only if a day off is needed",
      "At the end of the month",
      "Only if a guest saw it",
    ],
    answer: 0,
  },
  {
    id: "q13",
    text: "What is the correct order for manual dishwashing?",
    options: [
      "Rinse, wash, sanitise, air dry",
      "Wash, rinse, sanitise, air dry",
      "Sanitise, wash, rinse, towel dry",
      "Wash, sanitise, towel dry",
    ],
    answer: 1,
  },
  {
    id: "q14",
    text: "How should the cash drawer be handled during a shift change?",
    options: [
      "Leave it open for the next cashier",
      "Count it together with the supervisor and sign the handover",
      "Hand it over verbally",
      "Lock it and leave without counting",
    ],
    answer: 1,
  },
  {
    id: "q15",
    text: "Which of these is a sign that food should be discarded?",
    options: [
      "It is past its use-by date",
      "It looks slightly different than usual",
      "It was delivered this morning",
      "It is still cold",
    ],
    answer: 0,
  },
  {
    id: "q16",
    text: "What is the standard greeting time for a guest entering the outlet?",
    options: [
      "Within 30 seconds",
      "Within 5 minutes",
      "Only when they reach the counter",
      "Only during quiet hours",
    ],
    answer: 0,
  },
  {
    id: "q17",
    text: "Personal protective equipment in the kitchen must be:",
    options: [
      "Shared between shifts without cleaning",
      "Worn only during inspections",
      "Clean, undamaged and worn at all times in the area",
      "Optional for experienced crew",
    ],
    answer: 2,
  },
  {
    id: "q18",
    text: "Where should cleaning chemicals be stored?",
    options: [
      "Above the food preparation table",
      "In a labelled, separate storage away from food",
      "Next to the dry goods",
      "In an unlabelled bottle near the sink",
    ],
    answer: 1,
  },
];

/** Fisher-Yates pick of `count` questions. Call from an event handler only. */
export function pickQuestions(count = 10) {
  const pool = [...QUESTION_BANK];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}
