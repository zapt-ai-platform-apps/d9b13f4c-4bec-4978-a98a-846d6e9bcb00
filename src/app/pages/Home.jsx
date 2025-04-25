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
      title: "Join Our Next Tournament",
      description: "Participate in the upcoming Mobile Legends championship!"
    },
    {
      id: 2,
      image: "https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/frost_warlord_banner2.png?width=512&height=512",
      title: "Weekly Training Schedule",
      description: "Check out our latest practice schedule for team members"
    },
    {
      id: 3,
      image: "https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/frost_warlord_banner3.png?width=512&height=512",
      title: "Team Highlights",
      description: "Watch our best moments from recent tournaments"
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
                  Join Our Team
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
            <h2 className="text-3xl font-bold text-blue-400 mb-4">About Frost Warlord</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Frost Warlord is a professional Mobile Legends esports team committed to excellence in competitive gaming. 
              Our team comprises skilled players who are passionate about the game and dedicated to reaching the top of the competitive scene.
            </p>
          </div>

          {/* Vision and Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 p-8 rounded-lg border border-blue-900">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Our Vision</h3>
              <p className="text-gray-300">
                To become a leading force in the Mobile Legends competitive scene, known for our strategic gameplay, 
                teamwork, and community engagement. We aim to inspire the next generation of esports players.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg border border-blue-900">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To create a supportive environment where players can develop their skills, 
                build strong team dynamics, and achieve success in tournaments while fostering a positive community.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg border border-blue-900 text-center">
              <FaGamepad className="text-blue-400 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Professional Training</h3>
              <p className="text-gray-300">
                Structured training sessions led by experienced coaches to enhance individual skills and team coordination.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg border border-blue-900 text-center">
              <FaTrophy className="text-blue-400 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Tournament Participation</h3>
              <p className="text-gray-300">
                Regular participation in local and international tournaments to gain competitive experience.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg border border-blue-900 text-center">
              <FaUsers className="text-blue-400 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Community Building</h3>
              <p className="text-gray-300">
                A supportive community of players, fans, and enthusiasts who share a passion for Mobile Legends.
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