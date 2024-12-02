import { Banner } from "@/components/Banner";
import  Header  from "@/components/Header";
import { Hero } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { LogoTicker } from "@/components/LogoTicker";
import  Features  from "@/components/Features";
import { ProductShowcase } from "@/components/ProductShowcase";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import Introduction from "@/components/Introduction";
import {SparklesPreview} from"@/components/Orion";
import Stats from "@/components/Stats";
import Pricing from "@/components/Pricing";
import { WobbleCardDemo} from "@/components/Wobblecard";
import Feedback from "@/components/Feedback";
import AdminContent from "@/components/AdminContent";
export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <AdminContent/>
      <Pricing />
      {/* <LogoTicker /> */}
      <Stats />
      <SparklesPreview />
      <Features />
      {/* <Introduction /> */}
      <LogoTicker />
      <ProductShowcase />
      {/* <WobbleCardDemo /> */}
      
      <Feedback />
      <CallToAction />
      
    </>
  );
}
