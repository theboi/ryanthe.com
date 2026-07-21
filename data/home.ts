export interface LabeledValue {
  label: string;
  value: string;
}

export interface SectionLabelContent {
  title: string;
  index: string;
}

export interface HeroContent {
  portfolioLabel: string;
  indexLabel: string;
  name: string;
  tagline: string;
  mutedTagline: string;
  shapeMark: string;
  details: readonly LabeledValue[];
  scrollLabel: string;
}

export interface ProjectCardContent {
  url: string;
  title: string;
  externalMarker: string;
  description: string;
  mutedDescription: string;
  visualLabel: string;
  visualRatio: string;
  metadata: readonly LabeledValue[];
}

export interface SplitCardContent {
  url: string;
  visualLabel: string;
  visualRatio: string;
  eyebrow: string;
  title: string;
  description: string;
  mutedDescription: string;
  metadata: readonly LabeledValue[];
}

export interface QuoteCardContent {
  url: string;
  eyebrow: string;
  category: string;
  quote: string;
  mutedQuote: string;
  title: string;
  subtitle: string;
  specimenLabel: string;
  specimenColors: readonly string[];
}

export interface ListCardItemContent {
  number: string;
  title: string;
  description: string;
  period: string;
}

export interface ListCardContent {
  heading: string;
  emphasizedHeading: string;
  updatedLabel: string;
  items: readonly ListCardItemContent[];
}

export interface StatsMetricContent {
  label: string;
  value: string;
  accent?: string;
  description: string;
}

export interface StatsCardContent {
  title: string;
  emphasizedTitle: string;
  label: string;
  metrics: readonly StatsMetricContent[];
  footerLeft: string;
  footerRight: string;
}

export interface GalleryTileContent {
  id: string;
  position: string;
  imageLabel: string;
  title: string;
  aspectRatio: string;
}

export interface GalleryCardContent {
  titleLineOne: string;
  titleLineTwo: string;
  description: string;
  tiles: readonly GalleryTileContent[];
}

export interface ProcessStepContent {
  id: string;
  label: string;
  title: string;
  description: string;
  active: boolean;
}

export interface ProcessCardContent {
  title: string;
  emphasizedTitle: string;
  label: string;
  steps: readonly ProcessStepContent[];
  footerLeft: string;
  footerRight: string;
}

export interface FeatureCardContent {
  badge: string;
  cornerLabel: string;
  titleLineOne: string;
  titleLineTwo: string;
  emphasizedTitle: string;
  metadata: readonly LabeledValue[];
}

export interface SpecRowContent {
  id: string;
  label: string;
  value: string;
  tag: string;
  boldValue?: boolean;
}

export interface SpecCardContent {
  label: string;
  title: string;
  emphasizedTitle: string;
  description: string;
  mutedDescription: string;
  signature: string;
  rows: readonly SpecRowContent[];
}

export interface IndexChapterContent {
  id: string;
  number: string;
  titleBeforeEmphasis: string;
  emphasizedTitle?: string;
  titleAfterEmphasis?: string;
  page: string;
}

export interface IndexCardContent {
  title: string;
  emphasizedTitle: string;
  label: string;
  chapters: readonly IndexChapterContent[];
  signature: string;
}

export interface TwoUpCardContent {
  leftLabel: string;
  leftTitleBeforeEmphasis: string;
  leftEmphasizedTitle: string;
  leftTitleAfterEmphasis: string;
  leftDescription: string;
  leftMutedDescription: string;
  leftItems: readonly string[];
  rightLabel: string;
  rightTitleBeforeEmphasis: string;
  rightEmphasizedTitle: string;
  rightTitleAfterEmphasis: string;
  rightDescription: string;
  rightMutedDescription: string;
  rightItems: readonly string[];
}

export interface ContactLinkContent {
  iconClassName: string;
  href: string;
  label: string;
  openInNewTab?: boolean;
}

