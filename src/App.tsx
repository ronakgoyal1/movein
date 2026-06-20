import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { HowItWorks } from "./components/sections/HowItWorks";
import { WhatsIncluded } from "./components/sections/WhatsIncluded";
import { WhyWisor } from "./components/sections/WhyWisor";
import { WhyNotAmazon } from "./components/sections/WhyNotAmazon";
import { FAQ } from "./components/sections/FAQ";
import { ForDealers } from "./components/sections/ForDealers";
import { KitBuilder } from "./components/builder/KitBuilder";

function App() {
  return (
    <div className="font-sans antialiased text-primary selection:bg-accent/20">
      <Navbar />
      
      <main>
        <Hero />
        <HowItWorks />
        <WhatsIncluded />
        <WhyWisor />
        <WhyNotAmazon />
        <FAQ />
        <ForDealers />
      </main>

      <Footer />
      <KitBuilder />
    </div>
  );
}

export default App;
