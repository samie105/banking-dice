import Hero from "@/components/main/hero-section/hero-page";
import Discover from "@/components/main/discover-section/Discover";
import React from "react";
import Wcu from "@/components/main/wcu-page/Wcu";
import Savings from "@/components/main/savings-section/Savings";
import Testimonials from "@/components/main/testimonials/Testimonials";
import SupportContact from "@/components/main/support-contact/Support";
import CardPage from "@/components/main/card-sect/CardPage";
import ReasonPage from "@/components/main/Reason-page/ReasonPage";
import Footer from "@/components/main/Footer/Footer";
import Category from "@/components/main/bank_cat/Category";
import Flight from "@/components/main/Flight/Flight";
import BTT from "@/components/main/BackToTop";
import Navbar from "@/components/main/navbar/Navbar";
import Script from "next/script";

export default function page() {
  return (
    <>
        <Script src="//code.jivosite.com/widget/1U5DmgXFzL" async strategy="beforeInteractive"/>
    
    <div className="dark:bg-white">
      <Navbar />
      <div className="/bg-[#E9EDF0] overflow-hidden max-w-[1440px] mx-auto ">
        <Hero />
        <Discover />
        <Flight />
        <CardPage />
        <Wcu />
        <Savings />
        <ReasonPage />
        <Category />
        <Testimonials />
        <SupportContact />
        <Footer />
        <BTT />
      </div>
    </div></>
  );
}
