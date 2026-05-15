import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import Disclaimer from "@/components/Disclaimer";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <Services />
      <WhyUs />
      <Gallery />
      <Disclaimer />
      <Contact />
      <Footer />
    </main>
  );
}
