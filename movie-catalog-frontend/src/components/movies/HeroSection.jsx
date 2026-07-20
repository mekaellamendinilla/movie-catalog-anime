export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center min-h-[300px] md:min-h-[400px] lg:min-h-[450px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/hero/totoro-bg-image.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full text-center text-[#e7debb] px-6 py-12 md:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="font-montserrat text-sm md:text-2xl mb-2 md:mb-3 opacity-90 tracking-wide">
            Welcome to
          </p>

          <h1 className="font-playfair font-bold text-3xl md:text-5xl lg:text-7xl leading-tight">
            The Dreamy Green
          </h1>

          <p className="font-montserrat mt-4 text-sm md:text-lg max-w-xl mx-auto opacity-90 leading-relaxed">
            A collection of heartwarming stories from the world of Ghibli and beyond.
          </p>
        </div>
      </div>
    </section>
  );
}