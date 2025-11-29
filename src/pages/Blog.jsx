import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
// IMPORT DATA
import { blogPosts } from '../data/blogData';

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* HERO HEADER */}
      <div className="bg-gray-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5200] rounded-full blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#FF5200] font-bold tracking-widest uppercase text-xs mb-2 block"
          >
            The FoodFlow Journal
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            Stories from the <span className="text-[#FF5200]">Kitchen</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Explore the latest news, food guides, and behind-the-scenes stories from Nigeria's fastest delivery network.
          </motion.p>
        </div>
      </div>

      {/* BLOG GRID */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            // WRAP IN LINK TO DYNAMIC ROUTE
            <Link to={`/blog/${post.id}`} key={post.id}>
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group cursor-pointer"
              >
                <div className="h-52 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#FF5200] flex items-center gap-1 shadow-sm">
                    <Tag size={12} /> {post.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF5200] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-gray-700">{post.author}</span>
                    </div>
                    
                    <span className="text-[#FF5200] text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>

      {/* NEWSLETTER SECTION */}
      <div className="bg-orange-50 border-y border-orange-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hungry for updates?</h2>
          <p className="text-gray-500 mb-8">Subscribe to our newsletter to get the latest food trends and promo codes delivered to your inbox.</p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#FF5200] focus:ring-2 focus:ring-orange-100 transition-all"
            />
            <button className="bg-[#FF5200] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;