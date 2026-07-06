import React from "react";

import Footer from "../../components/layout/Footer";
import PublicNavbar from "../../components/layout/PublicNavbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#27452f] text-[#e7debb]">
      <PublicNavbar />

      <main className="flex-1">
        <section
          className="relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero/totoro-bg-image.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="mx-auto max-w-3xl">
              <p className="text-3xl font-light leading-tight sm:text-4xl md:text-5xl">
                Welcome to
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                The Dreamy Green
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#e7debb] sm:text-lg md:text-xl lg:text-2xl">
                A collection of heartwarming stories from the world of Ghibli and beyond.
              </p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