export interface ContactCardContent {
  eyebrow: string;
  heading: string;
  emphasizedHeading: string;
  headingSuffix: string;
  lead: string;
  mutedLead: string;
  colophon: readonly string[];
  links: readonly ContactLinkContent[];
}

export interface HomePageContent {
  hero: HeroContent;
  sections: {
    selectedWork: SectionLabelContent;
    education: SectionLabelContent;
    templates: SectionLabelContent;
    reach: SectionLabelContent;
  };
  cards: {
    project: ProjectCardContent;
    split: SplitCardContent;
    quote: QuoteCardContent;
    background: ListCardContent;
    stats: StatsCardContent;
    gallery: GalleryCardContent;
    process: ProcessCardContent;
    feature: FeatureCardContent;
    spec: SpecCardContent;
    index: IndexCardContent;
    twoUp: TwoUpCardContent;
    contact: ContactCardContent;
  };
}

export const homePageData = {
  hero: {
    portfolioLabel: "Ryan The · 2026",
    indexLabel: "01",
    name: "Ryan The,",
    tagline: "a student, self-taught software developer & designer based in Singapore,",
    mutedTagline:
      "passionate about harnessing technology to improve society, building solutions that turn complex data and repetitive workflows into clear reports and practical tools.",
    shapeMark: "",
    details: [
      // { label: "Practice", value: "Dev ↔ Design" },
      // { label: "Stack", value: "React · Swift · Python" },
      { label: "Based", value: "Singapore" },
      { label: "Reach", value: "ryan@ryanthe.com" },
    ],
    scrollLabel: "Scroll",
  },
  sections: {
    selectedWork: { title: "", index: "" },
    education: { title: "Education & Leadership", index: "" },
    templates: { title: "Templates / Future Slides", index: "" },
    reach: { title: "Reach", index: "" },
  },
  cards: {
    project: {
      url: "/projects/nrc-2021",
      title: "NRC 2021",
      externalMarker: "↗",
      description: "National Robotics Competition — Future Engineers Category.",
      mutedDescription:
        "Programmed an autonomous robot with a computer vision pipeline to detect obstacles and navigate a track.",
      visualLabel: "[ robot · CV pipeline ]",
      visualRatio: "16 : 9",
      metadata: [
        { label: "Year", value: "2021" },
        { label: "Role", value: "Programming, CV" },
        { label: "Stack", value: "Python, OpenCV, TF" },
        { label: "Category", value: "Future Engineers" },
      ],
    },
    split: {
      url: "/projects/robocup-2021",
      visualLabel: "[ line-tracing run · arena ]",
      visualRatio: "1 : 1",
      eyebrow: "02 / RoboCup",
      title: "RoboCup 2021",
      description: "2nd Place — Robotics @APEX team.",
      mutedDescription:
        "Despite a less-than-optimal line-tracing algorithm and tight timeline, our team returned to school whenever possible to iterate, eventually pulling through with second place by staying resilient.",
      metadata: [
        { label: "Year", value: "2021" },
        { label: "Role", value: "Programmer" },
        { label: "Hardware", value: "Lego EV3" },
        { label: "Result", value: "2nd Place" },
      ],
    },
    quote: {
      url: "/projects/tour-glasses",
      eyebrow: "03 / Splash Awards 2021",
      category: "Innovation · 2021",
      quote: "“Critical & creative thinking turn picked-up skills into innovative strategies.",
      mutedQuote:
        "Tour glasses prototype — 1st Runner-up at Splash Awards 2021, Champions at ChangeMakers InnoFest 2020.”",
      title: "Tour Glasses",
      subtitle: "— a wearable that narrates the city you're walking through.",
      specimenLabel: "Stack",
      specimenColors: ["var(--accent)", "oklch(78% 0.04 220)", "#1c1a13"],
    },
    background: {
      heading: "Where I've",
      emphasizedHeading: "grown.",
      updatedLabel: "Updated · 2024",
      items: [
        {
          number: "001",
          title: "Eunoia Junior College",
          description:
            "Singapore-Cambridge GCE A-Levels. Data Analytics & Visualisation module.",
          period: "2023 — 2024",
        },
        {
          number: "002",
          title: "President · SST Inc TDP",
          description:
            "Led the ICT talent development programme — INCamp, weekly training, mentorship.",
          period: "2021 — 2022",
        },
        {
          number: "003",
          title: "CTO (React) · SST Inc",
          description:
            "Built the club's automated attendance taker; led React/React Native roadmap and lessons.",
          period: "2020 — 2021",
        },
        {
          number: "004",
          title: "School of Science & Technology, Singapore",
          description:
            "Four years; Computing+ for O-Levels. Robotics @APEX CCA, EXCO.",
          period: "2019 — 2022",
        },
      ],
    },
    stats: {
      title: "By the",
      emphasizedTitle: "numbers.",
      label: "T1 · Stats",
      metrics: [
        {
          label: "Shipped",
          value: "12",
          accent: "+",
          description: "Projects across web, native & robotics.",
        },
        {
          label: "Years",
          value: "06",
          description: "Building software since 2019.",
        },
        {
          label: "Awards",
          value: "04",
          description: "Including 1st Runner-up, Splash Awards.",
        },
      ],
      footerLeft: "Updated · 2026",
      footerRight: "— stat block —",
    },
    gallery: {
      titleLineOne: "Selected",
      titleLineTwo: "artefacts.",
      description:
        "A grid for screenshots, photographs, or process shots. Each tile carries a small caption block.",
      tiles: [
        {
          id: "project-a",
          position: "a",
          imageLabel: "[ image · 01 ]",
          title: "Project A",
          aspectRatio: "4 : 3",
        },
        {
          id: "project-b",
          position: "b",
          imageLabel: "[ image · 02 ]",
          title: "Project B",
          aspectRatio: "4 : 3",
        },
        {
          id: "project-c",
          position: "c",
          imageLabel: "[ image · 03 ]",
          title: "Project C",
          aspectRatio: "4 : 3",
        },
        {
          id: "project-d",
          position: "d",
          imageLabel: "[ image · 04 ]",
          title: "Project D",
          aspectRatio: "4 : 3",
        },
      ],
    },
    process: {
      title: "How it",
      emphasizedTitle: "came together.",
      label: "T3 · Process",
      steps: [
        {
          id: "discover",
          label: "01 · Discover",
          title: "Research & framing",
          description:
            "Interviews, audits, scoping — figuring out what's actually worth building.",
          active: true,
        },
        {
          id: "sketch",
          label: "02 · Sketch",
          title: "Low-fi exploration",
          description:
            "Wireframes, paper, whiteboards. Diverging widely before converging.",
          active: true,
        },
        {
          id: "build",
          label: "03 · Build",
          title: "Prototype & ship",
          description:
            "Real code, real components, real edge cases. Shipping early and often.",
          active: false,
        },
        {
          id: "reflect",
          label: "04 · Reflect",
          title: "Measure & iterate",
          description:
            "Telemetry, retros, follow-ups. What worked, what didn't, what's next.",
          active: false,
        },
      ],
      footerLeft: "Method · iterative",
      footerRight: "— process block —",
    },
    feature: {
      badge: "Now Featuring",
      cornerLabel: "[ hero · 16 : 9 ]",
      titleLineOne: "A featured",
      titleLineTwo: "piece,",
      emphasizedTitle: "in motion.",
      metadata: [
        { label: "Type", value: "Case Study" },
        { label: "Year", value: "2026" },
        { label: "Role", value: "Lead Designer" },
        { label: "Read", value: "8 min" },
      ],
    },
    spec: {
      label: "T5 · Spec sheet",
      title: "The",
      emphasizedTitle: "details.",
      description:
        "For project metadata that doesn't fit neatly elsewhere — versions, dependencies, credits.",
      mutedDescription: "Long-form colophon block; mono keys, prose values.",
      signature: "— spec block —",
      rows: [
        {
          id: "version",
          label: "Version",
          value: "v1.0.4",
          tag: "stable",
          boldValue: true,
        },
        {
          id: "released",
          label: "Released",
          value: "March 2026",
          tag: "recent",
        },
        {
          id: "stack",
          label: "Stack",
          value: "React, TypeScript, Tailwind",
          tag: "web",
        },
        {
          id: "hosted",
          label: "Hosted",
          value: "Vercel · edge runtime",
          tag: "live",
        },
        {
          id: "repo",
          label: "Repo",
          value: "github.com/owner/repo",
          tag: "public",
        },
        {
          id: "credits",
          label: "Credits",
          value: "Designed & built solo",
          tag: "solo",
        },
        {
          id: "license",
          label: "License",
          value: "MIT",
          tag: "open",
        },
      ],
    },
    index: {
      title: "Index",
      emphasizedTitle: "of chapters.",
      label: "T6 · TOC",
      chapters: [
        {
          id: "brief",
          number: "01",
          titleBeforeEmphasis: "The ",
          emphasizedTitle: "brief",
          titleAfterEmphasis: " — and what it didn't say.",
          page: "p. 002",
        },
        {
          id: "sketches",
          number: "02",
          titleBeforeEmphasis: "Sketches, dead ends, second drafts.",
          page: "p. 014",
        },
        {
          id: "prototype",
          number: "03",
          titleBeforeEmphasis: "Building the ",
          emphasizedTitle: "prototype.",
          page: "p. 028",
        },
        {
          id: "shipping",
          number: "04",
          titleBeforeEmphasis: "Shipping & what we learned.",
          page: "p. 046",
        },
      ],
      signature: "— index block —",
    },
    twoUp: {
      leftLabel: "Before",
      leftTitleBeforeEmphasis: "The ",
      leftEmphasizedTitle: "old",
      leftTitleAfterEmphasis: " way.",
      leftDescription: "A short narrative for the prior state.",
      leftMutedDescription:
        "What was clunky, slow, or invisible — written without piling on.",
      leftItems: [
        "Manual handoffs across three tools.",
        "No shared source of truth.",
        "Decisions lost in chat threads.",
      ],
      rightLabel: "After",
      rightTitleBeforeEmphasis: "The ",
      rightEmphasizedTitle: "new",
      rightTitleAfterEmphasis: " way.",
      rightDescription: "A short narrative for the redesigned state.",
      rightMutedDescription:
        "What changed and how it felt — concrete and quietly proud.",
      rightItems: [
        "One canvas, all stakeholders.",
        "Versioning & review baked in.",
        "Decisions stamped, dated, found.",
      ],
    },
    contact: {
      eyebrow: "Get in touch",
      heading: "Say",
      emphasizedHeading: "hello",
      headingSuffix: ".",
      lead:
        "Always open to conversations about software, robotics, leadership, or how to use technology to solve real-world problems.",
      mutedLead: "",
      colophon: [
        "© 2026 Ryan Theodore The",
      ],
      links: [
        {
          iconClassName: "fa-solid fa-envelope",
          href: "mailto:ryan@ryanthe.com",
          label: "ryan@ryanthe.com",
        },
        {
          iconClassName: "fa-brands fa-github",
          href: "https://github.com/theboi",
          label: "github.com/theboi",
          openInNewTab: true,
        },
        {
          iconClassName: "fa-brands fa-linkedin",
          href: "https://www.linkedin.com/in/ryanthe/",
          label: "linkedin.com/in/ryanthe",
          openInNewTab: true,
        },
        {
          iconClassName: "fa-brands fa-medium",
          href: "https://medium.com/@theboi",
          label: "medium.com/@theboi",
          openInNewTab: true,
        },
        {
          iconClassName: "fa-solid fa-globe",
          href: "https://www.ryanthe.com",
          label: "ryanthe.com",
        },
      ],
    },
  },
} as const satisfies HomePageContent;
