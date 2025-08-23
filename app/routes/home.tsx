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
    // Removed "keywords" (ignored by Google and can look spammy)
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
      a: "Yes. We publish warmups and mini challenges you can finish in a few minutes.",
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
        description:
          "Learn Word Games is your home for word game guides, strategies, rules, and daily practice puzzles. Master Wordle, crosswords, anagrams, cryptograms, spelling bee, and more.",
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
                Short practice prompts that keep your mind sharp.
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

      {/* Content buckets */}
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

      {/* Social proof */}
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
          spelling challenges, cryptograms, and grid puzzles.
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
          frequency maps in Spelling Bee, and pattern locks in cryptograms.
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
          letter bucket challenges.
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
          tracking, and tie breakers.
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
          Curated lists that actually appear in puzzles: high-value stems,
          roots/affixes, short power words, and tricky letter pairs.
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
          Spot anchors, shuffle consonant clusters, and extend stems into longer
          words. Tactics that cover the full alphabet set without stalling.
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
          Use cross letters to verify entries and keep fill clean.
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
          common suffixes and endings that close solves quickly.
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
          tight.
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
          Choose the right practice tool for your goals.
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
          Short, structured activities to boost literacy, spelling, and
          reasoning skills. Printables and classroom-friendly drills support
          steady progress.
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
          small-screen grid navigation and mistake prevention during fast input.
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
          A quick reference for common terms: digraphs, pangrams, anagram
          indicators, containers, and cross letters.
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
          Measure improvement with average guesses, solve time, streak length,
          and accuracy. Set weekly goals, review errors, and adjust strategy
          with small data-driven tweaks.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Goal setting templates</li>
          <li>Accuracy and streak logs</li>
          <li>Weekly review checklist</li>
        </ul>
      </section>

      {/* 15) Word Lists Hub */}
      <section id="word-lists" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Curated Word Lists for Puzzles</h2>
        <p className="mt-3 text-neutral-700">
          Two-letter helpers, common three-letter entries, vowel-heavy sets,
          consonant clusters, rare letter anchors, and themed vocabulary packs.
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

      {/* 16) Tools and Generators */}
      <section id="tools-generators" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Word Game Tools and Generators</h2>
        <p className="mt-3 text-neutral-700">
          Letter frequency charts, anagram trainer, pattern finder, syllable
          counter, rhyme explorer, and printable drill maker — utilities that
          support practice and education.
        </p>
        <ul className="mt-4 list-inside list-disc text-neutral-800">
          <li>Letter frequency and position heatmaps</li>
          <li>Pattern finder with wildcard slots</li>
          <li>Printable drill maker for offline study</li>
        </ul>
      </section>
      {/* SEO-rich internal navigation & trust blocks */}
      <section className="mx-auto max-w-6xl px-4 pb-6">
        {/* Popular Guides */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Popular Guides & Quick Starts</h2>
          <p className="mt-2 text-neutral-700">
            Jump into the most useful, short reads for faster improvement.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "#beginners-guide",
                label: "Beginner’s Guide to Word Games",
              },
              {
                href: "#strategy-library",
                label: "Word Game Strategy Library",
              },
              { href: "#daily-practice", label: "Daily Practice Hub" },
              { href: "#rules-scoring", label: "Rules, Formats, and Scoring" },
              { href: "#vocabulary-builder", label: "Vocabulary Builder" },
              { href: "#anagram-pangram", label: "Anagram & Pangram Lab" },
              {
                href: "#crossword-skills",
                label: "Crossword & Cryptic Skills",
              },
              {
                href: "#spelling-frequency",
                label: "Spelling & Letter Frequency",
              },
              { href: "#timed-playbook", label: "Timed Mode Playbook" },
              { href: "#word-lists", label: "Curated Word Lists" },
              {
                href: "#tools-generators",
                label: "Word Game Tools & Generators",
              },
              { href: "#progress-tracking", label: "Track Progress & Improve" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Browse by Topic */}
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Browse by Topic</h2>
          <p className="mt-2 text-neutral-700">
            Find focused tips for the games you play most.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: "Wordle & daily guess", href: "#beginners-guide" },
              { label: "Crosswords", href: "#crossword-skills" },
              { label: "Cryptics", href: "#crossword-skills" },
              { label: "Anagrams", href: "#anagram-pangram" },
              { label: "Pangrams", href: "#anagram-pangram" },
              { label: "Spelling games", href: "#spelling-frequency" },
              { label: "Letter frequency", href: "#spelling-frequency" },
              { label: "Affixes & roots", href: "#vocabulary-builder" },
              { label: "Timed modes", href: "#timed-playbook" },
              { label: "Word lists", href: "#word-lists" },
              { label: "Tools", href: "#tools-generators" },
              { label: "ESL & phonics", href: "#esl-phonics" },
            ].map((t) => (
              <a
                key={t.label}
                href={t.href}
                className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm hover:bg-neutral-50"
              >
                {t.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mini How-To (rich snippet target) */}
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            How to Pick a Strong Wordle Starter
          </h2>
          <ol className="mt-4 list-inside list-decimal space-y-2 text-neutral-800">
            <li>
              <span className="font-medium">Cover common letters:</span> Aim for
              at least 3 high-frequency consonants and 2 vowels.
            </li>
            <li>
              <span className="font-medium">Avoid duplicates early:</span> Use
              five unique letters to maximize information from the first guess.
            </li>
            <li>
              <span className="font-medium">Plan a second probe:</span> Choose a
              backup word that covers new letters the first guess missed.
            </li>
          </ol>
          <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
            <span className="font-semibold">Pro tip:</span> After the first
            feedback, lock vowel position first, then test likely consonant
            pairs (e.g., <span className="font-mono">TH</span>,{" "}
            <span className="font-mono">ST</span>,{" "}
            <span className="font-mono">CH</span>).
          </div>
        </div>

        {/* Editorial standards / about */}
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">About Our Guides</h2>
          <p className="mt-2 text-neutral-700">
            Articles are short, practical, and updated for clarity. We favor
            examples, letter-frequency data, and repeatable checklists over
            trivia. Accessibility—legible type, high contrast, and
            keyboard-friendly navigation—is part of our review for every page.
          </p>
        </div>
      </section>

      {/* Learners & Educators */}
      <section id="learners-educators" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">For Learners & Educators</h2>
          <p className="mt-2 text-neutral-700">
            Structured, research-informed activities for self-learners,
            classrooms, and families. Use short drills, clear targets, and
            printable materials to build vocabulary, decoding, and puzzle
            strategy.
          </p>

          {/* Two-role overview */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {/* Learners */}
            <article className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-lg font-semibold">For Learners</h3>
              <ul className="mt-3 list-inside list-disc text-neutral-800">
                <li>
                  Follow a weekly plan:{" "}
                  <a
                    className="underline hover:no-underline"
                    href="#daily-practice"
                  >
                    Daily Practice Hub
                  </a>{" "}
                  →{" "}
                  <a
                    className="underline hover:no-underline"
                    href="#strategy-library"
                  >
                    Strategy Library
                  </a>{" "}
                  →{" "}
                  <a
                    className="underline hover:no-underline"
                    href="#progress-tracking"
                  >
                    Progress Tracking
                  </a>
                  .
                </li>
                <li>
                  Build recall with{" "}
                  <a
                    className="underline hover:no-underline"
                    href="#word-lists"
                  >
                    two- & three-letter helpers
                  </a>{" "}
                  and high-frequency affixes.
                </li>
                <li>
                  Improve accuracy using{" "}
                  <a
                    className="underline hover:no-underline"
                    href="#spelling-frequency"
                  >
                    letter frequency & position tactics
                  </a>
                  .
                </li>
                <li>
                  Practice endgame discipline with{" "}
                  <a
                    className="underline hover:no-underline"
                    href="#timed-playbook"
                  >
                    timed mode checkpoints
                  </a>
                  .
                </li>
              </ul>
              <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
                <span className="font-medium">Outcome:</span> faster solves,
                better guess efficiency, and stronger vocabulary recall in 4–6
                weeks.
              </div>
            </article>

            {/* Educators */}
            <article className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-lg font-semibold">For Educators & Parents</h3>
              <ul className="mt-3 list-inside list-disc text-neutral-800">
                <li>
                  Use{" "}
                  <a
                    className="underline hover:no-underline"
                    href="#printables-offline"
                  >
                    printable mini-crosswords & anagram sheets
                  </a>{" "}
                  for 5–10 minute warmups.
                </li>
                <li>
                  Target phonics with{" "}
                  <a
                    className="underline hover:no-underline"
                    href="#esl-phonics"
                  >
                    vowel teams, blends, and minimal pairs
                  </a>
                  .
                </li>
                <li>
                  Differentiate by assigning{" "}
                  <a
                    className="underline hover:no-underline"
                    href="#word-lists"
                  >
                    tiered word lists
                  </a>{" "}
                  (A1→C1) and clue types.
                </li>
                <li>
                  Assess with quick rubrics: accuracy %, average guesses, and
                  time-to-solve benchmarks.
                </li>
              </ul>
              <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
                <span className="font-medium">Outcome:</span> measurable growth
                in decoding, spelling, and clue interpretation with minimal
                prep.
              </div>
            </article>
          </div>

          {/* Vocabulary Track: compact syllabus */}
          <div className="mt-6 rounded-xl border border-neutral-200 p-5">
            <h3 className="text-lg font-semibold">
              6-Week Vocabulary & Pattern Track (A2–B2)
            </h3>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-neutral-200 p-4">
                <h4 className="font-medium">Weeks 1–2 · Foundations</h4>
                <ul className="mt-2 list-inside list-disc text-sm text-neutral-800">
                  <li>Two/three-letter power sets</li>
                  <li>Common digraphs & positions</li>
                  <li>
                    <a
                      className="underline hover:no-underline"
                      href="#affixes-playbook"
                    >
                      High-yield prefixes/suffixes
                    </a>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-neutral-200 p-4">
                <h4 className="font-medium">Weeks 3–4 · Expansion</h4>
                <ul className="mt-2 list-inside list-disc text-sm text-neutral-800">
                  <li>Stem → family expansion drills</li>
                  <li>Pangram/anchor letter hunts</li>
                  <li>Cryptic indicators primer</li>
                </ul>
              </div>
              <div className="rounded-lg border border-neutral-200 p-4">
                <h4 className="font-medium">Weeks 5–6 · Fluency</h4>
                <ul className="mt-2 list-inside list-disc text-sm text-neutral-800">
                  <li>Timed sprints & error taxonomy</li>
                  <li>Mixed-mode review sets</li>
                  <li>
                    <a
                      className="underline hover:no-underline"
                      href="#progress-tracking"
                    >
                      Benchmarks & streak logs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="#daily-practice"
                className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                Start Daily Drills
              </a>
              <a
                href="#word-lists"
                className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                Open Word Lists
              </a>
              <a
                href="#printables-offline"
                className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                Get Printables
              </a>
            </div>
          </div>

          {/* Measurement block */}
          <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
            <h3 className="text-lg font-semibold">Measure What Matters</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Track average guesses, solve time, and accuracy. Review one error
              type per week (duplicates, mis-placed vowels, missed digraphs) and
              apply a single fix in the next session.
            </p>
          </div>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Audience",
                "@id": "https://learnwordgames.com/#students",
                audienceType: "Students",
                educationalRole: "Learner",
              },
              {
                "@type": "Audience",
                "@id": "https://learnwordgames.com/#educators",
                audienceType: "Teachers",
                educationalRole: "Instructor",
              },
              {
                "@type": "Course",
                name: "Vocabulary & Pattern Track (A2–B2)",
                description:
                  "A 6-week structured plan to build puzzle vocabulary, pattern recognition, and solve efficiency.",
                url: "https://learnwordgames.com/#learners-educators",
                provider: {
                  "@type": "Organization",
                  name: "Learn Word Games",
                  url: "https://learnwordgames.com/",
                },
                audience: [
                  { "@id": "https://learnwordgames.com/#students" },
                  { "@id": "https://learnwordgames.com/#educators" },
                ],
                educationalLevel: ["A2", "B1", "B2"],
                hasCourseInstance: {
                  "@type": "CourseInstance",
                  courseMode: "online",
                  instructor: {
                    "@type": "Organization",
                    name: "Learn Word Games",
                  },
                },
                learningResourceType: [
                  "Practice worksheet",
                  "Strategy guide",
                  "Word list",
                  "Timed drill",
                ],
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://learnwordgames.com/",
                  },
                ],
              },
              {
                "@type": "ItemList",
                name: "Popular Guides & Quick Starts",
                url: "https://learnwordgames.com/",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Beginner’s Guide to Word Games",
                    url: "https://learnwordgames.com/#beginners-guide",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Word Game Strategy Library",
                    url: "https://learnwordgames.com/#strategy-library",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Daily Practice Hub",
                    url: "https://learnwordgames.com/#daily-practice",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Rules, Formats, and Scoring",
                    url: "https://learnwordgames.com/#rules-scoring",
                  },
                  {
                    "@type": "ListItem",
                    position: 5,
                    name: "Vocabulary Builder",
                    url: "https://learnwordgames.com/#vocabulary-builder",
                  },
                  {
                    "@type": "ListItem",
                    position: 6,
                    name: "Anagram & Pangram Lab",
                    url: "https://learnwordgames.com/#anagram-pangram",
                  },
                  {
                    "@type": "ListItem",
                    position: 7,
                    name: "Crossword & Cryptic Skills",
                    url: "https://learnwordgames.com/#crossword-skills",
                  },
                  {
                    "@type": "ListItem",
                    position: 8,
                    name: "Spelling & Letter Frequency",
                    url: "https://learnwordgames.com/#spelling-frequency",
                  },
                  {
                    "@type": "ListItem",
                    position: 9,
                    name: "Timed Mode Playbook",
                    url: "https://learnwordgames.com/#timed-playbook",
                  },
                  {
                    "@type": "ListItem",
                    position: 10,
                    name: "Curated Word Lists",
                    url: "https://learnwordgames.com/#word-lists",
                  },
                  {
                    "@type": "ListItem",
                    position: 11,
                    name: "Word Game Tools & Generators",
                    url: "https://learnwordgames.com/#tools-generators",
                  },
                  {
                    "@type": "ListItem",
                    position: 12,
                    name: "Track Progress & Improve",
                    url: "https://learnwordgames.com/#progress-tracking",
                  },
                ],
              },
              {
                "@type": "HowTo",
                name: "How to Pick a Strong Wordle Starter",
                description:
                  "Choose a first guess that maximizes information and sets up a high-coverage second probe.",
                totalTime: "PT2M",
                estimatedCost: {
                  "@type": "MonetaryAmount",
                  currency: "USD",
                  value: "0",
                },
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Cover common letters",
                    text: "Aim for at least three high-frequency consonants and two vowels in your opener.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Avoid duplicates early",
                    text: "Use five unique letters so your first guess returns maximum information.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Plan a second probe",
                    text: "Have a backup that covers new letters your opener didn’t test.",
                  },
                ],
              },
            ],
          }),
        }}
      />

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
          <span className="sr-only">
            Updated {new Date(nowISO).toISOString()}
          </span>
        </div>
      </footer>
    </main>
  );
}
