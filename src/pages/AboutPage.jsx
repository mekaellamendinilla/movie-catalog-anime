import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

function AboutPage() {
  return (

    <div className="min-h-screen bg-[#27452f] text-[#e7debb]"> 
        <NavBar />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <section className="text-center mb-20">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            About RLZone
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-[#e7debb]/80 leading-8 font-montserrat">
            RLZone is a cozy digital space created for anime and
            Studio Ghibli enthusiasts. Discover magical stories,
            unforgettable characters, and timeless adventures all in
            one place.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">

          <div>
            <img
              src="/images/about-page-logo/catalog-logo.png"
              alt="RLZone"
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>

          <div>
            <h2 className="font-playfair text-4xl mb-6">
              Our Story
            </h2>
            <p className="text-[#e7debb]/80 leading-8 mb-6 font-montserrat">
              Inspired by the beauty and warmth of Studio Ghibli films,
              RLZone was developed as a simple movie catalog application
              where users can browse, search, and explore anime movies.
            </p>

            <p className="text-[#e7debb]/80 leading-8">
              Whether you're revisiting childhood favorites or
              discovering new adventures, RLZone aims to provide a
              relaxing and enjoyable browsing experience.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="font-playfair text-4xl text-center mb-10">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#36573e] rounded-xl p-8">
              <h3 className="text-2xl font-playfair mb-4">🔍 Search Movies</h3>

              <p className="text-[#e7debb]/80 font-montserrat">
                Quickly find your favorite anime movies using the search functionality.
              </p>
            </div>

            <div className="bg-[#36573e] rounded-xl p-8">
              <h3 className="text-2xl font-playfair mb-4">🎬 Movie Details</h3>

              <p className="text-[#e7debb]/80 font-montserrat">
                View detailed information about each movie including descriptions, release year, and category.
              </p>
            </div>

            <div className="bg-[#36573e] rounded-xl p-8">
              <h3 className="text-2xl font-playfair mb-4">📱 Responsive Design</h3>

              <p className="text-[#e7debb]/80 font-montserrat">
                Enjoy a seamless experience across desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#36573e] rounded-2xl p-10 text-center">
          <h2 className="font-playfair text-4xl mb-6">
            Our Mission
          </h2>
          <p className="max-w-3xl mx-auto text-[#e7debb]/80 leading-8 font-montserrat">
            Our mission is to celebrate the magic of anime storytelling
            by creating a peaceful and visually engaging catalog where
            fans can easily explore and rediscover beloved films.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;