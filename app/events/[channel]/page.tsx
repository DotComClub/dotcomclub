import Link from "next/link";
import "../../cyberstrike-26/cyberstrike.css";
import "../esports/esports.css";
import "../events.css";

type EventDetails = {
  name: string;
  description: string;
  meta: string[];
  rules: string[];
};

const channels: Record<
  string,
  { label: string; title: string; intro: string; events: EventDetails[] }
> = {
  technical: {
    label: "Channel 02",
    title: "Technical",
    intro:
      "Six contests of code, prompts, puzzles and quick thinking. Approved tools only, no outside help.",
    events: [
      {
        name: "Cyber Hunt",
        description:
          "A digital treasure hunt. Solve cyber puzzles to unlock each password-protected file.",
        meta: ["Up to 20 participants"],
        rules: [
          "Every team starts with the same locked file",
          "Each solved puzzle gives the next password; no skipping or borrowing passwords",
          "Limited hints available at a predefined penalty",
          "Report technical issues to the event coordinator",
          "First correct final answer, after verification, wins",
        ],
      },
      {
        name: "AI Prompt Wars",
        description:
          "Build sharp prompts, improve AI output and catch errors and hallucinations.",
        meta: ["2 members", "10 teams"],
        rules: [
          "Organiser-approved AI tools only",
          "Save and submit your prompts when asked",
          "No pre-prepared outputs or outside help",
          "Same tasks and time limits for every team",
          "Judged on prompt quality, accuracy, relevance, creativity and error detection",
        ],
      },
      {
        name: "Algorithm Auction",
        description:
          "Bid virtual CyberCoins for the right to solve programming challenges.",
        meta: ["2 members", "10 teams"],
        rules: [
          "Every team starts with equal CyberCoins",
          "The highest valid bid solves the challenge; accepted bids cannot be withdrawn",
          "Submit within the time limit; no sharing solutions",
          "Rewards, penalties and scoring announced beforehand",
          "Highest final score wins",
        ],
      },
      {
        name: "Among Us: Cyberstrike Edition",
        description:
          "Real-life social deduction. Crewmates finish tech tasks while Impostors sabotage.",
        meta: ["Up to 12 players", "2 Impostors"],
        rules: [
          "The Game Master assigns secret roles; keep yours secret",
          "Crewmates complete tasks at designated stations",
          "Meetings and voting follow the Game Master",
          "No real hacking, private file access or network interference",
          "The Game Master settles disputes",
        ],
      },
      {
        name: "Signal Sprint",
        description:
          "A three-level tech quiz that tests knowledge, observation and quick thinking.",
        meta: ["4 members", "12 teams"],
        rules: [
          "Round 1: six survey-board questions per team; top six advance",
          "Round 2: one player per team names projected images",
          "Round 3: whistle or buzzer speed round",
          "No phones or outside help",
          "The referee's decision is final",
        ],
      },
      {
        name: "Canva: Creative Override",
        description:
          "A timed, AI-assisted design contest: a poster, then a promotional video.",
        meta: ["Solo", "20 participants"],
        rules: [
          "Round 1: AI-assisted poster on an assigned theme",
          "Round 2: short promotional video on a new theme",
          "Canva and approved AI tools only",
          "Original work, submitted before each deadline",
          "Highest combined score across both rounds wins",
        ],
      },
    ],
  },
  cultural: {
    label: "Channel 03",
    title: "Cultural",
    intro:
      "Eight stages for players, detectives, debaters and performers. Keep it respectful and college-appropriate.",
    events: [
      {
        name: "Blackout Empire",
        description:
          "Tech-themed Monopoly. Buy big tech companies and survive the blackout.",
        meta: ["Board game", "Timer-ended"],
        rules: ["Everyone starts with equal Bits", "Own full colour groups to double rent and build servers", "Follow Packet Sniffer and Signal Ping cards", "Out of Bits means bankrupt", "No cheating or hiding cards"],
      },
      {
        name: "The Masked Truth",
        description:
          "A game of secrets and trust. Find the Traitors hiding among the Faithful.",
        meta: ["Social deduction", "Secret roles"],
        rules: ["Secret roles: Faithful or Traitor", "Everyone votes; the most-voted player is eliminated", "Traitors eliminate one player in Night Round", "Eliminated players cannot give hints", "The Host's decision is final"],
      },
      {
        name: "Red Handed",
        description:
          "Detectives examine evidence and question suspects. Murder or suicide, and if murder, who did it?",
        meta: ["4 members"],
        rules: ["Investigate the scene using the case file", "Question suspects only in the designated round", "Do not tamper with evidence", "Submit conclusions within the allotted time", "Judged on reasoning and accuracy"],
      },
      {
        name: "Beat Drop",
        description:
          "A dance competition judged on skill, creativity and stage presence.",
        meta: ["Solo or team", "4-5 players"],
        rules: ["Register under one category only", "Bring college-appropriate music", "Follow the announced time limit", "Judges select advancing acts", "Judged on overall performance"],
      },
      {
        name: "The Static Carnival",
        description:
          "An escape-room run through sequential Acts. Miss a clue and the final door stays shut.",
        meta: ["4 members"],
        rules: ["Timer starts in Act 1", "Deposit phones and smart devices", "Report 15 minutes early", "Do not tamper with props", "Report claustrophobia or photosensitivity beforehand"],
      },
      {
        name: "Roll the Chaos",
        description:
          "Capture the best CYBERSTRIKE moments in a creative short reel.",
        meta: ["Solo or 2-4", "30-90 seconds"],
        rules: ["Reels must feature CYBERSTRIKE", "Keep content original and appropriate", "Do not disturb ongoing games", "Submit before the deadline", "Judged on creativity and editing"],
      },
      {
        name: "La Couture Nights",
        description:
          "A themed fashion show: outfits and ramp performances on the organisers' theme.",
        meta: ["6-8 members"],
        rules: ["Follow the announced theme", "Arrange your own outfits", "Keep performances college-appropriate", "Report before your slot", "Winner and runner-up are selected"],
      },
      {
        name: "Debate: Dead Air",
        description:
          "The Hijacked Frequency. A hijacker cuts in mid-argument and you have 30 seconds to respond.",
        meta: ["2 members", "16 slots"],
        rules: ["Round 1 topic released 24 hours ahead", "Cue-card restrictions apply", "Hijacks are mandatory", "No personal attacks or slurs", "Report 30 minutes before your slot"],
      },
    ],
  },
};

