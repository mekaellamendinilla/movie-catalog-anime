export default function HeroSection() {
  return (
    <section
      className="relative w-screen left-1/2 ml-[-50vw] mr-[-50vw] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero/totoro-bg-image.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex items-center justify-center px-6 py-8 md:py-12 lg:py-16">
        <div className="text-center text-[#e7debb] max-w-3xl">
          <p className="font-montserrat text-sm md:text-2xl mb-2 md:mb-3 opacity-90">
            Welcome to
          </p>

          <h1 className="font-playfair font-bold text-3xl md:text-5xl lg:text-7xl leading-tight">
            The Dreamy Green
          </h1>

          <p className="font-montserrat mt-4 text-sm md:text-lg max-w-xl mx-auto opacity-90">
            A collection of heartwarming stories from the world of Ghibli and beyond.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="h-55 md:h-75 lg:h-100"></div>
      </div>
    </section>
  );
}
