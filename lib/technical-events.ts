export interface TechnicalEventSpec {
  id: string;
  number: string;
  title: string;
  tagline: string;
  feeDesc: string;
  baseFeeNum: number;
  feeMode: "flat" | "per_person";
  teamFormat: string;
  venue: string;
  day: string;
  capacity: string;
  intro: string;
  eventFlow: string[];
  rules: string[];
  confirmation: string;
  isSolo: boolean;
  teamSize: number;
}

export const TECHNICAL_EVENTS: TechnicalEventSpec[] = [
  {
    id: "cyber-hunt",
    number: "01",
    title: "CYBER HUNT",
    tagline: "Unlock the clues. Crack the code. Find the final answer.",
    feeDesc: "₹50 per participant",
    baseFeeNum: 50,
    feeMode: "per_person",
    teamFormat: "Individual participation",
    venue: "Lab 3",
    day: "Day 1",
    capacity: "30–40 participants",
    intro:
      "A digital treasure hunt in which individual participants solve cyber-related puzzles to unlock a sequence of password-protected files.",
    eventFlow: [
      "Each participant registers individually and receives the first password-protected PDF.",
      "Solve the puzzle in the PDF to discover the next file's password.",
      "Unlock each successive PDF and solve its challenge.",
      "Continue through the sequence without skipping files.",
      "Submit the final answer after unlocking the last file.",
      "The first participant to submit the correct final answer wins.",
    ],
    rules: [
      "All participants start with the same first file.",
      "Participants cannot skip files or use passwords obtained from other participants.",
      "Only permitted devices and tools may be used.",
      "Organisers may provide limited hints, with predefined penalties if applicable.",
      "In case of a technical issue, participants must inform the event coordinator.",
      "The winner is determined by the first correctly verified final submission.",
    ],
    confirmation:
      "Thank you for registering for CYBER HUNT. Your details will be reviewed by the organising committee. Participation is confirmed after registration and payment verification. Venue: Lab 3.",
    isSolo: true,
    teamSize: 1,
  },
  {
    id: "ai-prompt-wars",
    number: "02",
    title: "AI PROMPT WARS",
    tagline: "Prompt smarter. Refine better. Spot what AI gets wrong.",
    feeDesc: "₹100 per team",
    baseFeeNum: 100,
    feeMode: "flat",
    teamFormat: "Exactly 2 participants per team",
    venue: "Lab 3",
    day: "Day 2",
    capacity: "10–15 teams",
    intro:
      "A competition testing prompt engineering, creativity, refinement and the ability to identify errors in AI-generated content.",
    eventFlow: [
      "Prompt Build: Teams receive a common task and create an AI prompt to achieve the desired result.",
      "Refinement Round: Teams improve a weak or imperfect AI-generated output through better prompting.",
      "AI Error Audit: Finalists identify errors, inaccuracies or hallucinations in an AI-generated response.",
      "Judges evaluate the results and declare the winner.",
    ],
    rules: [
      "Only AI tools approved by the organisers may be used.",
      "Teams must save and submit their prompts when requested.",
      "Pre-prepared outputs and external assistance are prohibited.",
      "All teams receive equivalent tasks and time limits.",
      "Judging considers prompt quality, accuracy, relevance, creativity and error detection.",
      "Judges' decisions are final.",
    ],
    confirmation:
      "Thank you for registering for AI PROMPT WARS. Your details will be reviewed by the organising committee. Participation is confirmed after registration and payment verification. Venue: Lab 3.",
    isSolo: false,
    teamSize: 2,
  },
  {
    id: "algorithm-auction",
    number: "03",
    title: "ALGORITHM AUCTION",
    tagline: "Bid with confidence. Solve for the win.",
    feeDesc: "₹150 per team",
    baseFeeNum: 150,
    feeMode: "flat",
    teamFormat: "Exactly 2 participants per team",
    venue: "6A",
    day: "Day 2",
    capacity: "Maximum 10 teams",
    intro:
      "A strategic competition where teams bid virtual currency on algorithmic challenges and earn rewards for solving them.",
    eventFlow: [
      "Each team receives an equal amount of virtual CyberCoins.",
      "The auctioneer presents an algorithm or programming challenge.",
      "Teams bid on the challenge based on their confidence and available currency.",
      "The highest valid bidder receives the right to solve it.",
      "A correct solution earns the announced reward; failure results in the stated penalty.",
      "The auction continues through multiple challenges.",
      "The team with the highest final score wins.",
    ],
    rules: [
      "Every team starts with the same amount of CyberCoins.",
      "Bids cannot be withdrawn once accepted.",
      "Teams must submit solutions within the specified time.",
      "No external assistance or sharing of solutions is allowed.",
      "Rewards, penalties and remaining-currency calculations must be announced beforehand.",
      "Ties are resolved using a predetermined tie-break rule.",
    ],
    confirmation:
      "Thank you for registering for ALGORITHM AUCTION. Your details will be reviewed by the organising committee. Participation is confirmed after registration and payment verification. Venue: 6A.",
    isSolo: false,
    teamSize: 2,
  },
  {
    id: "among-us",
    number: "04",
    title: "AMONG US — CYBERSTRIKE EDITION",
    tagline: "Complete the tasks. Find the impostors. Trust no one.",
    feeDesc: "₹80 per participant",
    baseFeeNum: 80,
    feeMode: "per_person",
    teamFormat: "Individual participation",
    venue: "Lab 2",
    day: "Day 2",
    capacity: "36 individual participants total across 3 rounds",
    intro:
      "A real-life social-deduction game where crewmates complete technology tasks while secretly identifying impostors.",
    eventFlow: [
      "Participants are assigned secret roles: Crewmates or Impostors.",
      "Crewmates begin completing tasks at designated technology stations.",
      "Impostors secretly attempt to mislead participants or disrupt progress.",
      "Players can call an emergency meeting when they suspect someone.",
      "Participants discuss the evidence and vote to eliminate a suspected Impostor.",
      "The eliminated player's role is revealed.",
      "The game continues until the Crewmates or Impostors meet their winning conditions.",
    ],
    rules: [
      "Roles must remain secret until revealed by the Game Master.",
      "Participants must not disclose their assigned roles unless the rules permit it.",
      "No real hacking, access to private files or interference with college networks is permitted.",
      "Sabotage must remain within the game environment.",
      "Emergency meetings and voting are controlled by the Game Master.",
      "Crewmates win by completing the required tasks or eliminating all Impostors; Impostors win by meeting the specified sabotage or survival condition.",
    ],
    confirmation:
      "Thank you for registering for AMONG US — CYBERSTRIKE EDITION. Your details will be reviewed by the organising committee. Participation is confirmed after registration and payment verification. Venue: Lab 2.",
    isSolo: true,
    teamSize: 1,
  },
  {
    id: "signal-sprint",
    number: "05",
    title: "SIGNAL SPRINT",
    tagline: "Decode the clues. Trust your instincts. Hit the buzzer.",
    feeDesc: "₹25 per participant = ₹100 per 4-person team",
    baseFeeNum: 100,
    feeMode: "flat",
    teamFormat: "Exactly 4 participants per team",
    venue: "6A Lab",
    day: "Day 1",
    capacity: "12–15 teams; may exceed depending on participation",
    intro:
      "A three-level technology quiz tournament testing knowledge, recognition and quick thinking.",
    eventFlow: [
      "Round 1 — SIGNAL BREAK: Teams compete in a technology quiz using survey-board questions. Each team answers six questions; scores are calculated using the predefined answer board. The top six teams qualify.",
      "Round 2 — ON SIGHT: One representative from each qualified team competes. Participants identify images displayed on the projector. Answers are recorded and checked against the answer key. The top three players qualify for the final.",
      "Round 3 — LOCK IN: The three finalists compete in a whistle/buzzer round. The first eligible participant to signal gets the chance to answer within the specified time. The highest-scoring team is declared the winner.",
    ],
    rules: [
      "The host's instructions and time limits must be followed.",
      "No phones, external help or unauthorised resources are permitted.",
      "Only answers submitted through the prescribed method are accepted.",
      "Judges verify answers using a fixed answer key.",
      "Tie-break questions are used where necessary.",
      "The speed-round referee's decision on who signalled first is final.",
    ],
    confirmation:
      "Thank you for registering for SIGNAL SPRINT. Your details will be reviewed by the organizing committee. Participation is confirmed after registration and payment verification. Venue: 6A Lab.",
    isSolo: false,
    teamSize: 4,
  },
  {
    id: "canva-override",
    number: "06",
    title: "CANVA — CREATIVE OVERRIDE",
    tagline: "Think with AI. Design with Canva. Create on the clock.",
    feeDesc: "₹50 per participant",
    baseFeeNum: 50,
    feeMode: "per_person",
    teamFormat: "Individual participation",
    venue: "6A Lab",
    day: "Day 1",
    capacity: "20–30 participants",
    intro:
      "A timed AI-assisted design competition where participants create a poster and a short promotional video using Canva.",
    eventFlow: [
      "Participants register individually and receive the first theme.",
      "Round 1 — AI Poster: Create an event poster using AI for ideas, text or visual concepts and Canva for the final design.",
      "Submit the poster before the deadline.",
      "Round 2 — AI Video: Receive a new theme and create a short promotional video.",
      "Submit the final video within the allotted time.",
      "Judges evaluate both submissions and announce the winner.",
    ],
    rules: [
      "Canva must be used for the final poster and video.",
      "Only the AI tools approved by the organisers may be used.",
      "All work must be completed within the allotted time.",
      "No outside assistance or pre-made submissions are permitted.",
      "Judging considers prompt quality, creativity, visual quality, theme relevance and overall impact.",
      "The highest combined score wins.",
    ],
    confirmation:
      "Thank you for registering for CANVA — CREATIVE OVERRIDE. Your details will be reviewed by the organizing committee. Participation is confirmed after registration and payment verification. Venue: 6A Lab.",
    isSolo: true,
    teamSize: 1,
  },
];

export const TECHNICAL_EVENTS_BY_ID: Record<string, TechnicalEventSpec> =
  Object.fromEntries(TECHNICAL_EVENTS.map((ev) => [ev.id, ev]));