export default async function ChannelPage({
  params,
}: {
  params: Promise<{ channel: string }>;
}) {
  const { channel } = await params;
  const feed = channels[channel];

  if (!feed) {
    return (
      <div className="cs26-root esports-reference">
        <main className="pg">
          <div className="wrap">
            <h1 className="ph" data-events-sl>Channel not found</h1>
            <Link href="/events">Back to events</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="cs26-root esports-reference event-channel-page">
      <main id="main" tabIndex={-1}>
        <section className="pg">
          <div className="wrap">
            <header>
              <div className="eh-top mono">
                <span>{feed.label}</span>
                <span>{feed.events.length} feeds</span>
                <Link href="/events" className="navback">
                  <span aria-hidden="true">←</span>Events
                </Link>
              </div>
              <h1 className="ph" data-t={feed.title.toUpperCase()} data-events-sl>
                {feed.title.toUpperCase()}
              </h1>
              <p className="pin">{feed.intro}</p>
            </header>

            <ol className="fds">
              {feed.events.map((event, index) => (
                <li
                  className="fd channel-event"
                  key={event.name}
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <span className="fdi mono-n">
                    <small className="mono">Feed</small>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="fdm">
                    <h2 className="fdn" data-glitch>
                      <span data-sl>{event.name}</span>
                    </h2>
                    <p className="channel-description">{event.description}</p>
                  </div>
                  <div className="fdr">
                    <dl className="rd">
                      {event.meta.map((meta) => (
                        <div key={meta}><dt>Details</dt><dd>{meta}</dd></div>
                      ))}
                    </dl>
                    <details className="channel-rules">
                      <summary className="rb mono">Rules<i aria-hidden="true" /></summary>
                      <ol className="rls">
                        {event.rules.map((rule) => <li key={rule}>{rule}</li>)}
                      </ol>
                    </details>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
}
