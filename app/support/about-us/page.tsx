import { Metadata } from "next";
import { Users, Target, Eye, Heart, Sparkles, Crown, Phone, User } from "lucide-react";
import { SupportNav } from "../components/supportNavbar";
import { GiRoyalLove } from "react-icons/gi";

export const metadata: Metadata = {
  title: "About Us | CRAB Fashion",
  description:
    "Discover CRAB Fashion - a premium clothing brand crafted for those who value style, quality, and confidence. Learn about our story, mission, vision, and values.",
  alternates: {
    canonical: "http://crabfashionbd.com/support/about-us",
  },
  openGraph: {
    title: "About Us | CRAB Fashion",
    description:
      "Premium clothing brand blending contemporary fashion with refined craftsmanship. Elegance, comfort, and individuality in every piece.",
    url: "https://www.crab-fashion.com/about-us",
    siteName: "CRAB Fashion",
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <section>
      <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Hero Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-rose-100 to-pink-100 mb-6">
            <Crown className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            About CRAB Fashion
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A premium clothing brand crafted for those who value style, quality,
            and confidence. We blend contemporary fashion with refined
            craftsmanship to create apparel that speaks{" "}
            <span className="font-semibold text-gray-900">elegance</span>,{" "}
            <span className="font-semibold text-gray-900">comfort</span>, and{" "}
            <span className="font-semibold text-gray-900">individuality</span>.
          </p>
          <div className="mt-6 text-sm text-gray-500 max-w-2xl mx-auto">
            Every piece is thoughtfully designed using superior fabrics,
            ensuring a timeless yet modern look for today's lifestyle.
          </div>
        </header>

        {/* Our Story */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-linear-to-r from-amber-100 to-orange-100">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900"> Our Story</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                CRAB Fashion was born from a passion for elevated fashion and
                attention to detail. What started as a vision to redefine
                everyday wear has evolved into a brand that represents
                sophistication and reliability.
              </p>
              <p>
                Our journey is guided by{" "}
                <span className="font-semibold text-gray-900">creativity</span>,{" "}
                <span className="font-semibold text-gray-900">precision</span>,
                and an uncompromising commitment to{" "}
                <span className="font-semibold text-gray-900">excellence</span>.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden bg-linear-to-br from-amber-50 to-orange-50 p-8">
                <div className="w-full h-full border-2 border-dashed border-amber-200 rounded-xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                    <p className="text-amber-700 font-medium">
                      From vision to reality
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-rose-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-rose-100 to-pink-100 mb-6">
                  <Target className="w-7 h-7 text-rose-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🎯 Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To deliver premium-quality clothing that enhances personal
                  style, ensures comfort, and builds lasting confidence—while
                  maintaining exceptional standards in design and service.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-indigo-100 to-purple-100 mb-6">
                  <Eye className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To become a distinguished clothing brand recognized for luxury
                  aesthetics, superior quality, and enduring trust in the
                  fashion industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-emerald-100 to-teal-100 mb-6">
              <Heart className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide every stitch, every design, and every
              interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Excellence in Quality",
                description: "Finest fabrics, flawless finishing",
                icon: "✨",
                color: "from-blue-100 to-cyan-100",
              },
              {
                title: "Timeless Design",
                description: "Elegant styles beyond seasonal trends",
                icon: "🎨",
                color: "from-amber-100 to-orange-100",
              },
              {
                title: "Customer Prestige",
                description: "Every customer is valued",
                icon: "👑",
                color: "from-rose-100 to-pink-100",
              },
              {
                title: "Integrity & Trust",
                description: "Transparency in every step",
                icon: "🤝",
                color: "from-emerald-100 to-teal-100",
              },
              {
                title: "Innovation",
                description: "Modern techniques, classic elegance",
                icon: "💡",
                color: "from-purple-100 to-violet-100",
              },
              {
                title: "Sustainability",
                description: "Mindful creation, lasting value",
                icon: "🌿",
                color: "from-green-100 to-lime-100",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl bg-linear-to-br ${value.color}`}
                  >
                    <span className="text-2xl">{value.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {value.title}
                    </h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Preview */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet The Crafters
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate individuals who bring our vision to life with
              dedication and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "G.M.MEHEDI HASAN",
                role: "Chairman",
                phone: "01921617705",
                img: "https://i.postimg.cc/Twj13ydx/Whats-App-Image-2026-01-27-at-4-33-04-PM-(1).jpg",
              },
              {
                name: "ASMA-UL-HUSNA",
                role: "CEO",
                phone: "01782461118",
                img: "https://i.postimg.cc/DfgmVbpd/Whats-App-Image-2026-01-27-at-4-33-03-PM-(1).jpg",
              },
              {
                name: "ABDUL HALIM",
                role: "Managing Director",
                phone: "01787246224",
                img: "https://i.postimg.cc/mg0g33kv/Whats-App-Image-2026-01-27-at-4-33-03-PM.jpg",
              },
              {
                name: "RAHIMA",
                role: "CO",
                phone: "**",
                img: "https://i.postimg.cc/QM1xfBW0/Whats-App-Image-2026-01-27-at-4-33-04-PM.jpg",
              },
            ].map((member, index) => (
              <div key={index} className="group text-center relative">
                <div className="relative mb-6 mx-auto w-40 h-40">
                  {/* Outer circular border */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-200 to-blue-300 rounded-full group-hover:from-blue-300 group-hover:to-blue-400 transition-all duration-300 p-1">
                    {/* Inner circle with gradient background */}
                    <div className="absolute inset-1 bg-linear-to-br from-gray-100 to-gray-200 rounded-full group-hover:from-blue-50 group-hover:to-blue-50 transition-all duration-300"></div>

                    {/* Image container with circular mask */}
                    <div className="absolute inset-3 bg-linear-to-br from-white to-gray-50 rounded-full flex items-center justify-center overflow-hidden">
                      {member.img && member.img !== "" ? (
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <Users className="w-16 h-16 text-gray-300 group-hover:text-blue-200 transition-colors duration-300" />
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-500">{member.phone}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-black"></div>
          <div className="relative p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-pink-500 to-blue-500 mb-8">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Experience CRAB Fashion
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join us in redefining premium fashion. Explore our collections or
              reach out to learn more about our brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/collections"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Explore Collections
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
