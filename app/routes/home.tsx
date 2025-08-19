// app/routes/_index.tsx (or the file that matches your ./+types/home)
import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import { json } from "@remix-run/node";

export function meta({}: Route.MetaArgs) {
  const title = "Learn Word Games | Guides, Tips, Puzzles, and Daily Practice";
  const description =
    "Learn Word Games is your home for word game guides, strategies, rules, and daily practice puzzles. Master Wordle, crosswords, anagrams, cryptograms, and more.";
  const url = "https://learnwordgames.com/";
  return [
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      content:
        "word games, wordle, anagrams, crosswords, cryptograms, spelling bee, vocabulary, puzzles, word lists",
    },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: `${url}og-image.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "theme-color", content: "#ffffff" },
    { rel: "canonical", href: url },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  // Keep your existing context example to avoid breaking anything
  return json({
    message: context.VALUE_FROM_EXPRESS,
    nowISO: new Date().toISOString(),
  });
}

export default function Home({}: Route.ComponentProps) {
  const { message, nowISO } = useLoaderData<typeof loader>();

  const faqs = [
    {
      q: "What is Learn Word Games?",
      a: "A friendly place to learn rules, strategies, and vocabulary for popular word games with short, practical lessons.",
    },
    {
      q: "Which games will be covered?",
      a: "Wordle and variants, anagrams, crosswords, cryptograms, pangrams, spelling games, and themed vocabulary challenges.",
    },
    {
      q: "Are there daily practice puzzles?",
      a: "Yes. We plan to publish warmups and mini challenges you can finish in a few minutes.",
    },
    {
      q: "Is it free?",
      a: "Yes. The goal is helpful content that you can read and use right away.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Learn Word Games",
        url: "https://learnwordgames.com/",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://learnwordgames.com/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "Learn Word Games",
        url: "https://learnwordgames.com/",
        logo: "https://learnwordgames.com/logo.png",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="bg-white text-neutral-900">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top notice, optional */}
      <div className="w-full border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-2 text-sm text-neutral-600">
          Building now. Content is arriving soon. Last updated{" "}
          {new Date(nowISO).toLocaleDateString()}.
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight">
              Learn Word Games
            </h1>
            <p className="mt-4 text-lg text-neutral-700">
              Clear guides, bite-size lessons, and daily practice to level up
              your vocabulary and puzzle skills. Learn rules, build strategy,
              and have fun.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#learn"
                className="inline-flex items-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-50"
              >
                Explore what you will learn
              </a>
              <a
                href="#faq"
                className="inline-flex items-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-50"
              >
                Read common questions
              </a>
            </div>
          </div>
          <div className="w-full max-w-md">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold">Daily Brain Warmup</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Short practice prompts that keep your mind sharp. New sets will
                appear here.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-800">
                <li>
                  • Find a 7-letter anagram from:{" "}
                  <span className="font-mono">T, E, A, R, S, L, I</span>
                </li>
                <li>• Define “canny” in one sentence</li>
                <li>• Make 4 two-syllable rhymes for “cable”</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What you will learn */}
      <section id="learn" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold">What you will learn</h2>
        <p className="mt-2 text-neutral-700">
          Start with the basics, then move into strategy and speed. Lessons are
          concise and practical.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Rules and formats",
              desc: "Understand scoring, win conditions, time limits, and common variants across Wordle, crosswords, and more.",
            },
            {
              title: "Pattern spotting",
              desc: "Work with letter frequencies, vowel placement, common digraphs, and affixes for faster solves.",
            },
            {
              title: "Vocabulary growth",
              desc: "Learn themed word lists, root families, and clue patterns that appear again and again.",
            },
            {
              title: "Anagram mastery",
              desc: "Train your brain to reorder letters quickly using anchors and consonant clusters.",
            },
            {
              title: "Clue decoding",
              desc: "Break down cryptic hints, abbreviations, and wordplay that show up in crosswords and cryptograms.",
            },
            {
              title: "Daily practice",
              desc: "Short drills that fit into a morning routine and build steady progress.",
            },
          ].map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-neutral-700">{c.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Placeholder content buckets with SEO-rich copy */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Wordle and daily guess games</h2>
            <p className="mt-2 text-neutral-700">
              Starter words, elimination strategy, and letter frequency charts
              that reduce guess count and improve your average.
            </p>
            <ul className="mt-3 list-inside list-disc text-sm text-neutral-800">
              <li>Optimal openers and coverage</li>
              <li>Hard mode discipline</li>
              <li>Color feedback planning</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Crosswords and cryptics</h2>
            <p className="mt-2 text-neutral-700">
              Grid navigation, clue types, and solving tactics for themed and
              themeless puzzles with clean fill.
            </p>
            <ul className="mt-3 list-inside list-disc text-sm text-neutral-800">
              <li>Common indicator words</li>
              <li>Charades, containers, reversals</li>
              <li>Handling obscure entries</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">
              Anagrams, pangrams, and spelling games
            </h2>
            <p className="mt-2 text-neutral-700">
              Time your search, spot anchors, and build longer words from short
              stems with repeatable methods.
            </p>
            <ul className="mt-3 list-inside list-disc text-sm text-neutral-800">
              <li>Stem expansion playbook</li>
              <li>Prefix and suffix chains</li>
              <li>Letter bucket drills</li>
            </ul>
          </article>
        </div>
      </section>

      {/* Social proof, simple and neutral */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 text-center sm:grid-cols-3">
            <div>
              <div className="text-3xl font-bold">Fast reads</div>
              <div className="mt-1 text-sm text-neutral-600">
                Lessons that fit a short break
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">Practical tips</div>
              <div className="mt-1 text-sm text-neutral-600">
                Strategies you can apply today
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">Daily practice</div>
              <div className="mt-1 text-sm text-neutral-600">
                Keep your streak and build skill
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1) Beginner’s Guide */}
      <section id="beginners-guide" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Beginner’s Guide to Word Games</h2>
        <p className="mt-3 text-neutral-700">
          New to word games? Start here. Learn the core rules, common formats,
          and simple tactics that improve accuracy and speed. This guide covers
          daily guess games like Wordle, classic crosswords, anagrams, pangrams,
          spelling challenges, cryptograms, and grid puzzles. You will learn how
          letter frequency works, why vowels anchor tricky fills, and how to
          avoid common mistakes that waste guesses.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Rules and scoring explained with clear examples</li>
          <li>Time management for timed modes</li>
          <li>Warmup drills that build consistency</li>
        </ul>
      </section>

      {/* 2) Strategy Library */}
      <section id="strategy-library" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Word Game Strategy Library</h2>
        <p className="mt-3 text-neutral-700">
          Practical strategies for popular titles. Use elimination planning in
          Wordle, clue families in crosswords, stem expansion in anagrams,
          frequency maps in Spelling Bee, and pattern locks in cryptograms. Each
          strategy is designed to reduce guess count, improve solve rate, and
          raise your average score without memorizing endless lists.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          <li className="list-inside list-disc text-neutral-800">
            Letter coverage and optimal openers
          </li>
          <li className="list-inside list-disc text-neutral-800">
            Hard mode discipline and constraint play
          </li>
          <li className="list-inside list-disc text-neutral-800">
            Affixes, digraphs, and word families
          </li>
          <li className="list-inside list-disc text-neutral-800">
            Clue indicators for cryptic crosswords
          </li>
        </ul>
      </section>

      {/* 3) Daily Practice Hub */}
      <section id="daily-practice" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Daily Practice Hub</h2>
        <p className="mt-3 text-neutral-700">
          Short, repeatable drills that fit a morning routine. Rotate through
          anagram sprints, pangram hunts, mini crosswords, synonym ladders, and
          letter bucket challenges. Daily practice improves recall, pattern
          spotting, and endgame discipline across all word puzzle formats.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>5-minute warmups for consistency</li>
          <li>Targeted speed rounds for accuracy</li>
          <li>Weekly skill checks and progress notes</li>
        </ul>
      </section>

      {/* 4) Rules and Scoring */}
      <section id="rules-scoring" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Rules, Formats, and Scoring</h2>
        <p className="mt-3 text-neutral-700">
          Understand how different word games score points and define win
          conditions. Learn standard grids, clue types, guess limits, streak
          tracking, and tie breakers. Knowing the format helps you pick the
          right tactic at the right time.
        </p>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 p-4">
            <dt className="font-semibold">Daily Guess Games</dt>
            <dd className="mt-1 text-neutral-700">
              Color feedback planning, letter coverage, and duplicate handling.
            </dd>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <dt className="font-semibold">Crosswords</dt>
            <dd className="mt-1 text-neutral-700">
              Theme entries, fill quality, abbreviations, and cryptic
              indicators.
            </dd>
          </div>
        </dl>
      </section>

      {/* 5) Vocabulary Builder */}
      <section id="vocabulary-builder" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">
          Vocabulary Builder for Word Games
        </h2>
        <p className="mt-3 text-neutral-700">
          Grow a competitive vocabulary with curated lists that actually appear
          in puzzles. Study high-value stems, common roots and affixes, short
          power words, and tricky letter pairs. Build recall with themed sets
          that target common clue patterns.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Two- and three-letter power lists</li>
          <li>Root families with examples</li>
          <li>Vowel-heavy and consonant-cluster sets</li>
        </ul>
      </section>

      {/* 6) Anagram and Pangram Lab */}
      <section id="anagram-pangram" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Anagram and Pangram Lab</h2>
        <p className="mt-3 text-neutral-700">
          Train your eye to spot anchors, shuffle consonant clusters, and extend
          stems into longer words. Learn pangram tactics that cover the full
          alphabet set without stalling mid-solve.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold">Anchor Letters</h3>
            <p className="mt-1 text-neutral-700">
              Use fixed vowels or rare consonants to stabilize searches.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold">Cluster Play</h3>
            <p className="mt-1 text-neutral-700">
              Work with common pairs like TH, ST, PR, and CH.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold">Stem Expansion</h3>
            <p className="mt-1 text-neutral-700">
              Add prefixes and suffixes to scale short seeds.
            </p>
          </div>
        </div>
      </section>

      {/* 7) Crossword Skills */}
      <section id="crossword-skills" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Crossword and Cryptic Skills</h2>
        <p className="mt-3 text-neutral-700">
          Decode clue structures, track indicator words, and manage grid flow.
          Learn charades, containers, reversals, anagrams, and double
          definitions. Use cross letters to verify entries and keep fill clean.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Abbreviations that appear often</li>
          <li>Theme spotting and long entry planning</li>
          <li>Proofing and error control</li>
        </ul>
      </section>

      {/* 8) Spelling and Letter Frequency */}
      <section id="spelling-frequency" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">
          Spelling Games and Letter Frequency
        </h2>
        <p className="mt-3 text-neutral-700">
          Use frequency maps and vowel placement to prioritize guesses. Master
          common suffixes and endings that close solves quickly. Improve
          accuracy by tracking tricky patterns and regional variants when rules
          allow them.
        </p>
        <div className="mt-4 rounded-xl border border-neutral-200 p-4 text-sm text-neutral-700">
          Quick tip: start with broad coverage, confirm vowels, then lock
          high-value consonants based on pattern fit.
        </div>
      </section>

      {/* 9) Timed Mode Playbook */}
      <section id="timed-playbook" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Timed Mode Playbook</h2>
        <p className="mt-3 text-neutral-700">
          Build speed without losing accuracy. Use checkpoint pacing, partial
          fills, letter bank triage, and safe sacrifices when the clock is
          tight. Warmups prepare your eyes and reduce decision fatigue.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Pacing and micro-timers</li>
          <li>Error recovery and endgame checks</li>
          <li>Focus cues that cut hesitation</li>
        </ul>
      </section>

      {/* 10) Game Reviews and Comparisons */}
      <section
        id="reviews-comparisons"
        className="mx-auto max-w-6xl px-4 py-12"
      >
        <h2 className="text-2xl font-bold">
          Word Game Reviews and Comparisons
        </h2>
        <p className="mt-3 text-neutral-700">
          See how popular games differ in rules, difficulty, and learning curve.
          Comparisons help you choose the right practice tool for your goals,
          from beginner friendly warmups to expert level challenges.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Daily guess games vs. grid-based puzzles</li>
          <li>Solo practice vs. competitive scoring</li>
          <li>Mobile friendly modes and accessibility</li>
        </ul>
      </section>

      {/* 11) Parents and Teachers */}
      <section id="parents-teachers" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">
          Resources for Parents and Teachers
        </h2>
        <p className="mt-3 text-neutral-700">
          Use short, structured activities to boost literacy, spelling, and
          reasoning skills. Printables and classroom friendly drills support
          steady progress without screen fatigue.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Beginner word lists and phonics sets</li>
          <li>Crossword clue starters and templates</li>
          <li>Five-minute warmups for groups</li>
        </ul>
      </section>

      {/* 12) Accessibility and Mobile Play */}
      <section
        id="accessibility-mobile"
        className="mx-auto max-w-6xl px-4 py-12"
      >
        <h2 className="text-2xl font-bold">Accessibility and Mobile Play</h2>
        <p className="mt-3 text-neutral-700">
          Helpful settings for comfortable play: font sizing, high contrast
          options, reduced motion, and keyboard shortcuts. Mobile tips cover
          small screen grid navigation and mistake prevention during fast input.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Readable fonts and clear color feedback</li>
          <li>Keyboard and touch entry tips</li>
          <li>Error controls and undo safety</li>
        </ul>
      </section>

      {/* 13) Glossary */}
      <section id="glossary" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Word Game Glossary</h2>
        <p className="mt-3 text-neutral-700">
          A quick reference for common terms. Learn what digraphs, pangrams,
          anagram indicators, containers, and cross letters mean. Clear
          definitions make strategy articles easier to follow.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold">Digraph</h3>
            <p className="mt-1 text-neutral-700">
              Two letters that represent one sound or common pair, like TH or
              CH.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold">Pangram</h3>
            <p className="mt-1 text-neutral-700">
              A set that includes every required letter at least once.
            </p>
          </div>
        </div>
      </section>

      {/* 14) Progress Tracking */}
      <section id="progress-tracking" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Track Progress and Improve</h2>
        <p className="mt-3 text-neutral-700">
          Learn simple ways to measure improvement: average guesses, solve time,
          streak length, and accuracy. Set weekly goals, review errors, and
          adjust strategy with small data driven tweaks.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Goal setting templates</li>
          <li>Accuracy and streak logs</li>
          <li>Weekly review checklist</li>
        </ul>
      </section>

      {/* 15) Coming Soon */}
      <section id="coming-soon" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Coming Soon on Learn Word Games</h2>
        <p className="mt-3 text-neutral-700">
          In-depth guides, printable drills, daily warmups, and strategy videos.
          The goal is simple, practical learning that improves your results
          across every word puzzle you play.
        </p>
        <div className="mt-4 rounded-xl border border-neutral-200 p-4 text-sm text-neutral-700">
          Want updates? Add the site to your home screen and check the Daily
          Practice Hub.
        </div>
      </section>

      {/* 16) Learning Paths */}
      <section id="learning-paths" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Learning Paths for Every Player</h2>
        <p className="mt-3 text-neutral-700">
          Choose a focused path and progress step by step. Options include
          Beginner Fundamentals, Crossword Starter, Anagram Sprint, Daily Guess
          Mastery, and Speed Solver. Each path mixes rules, tactics, drills, and
          review checklists to build reliable word game skills.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          <li className="list-inside list-disc text-neutral-800">
            Beginner Fundamentals: rules and accuracy
          </li>
          <li className="list-inside list-disc text-neutral-800">
            Crossword Starter: clue types and grid flow
          </li>
          <li className="list-inside list-disc text-neutral-800">
            Anagram Sprint: stems and anchors
          </li>
          <li className="list-inside list-disc text-neutral-800">
            Daily Guess Mastery: coverage and feedback
          </li>
        </ul>
      </section>

      {/* 17) Word Lists Hub */}
      <section id="word-lists" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Curated Word Lists for Puzzles</h2>
        <p className="mt-3 text-neutral-700">
          High value lists that appear in real puzzles: two letter helpers,
          common three letter entries, vowel heavy sets, consonant clusters,
          rare letter anchors, and themed vocabulary packs. Use lists for
          warmups or targeted practice.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold">Two and Three Letter</h3>
            <p className="mt-1 text-neutral-700">
              Essential short words for speed and fill control.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold">Affixes and Roots</h3>
            <p className="mt-1 text-neutral-700">
              Prefixes, suffixes, and root families that scale entries.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold">Rare Anchors</h3>
            <p className="mt-1 text-neutral-700">
              Words with J, Q, X, Z for tricky boards.
            </p>
          </div>
        </div>
      </section>

      {/* 18) Tools and Generators */}
      <section id="tools-generators" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Word Game Tools and Generators</h2>
        <p className="mt-3 text-neutral-700">
          Planned utilities that support learning and fair play: letter
          frequency charts, anagram trainer, pattern finder, syllable counter,
          rhyme explorer, and printable drill maker. Tools are designed for
          practice and education.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Letter frequency and position heatmaps</li>
          <li>Pattern finder with wildcard slots</li>
          <li>Printable drill maker for offline study</li>
        </ul>
      </section>

      {/* 19) Letter Frequency Guide */}
      <section id="letter-frequency" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">
          Letter Frequency and Position Tactics
        </h2>
        <p className="mt-3 text-neutral-700">
          Learn how often letters appear and where they usually land. Use common
          openings, endings, and digraphs to test hypotheses quickly. Position
          tactics cut guess count and raise solve rates in daily guess games and
          spelling puzzles.
        </p>
        <div className="mt-4 rounded-xl border border-neutral-200 p-4 text-sm text-neutral-700">
          Tip: confirm a vowel early, then probe high value consonants that
          match pattern fit.
        </div>
      </section>

      {/* 20) Affixes Playbook */}
      <section id="affixes-playbook" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">
          Affixes Playbook for Faster Solves
        </h2>
        <p className="mt-3 text-neutral-700">
          Build longer words by chaining prefixes and suffixes. Recognize common
          endings, plural rules, and tense shifts. Affix awareness accelerates
          anagram expansion and crossword fill.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Common prefixes that unlock stems</li>
          <li>Suffix ladders for tense and noun forms</li>
          <li>Derivational patterns for quick extensions</li>
        </ul>
      </section>

      {/* 21) ESL and Phonics Corner */}
      <section id="esl-phonics" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">ESL and Phonics Corner</h2>
        <p className="mt-3 text-neutral-700">
          Friendly support for learners of English. Practice vowel teams,
          consonant blends, and common irregular forms. Games reinforce
          pronunciation, spelling, and vocabulary through short activities.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Phonics packs with minimal pairs</li>
          <li>High frequency word sets</li>
          <li>Picture clues for beginners</li>
        </ul>
      </section>

      {/* 22) Family and Classroom Play */}
      <section id="family-classroom" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Family and Classroom Word Games</h2>
        <p className="mt-3 text-neutral-700">
          Group friendly variations that promote turn taking, cooperation, and
          skill building. Use printable sheets, timer rules, and easy scoring to
          run quick sessions at home or in class.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Five minute warmups for groups</li>
          <li>Team relay anagrams</li>
          <li>Vocabulary bingo with themed sets</li>
        </ul>
      </section>

      {/* 23) Competitive Play and Metrics */}
      <section id="competitive-play" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">
          Competitive Play and Performance Metrics
        </h2>
        <p className="mt-3 text-neutral-700">
          Track solve time, average guesses, accuracy, streak length, and
          difficulty tiers. Use benchmarks to choose the right practice plan and
          measure weekly improvement with clear, simple charts.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Baseline setup and weekly goals</li>
          <li>Error taxonomy for review</li>
          <li>Endgame checks that prevent misses</li>
        </ul>
      </section>

      {/* 24) Common Errors and Fixes */}
      <section id="common-errors" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">
          Common Word Game Errors and How to Fix Them
        </h2>
        <p className="mt-3 text-neutral-700">
          Reduce avoidable mistakes with simple habits. Avoid tunnel vision,
          manage duplicates, and confirm cross letters before committing. Short
          checklists prevent lost points and broken streaks.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold">Pattern Lock</h3>
            <p className="mt-1 text-neutral-700">
              Keep at least two live branches until letters confirm.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold">Duplicate Control</h3>
            <p className="mt-1 text-neutral-700">
              Track repeated letters with a simple tally.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="font-semibold">Cross Checks</h3>
            <p className="mt-1 text-neutral-700">
              Verify crossings before locking long entries.
            </p>
          </div>
        </div>
      </section>

      {/* 25) Accessibility Checklist */}
      <section
        id="accessibility-checklist"
        className="mx-auto max-w-6xl px-4 py-12"
      >
        <h2 className="text-2xl font-bold">
          Accessibility Checklist for Comfortable Play
        </h2>
        <p className="mt-3 text-neutral-700">
          Make puzzles easier to read and operate. Adjust font size, contrast,
          motion, and keyboard controls. Mobile tips prevent taps from causing
          errors during fast input.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Readable fonts and clear feedback colors</li>
          <li>Reduced motion and focus outlines</li>
          <li>Keyboard and touch friendly controls</li>
        </ul>
      </section>

      {/* 26) Mobile Typing Tips */}
      <section id="mobile-typing" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">
          Mobile Typing Tips for Word Games
        </h2>
        <p className="mt-3 text-neutral-700">
          Improve speed and accuracy on phones and tablets. Use autocorrect
          controls, long press characters, and split keyboards where available.
          Keep fingers relaxed and use short bursts with quick review.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Short input bursts with pause checks</li>
          <li>Smart cursor moves for quick edits</li>
          <li>Sound and haptics for feedback</li>
        </ul>
      </section>

      {/* 27) Printables and Offline Study */}
      <section id="printables-offline" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Printables and Offline Study</h2>
        <p className="mt-3 text-neutral-700">
          Practice without screens. Use printable mini crosswords, anagram
          sheets, syllable drills, and vocabulary ladders. Offline study builds
          recall and pattern recognition with fewer distractions.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Daily five minute worksheets</li>
          <li>Themed vocabulary ladders</li>
          <li>Answer keys for self review</li>
        </ul>
      </section>

      {/* 28) Editorial Roadmap */}
      <section id="editorial-roadmap" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">
          Editorial Roadmap for Learn Word Games
        </h2>
        <p className="mt-3 text-neutral-700">
          Upcoming guides and lessons include beginner rules, strategy deep
          dives, letter frequency research, anagram labs, crossword clue
          workshops, and printable packs. The goal is practical content that
          improves results across every puzzle type.
        </p>
        <div className="mt-4 rounded-xl border border-neutral-200 p-4 text-sm text-neutral-700">
          Check back weekly for new lessons in the Strategy Library and Daily
          Practice Hub.
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white shadow-sm">
          {faqs.map((f) => (
            <details key={f.q} className="group open:bg-neutral-50">
              <summary className="cursor-pointer list-none px-5 py-4 font-medium">
                {f.q}
              </summary>
              <div className="px-5 pb-5 text-neutral-700">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-600">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>© {new Date().getFullYear()} Learn Word Games</div>
            <div className="text-neutral-500">
              {message ? (
                <span aria-live="polite">{message}</span>
              ) : (
                <span>Made with clarity and simplicity</span>
              )}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
