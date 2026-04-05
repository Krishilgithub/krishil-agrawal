import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Blogs } from "@/components/sections/Blogs";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-full">
      <Hero />
      <About />
      <Projects />
      <Blogs />
      <Skills />
      <Contact />
    </main>
  );
}
