import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../modules/auth/AuthProvider';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaUserPlus, FaSignInAlt, FaTrophy, FaUsers, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';

export default function Home() {
  const { currentUser } = useAuth();

  const carouselImages = [
    {
      src: "https://1.bp.blogspot.com/-VrKoU5ZYI3o/YDK7Sf_V7NI/AAAAAAAADCM/AUqLH4N9iJU2vO7jdlDI3QUYVjZOZ4TBACLcBGAsYHQ/s2048/Mobile%2BLegends%2BBang%2BBang%2BWallpaper%2BHD%2B4K%2BPC.jpg",
      alt: "Mobile Legends Banner"
    },
    {
      src: "https://cdn.oneesports.gg/cdn-data/2023/03/MLBB_Season28_AllHeroes.jpg",
      alt: "Mobile Legends Heroes"
    },
    {
      src: "https://cdn1.dotesports.com/wp-content/uploads/2021/12/09070121/b3f08-16390461522151-1920.jpg",
      alt: "Mobile Legends Tournament"
    }
  ];

  const features = [
    {
      icon: <FaTrophy className="text-5xl mb-4 text-yellow-400" />,
      title: "Competitive Tournaments",
      description: "Participate in weekly and monthly tournaments with our team and win exciting prizes."
    },
    {
      icon: <FaUsers className="text-5xl mb-4 text-blue-400" />,
      title: "Join Our Community",
      description: "Connect with like-minded gamers, form teams, and improve your gaming skills together."
    },
    {
      icon: <FaCalendarAlt className="text-5xl mb-4 text-green-400" />,
      title: "Regular Practice Sessions",
      description: "Participate in scheduled training sessions with experienced coaches and mentors."
    },
    {
      icon: <FaNewspaper className="text-5xl mb-4 text-purple-400" />,
      title: "Stay Updated",
      description: "Get the latest news, updates, and strategies about Mobile Legends from our experts."
    }
  ];

  const heroes = [
    {
      name: "Gusion",
      role: "Assassin",
      image: "https://static.wikia.nocookie.net/mobile-legends/images/c/c8/Hero-Gusion.png"
    },
    {
      name: "Layla",
      role: "Marksman",
      image: "https://static.wikia.nocookie.net/mobile-legends/images/8/8f/Hero-Layla.png"
    },
    {
      name: "Tigreal",
      role: "Tank",
      image: "https://static.wikia.nocookie.net/mobile-legends/images/a/af/Hero-Tigreal.png"
    },
    {
      name: "Nana",
      role: "Support",
      image: "https://static.wikia.nocookie.net/mobile-legends/images/e/eb/Hero-Nana.png"
    }
  ];

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section with Carousel */}
      <section className="pb-10">
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          showStatus={false}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="relative h-[500px]">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex flex-col justify-end items-center text-center px-4 pb-20">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Welcome to Frost Warlord <span className="text-blue-400">Esports</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mb-8">
                  Join our team of Mobile Legends players and participate in tournaments, scrimmages, and training sessions
                </p>
                {currentUser ? (
                  <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition cursor-pointer">
                    Go to Dashboard
                  </Link>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition flex items-center justify-center cursor-pointer">
                      <FaUserPlus className="mr-2" /> Register
                    </Link>
                    <Link to="/login" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition flex items-center justify-center cursor-pointer">
                      <FaSignInAlt className="mr-2" /> Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
            Why Join Our Team?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-700 p-6 rounded-lg text-center hover:bg-gray-600 transition duration-300">
                {feature.icon}
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Heroes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
            Featured Mobile Legends Heroes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {heroes.map((hero, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition duration-300">
                <img 
                  src={`https://wallpapercave.com/wp/wp10428248.jpg`} 
                  alt={hero.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{hero.name}</h3>
                  <p className="text-blue-400">{hero.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-900 bg-opacity-30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your Mobile Legends journey with Frost Warlord Esports today and elevate your gaming experience
          </p>
          {currentUser ? (
            <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition cursor-pointer">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition cursor-pointer">
              Join Now
            </Link>
          )}
        </div>
      </section>

      {/* Made with ZAPT */}
      <div className="text-center py-4">
        <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-400 text-sm">
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}