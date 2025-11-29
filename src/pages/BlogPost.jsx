import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.id === parseInt(id));

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
        <Link to="/blog" className="text-[#FF5200] font-bold hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-[#FF5200] z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* HEADER IMAGE */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute top-6 left-4 md:left-8">
          <Link to="/blog" className="flex items-center gap-2 text-white/90 hover:text-white bg-black/30 backdrop-blur-md px-4 py-2 rounded-full transition-all hover:bg-black/50">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <span className="bg-[#FF5200] text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-200 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={14} />
                </div>
                {post.author}
              </div>
              <span className="hidden md:inline">•</span>
              <div className="flex items-center gap-2">
                <Calendar size={16} /> {post.date}
              </div>
              <span className="hidden md:inline">•</span>
              <div className="flex items-center gap-2">
                <Clock size={16} /> {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-[1fr_auto] gap-12">
        
        {/* Main Text */}
        <article className="prose prose-lg prose-orange max-w-none">
          {/* We use dangerouslySetInnerHTML to render the HTML string from data */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Sidebar (Share) */}
        <div className="hidden md:block">
          <div className="sticky top-24 space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Share</p>
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
              <Facebook size={20} />
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-sky-50 hover:text-sky-500 transition-colors">
              <Twitter size={20} />
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
              <Linkedin size={20} />
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-[#FF5200] transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* RELATED POSTS */}
      <div className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">More Stories</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts
              .filter(p => p.id !== post.id) // Don't show current post
              .slice(0, 3) // Show only 3
              .map(related => (
                <Link to={`/blog/${related.id}`} key={related.id} className="group cursor-pointer">
                  <div className="h-48 rounded-xl overflow-hidden mb-4">
                    <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="text-[#FF5200] text-xs font-bold uppercase tracking-wide">{related.category}</span>
                  <h4 className="text-lg font-bold text-gray-900 mt-2 group-hover:text-[#FF5200] transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;