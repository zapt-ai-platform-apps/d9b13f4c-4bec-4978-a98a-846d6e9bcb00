import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaGamepad, FaTrophy, FaUsers, FaSnowflake } from 'react-icons/fa';

export default function Home() {
  // Sample carousel items
  const carouselItems = [
    {
      id: 1,
      image: "https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/frost_warlord_banner1.png?width=512&height=512",
      title: "Gabung Turnamen Berikutnya",
      description: "Ikuti kejuaraan Mobile Legends yang akan datang!"
    },
    {
      id: 2,
      image: "https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/frost_warlord_banner2.png?width=512&height=512",
      title: "Jadwal Latihan Mingguan",
      description: "Lihat jadwal latihan terbaru untuk anggota tim"
    },
    {
      id: 3,
      image: "https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/frost_warlord_banner3.png?width=512&height=512",
      title: "Highlight Tim",
      description: "Tonton momen terbaik kami dari turnamen terkini"
    }
  ];

  return (
    <div>
      {/* Hero Section with Carousel */}
      <div className="relative">
        <Carousel 
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={5000}
          showStatus={false}
        >
          {carouselItems.map(item => (
            <div key={item.id} className="relative h-[500px]" data-image-request="mobile legends esports team game with ice theme">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-4xl font-bold text-white mb-4">{item.title}</h2>
                <p className="text-xl text-gray-200 mb-6">{item.description}</p>
                <Link 
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition cursor-pointer"
                >
                  Bergabung Dengan Tim Kami
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* About Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">Tentang Frost Warlord</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Frost Warlord adalah tim esports Mobile Legends profesional yang berkomitmen untuk menjadi yang terbaik dalam kompetisi gaming. 
              Tim kami terdiri dari pemain terampil yang memiliki semangat tinggi tentang game dan berdedikasi untuk mencapai puncak dalam arena kompetitif.
            </p>
          </div>

          {/* Vision and Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 p-8 rounded-lg border border-blue-900">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Visi Kami</h3>
              <p className="text-gray-300">
                Menjadi kekuatan terdepan dalam arena kompetitif Mobile Legends, dikenal karena gameplay strategis, 
                kerja sama tim, dan keterlibatan komunitas. Kami bertujuan menginspirasi generasi berikutnya pemain esports.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg border border-blue-900">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Misi Kami</h3>
              <p className="text-gray-300">
                Menciptakan lingkungan yang mendukung di mana pemain dapat mengembangkan keterampilan mereka, 
                membangun dinamika tim yang kuat, dan mencapai kesuksesan dalam turnamen sambil membangun komunitas yang positif.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg border border-blue-900 text-center">
              <FaGamepad className="text-blue-400 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Pelatihan Profesional</h3>
              <p className="text-gray-300">
                Sesi pelatihan terstruktur dipimpin oleh pelatih berpengalaman untuk meningkatkan keterampilan individu dan koordinasi tim.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg border border-blue-900 text-center">
              <FaTrophy className="text-blue-400 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Partisipasi Turnamen</h3>
              <p className="text-gray-300">
                Partisipasi rutin dalam turnamen lokal dan internasional untuk mendapatkan pengalaman kompetitif.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg border border-blue-900 text-center">
              <FaUsers className="text-blue-400 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Membangun Komunitas</h3>
              <p className="text-gray-300">
                Komunitas yang mendukung pemain, penggemar, dan enthusiast yang berbagi semangat untuk Mobile Legends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-blue-900 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <FaSnowflake className="text-5xl text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">
            Bersama Frost Warlord, Kuasai Arena Mobile Legends dengan Es yang Membeku dan Semangat Pejuang
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Frost Warlord adalah tim e-sport Mobile Legends yang berkomitmen menjadi yang terdepan di panggung kompetitif. 
            Bergabunglah dan asah kemampuanmu bersama kami.
          </p>
          <Link 
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition cursor-pointer"
          >
            Gabung Sekarang dan Tunjukkan Skillmu!
          </Link>
        </div>
      </section>
    </div>
  );
}