import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Credibility } from "@/components/sections/Credibility";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Verticals } from "@/components/sections/Verticals";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { SocialProof } from "@/components/sections/SocialProof";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <Credibility />
        <ProblemSolution />
        <Verticals />
        <Capabilities />
        <Process />
        <WhyUs />
        <SocialProof />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
