import HomeClient from "./_components/HomeClient";
import DotGrid from "./_components/home/DotGrid";
import HeroCard from "./_components/home/HeroCard";
import { HomeBodyStyles } from "./_components/home/HomeBodyStyles";
import SectionLabel from "./_components/home/SectionLabel";
import ContactCard from "./_components/home/cards/ContactCard";
import FeatureCard from "./_components/home/cards/FeatureCard";
import GalleryCard from "./_components/home/cards/GalleryCard";
import IndexCard from "./_components/home/cards/IndexCard";
import ListCard from "./_components/home/cards/ListCard";
import ProcessCard from "./_components/home/cards/ProcessCard";
import ProjectCard from "./_components/home/cards/ProjectCard";
import QuoteCard from "./_components/home/cards/QuoteCard";
import SpecCard from "./_components/home/cards/SpecCard";
import SplitCard from "./_components/home/cards/SplitCard";
import StatsCard from "./_components/home/cards/StatsCard";
import TwoUpCard from "./_components/home/cards/TwoUpCard";
import { homePageData } from "../data/home";

export default function Page() {
  const { hero, sections, cards } = homePageData;

  return (
    <HomeClient>
      <HomeBodyStyles />
      <DotGrid />
      <HeroCard {...hero} links={cards.contact.links} />

      <div className="hero-spacer" aria-hidden="true" />

      <main className="stack">
        {/* <SectionLabel {...sections.selectedWork} />
        <ProjectCard {...cards.project} />
        <SplitCard {...cards.split} />
        <QuoteCard {...cards.quote} />

        <SectionLabel {...sections.education} />
        <ListCard {...cards.background} /> */}

        {/* <SectionLabel {...sections.templates} />
        <StatsCard {...cards.stats} />
        <GalleryCard {...cards.gallery} />
        <ProcessCard {...cards.process} />
        <FeatureCard {...cards.feature} />
        <SpecCard {...cards.spec} />
        <IndexCard {...cards.index} />
        <TwoUpCard {...cards.twoUp} /> */}

        <SectionLabel {...sections.reach} />
        <ContactCard {...cards.contact} />
      </main>
    </HomeClient>
  );
}
