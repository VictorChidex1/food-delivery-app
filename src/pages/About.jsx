import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Globe, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import img1 from "../assets/images/Agbaho-victor.png";
import img2 from "../assets/images/Onyi.jpg";
import img3 from "../assets/images/Minimi.jpg";
import img4 from "../assets/images/about-story.png";
// 1. IMPORT THE HERO IMAGE
import heroBg from "../assets/images/about-hero.png";

const About = () => {
  const stats = [
    { label: "Happy Customers", value: "50k+", icon: Users },
    { label: "Restaurants Partnered", value: "500+", icon: Globe },
    { label: "Cities Covered", value: "12", icon: Target },
    { label: "Awards Won", value: "5", icon: Award },
  ];

  const team = [
    {
      name: "Victor Chidera",
      role: "Founder & CEO",
      img: img1,
    },
    {
      name: "Onyi Esther",
      role: "Head of Operations",
      img: img2,
    },
    {
      name: "Miriam Jakes",
      role: "CTO",
      img: img3,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-20 flex flex-col">
      {/* 1. HERO SECTION (Revamped) */}
      <section className="relative bg-gray-900 text-white py-32 px-6 overflow-hidden">
        {/* Background Image & Blending Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="About Hero"
            className="w-full h-full object-cover opacity-40"
          />
          {/* Top Gradient (Darkens header area) */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-transparent to-gray-900" />
          {/* Radial Gradient (Focuses attention on center text) */}
          <div className="absolute inset-0 bg-radial-at-c from-transparent to-gray-900/90" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-2xl"
          >
            We deliver more than <br /> just{" "}
            <span className="text-[#FF5200]">food.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            FoodFlow is on a mission to transform the way Africa eats. We
            connect hungry hearts with the best local flavors, delivered fast
            and fresh.
          </motion.p>
        </div>
      </section>

      {/* 2. OUR STORY (Split Layout) */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]"
          >
            <img
              src={img4}
              alt="Our Story"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#FF5200] font-bold tracking-wider uppercase text-sm mb-2 block">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              From a simple idea to a nationwide movement.
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              It started in 2023 with a simple observation: finding good food
              shouldn't be hard. We noticed that while there were amazing local
              restaurants, connecting them to customers was a logistical
              nightmare.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Today, FoodFlow operates in over 12 cities, empowering thousands
              of riders and restaurant partners to grow their businesses while
              serving millions of meals.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  Fast Delivery
                </h4>
                <p className="text-sm text-gray-500">Average time 35 mins</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">Fresh Food</h4>
                <p className="text-sm text-gray-500">Direct from kitchen</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. STATS BANNER */}
      <section className="bg-[#FF5200] py-16 px-6 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <stat.icon size={24} />
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-1">
                {stat.value}
              </h3>
              <p className="text-white/80 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. TEAM SECTION */}
      <section className="py-20 px-6 bg-gray-50 flex-grow">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Meet the Minds
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16">
            The passionate people driving the revolution in food tech.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-gray-50 group-hover:border-[#FF5200] transition-colors">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-xl text-gray-900">
                  {member.name}
                </h3>
                <p className="text-[#FF5200] font-medium text-sm mb-4">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm">
                  Passionate about building scalable systems and great food
                  experiences.
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to join the team?
            </h3>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              View Open Roles <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <Footer />
    </div>
  );
};

export default About;
