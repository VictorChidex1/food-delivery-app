import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { restaurants } from '../data/mockData'; 
import { Star, Clock, MapPin, ArrowLeft, Plus, Minus, Lock, Globe, Truck } from 'lucide-react'; // Added Truck icon
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ==========================================
// SHADCN UI COMPONENTS
// ==========================================

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-[#FF5200] text-white hover:bg-orange-600 shadow-sm",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    icon: "h-10 w-10",
    iconSm: "h-8 w-8",
  };
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "border-transparent bg-[#FF5200] text-white hover:bg-orange-600/80",
  };
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors", variants[variant], className)} {...props} />
  );
};

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow-sm bg-white", className)} {...props} />
));

const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <div
    ref={ref}
    role={decorative ? "none" : "separator"}
    aria-orientation={orientation}
    className={cn("shrink-0 bg-gray-200", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
    {...props}
  />
));

// ==========================================
// MAIN RESTAURANT PAGE COMPONENT
// ==========================================

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState({});
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Menu'); 
  const [activeCategory, setActiveCategory] = useState('All');

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    const found = restaurants.find(r => r.id === parseInt(id));
    setRestaurant(found);
  }, [id]);

  const addToCart = (itemId) => {
    if (!user) {
      if (window.confirm("You must be logged in to order food. Go to Login?")) navigate('/login');
      return;
    }
    setCart(prev => {
      const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      localStorage.setItem('cart', JSON.stringify(newCart)); 
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 0) {
        newCart[itemId] -= 1;
        if (newCart[itemId] === 0) delete newCart[itemId];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  if (!restaurant) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const categories = ['All', ...new Set(restaurant.menu?.map(item => item.category || 'Mains'))];
  const filteredMenu = activeCategory === 'All' ? restaurant.menu : restaurant.menu.filter(item => (item.category || 'Mains') === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50/50 pb-24 font-sans">
      
      {/* HERO SECTION */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden bg-gray-900">
        <motion.img 
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }}
          src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover opacity-50" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        <Link to="/" className="absolute top-6 left-6 z-10">
          <Button variant="secondary" size="icon" className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-0">
            <ArrowLeft size={20} />
          </Button>
        </Link>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-3 bg-orange-600 text-white hover:bg-orange-700 border-0 uppercase tracking-wider px-3 py-1">
              <Globe size={10} className="mr-1" /> Nationwide Delivery
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-200">
              <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
                {restaurant.rating} <Star size={10} className="ml-1 fill-current" />
              </div>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {restaurant.deliveryTime}</span>
              
              {/* UPDATED LOCATION DISPLAY */}
              <span className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
                <MapPin size={14} className="text-[#FF5200]" /> 
                <span>Nationwide Delivery</span>
              </span>
              
              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="text-gray-300 hidden sm:inline">{restaurant.categories.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY TABS */}
      <div className="sticky top-0 md:top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-8 overflow-x-auto no-scrollbar">
          {['Menu', 'About', 'Reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative py-4 text-sm font-medium transition-colors hover:text-primary",
                activeTab === tab ? "text-foreground font-semibold" : "text-muted-foreground"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5200]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          
          {/* MENU CONTENT */}
          {activeTab === 'Menu' && (
            <motion.div key="menu" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              
              <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(cat)}
                    className={cn("rounded-full border px-4 shadow-none", activeCategory === cat ? "bg-gray-900 hover:bg-gray-800 text-white" : "bg-white")}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {!user && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8">
                  <Card className="border-orange-100 bg-orange-50/50">
                    <div className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-orange-800">
                        <div className="bg-orange-100 p-2 rounded-full"><Lock size={16} /></div>
                        <span className="font-medium text-sm">Log in to start ordering!</span>
                      </div>
                      <Link to="/login"><Button size="sm" className="font-bold">Log In</Button></Link>
                    </div>
                  </Card>
                </motion.div>
              )}

              <motion.div variants={containerVariants} initial="hidden" animate="visible" key={activeCategory} className="grid md:grid-cols-2 gap-4">
                {filteredMenu?.map((item) => (
                  <motion.div variants={itemVariants} key={item.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow border-gray-100 group">
                      <div className="p-4 flex gap-4">
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#FF5200] transition-colors">{item.name}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2 mb-3 leading-relaxed">{item.description || "Freshly prepared with premium ingredients."}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="font-bold text-gray-900">₦{item.price.toLocaleString()}</p>
                            <div className="flex items-center gap-2">
                              {cart[item.id] ? (
                                <>
                                  <Button variant="outline" size="iconSm" onClick={() => removeFromCart(item.id)} className="h-8 w-8 rounded-full border-gray-200 text-gray-600">
                                    <Minus size={14} />
                                  </Button>
                                  <span className="text-sm font-bold w-4 text-center">{cart[item.id]}</span>
                                </>
                              ) : null}
                              <Button 
                                size="iconSm" 
                                onClick={() => addToCart(item.id)} 
                                disabled={!user}
                                className={cn("h-8 w-8 rounded-full shadow-none", user ? "bg-[#FF5200]" : "bg-gray-200 text-gray-400")}
                              >
                                {user ? <Plus size={14} /> : <Lock size={12} />}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="w-28 h-28 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'About' && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <Card>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About {restaurant.name}</h2>
                  <p className="text-gray-600 leading-7 mb-6">{restaurant.about || "Experience fine dining with us."}</p>
                  <Separator className="mb-6" />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 flex items-center gap-2"><Clock size={16} className="text-[#FF5200]"/> Opening Hours</h3>
                      <p className="text-sm text-muted-foreground ml-6">{restaurant.openingHours || "9:00 AM - 10:00 PM"}</p>
                    </div>
                    
                    {/* UPDATED LOCATION INFO */}
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 flex items-center gap-2"><Truck size={16} className="text-[#FF5200]"/> Delivery Range</h3>
                      <div className="ml-6">
                        <p className="text-sm font-bold text-gray-900">Nationwide</p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'Reviews' && (
            <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <Card className="mb-6 bg-orange-50/50 border-orange-100">
                <div className="p-6 flex items-center gap-6">
                  <div className="text-center">
                    <span className="text-4xl font-extrabold text-gray-900 tracking-tighter">{restaurant.rating}</span>
                    <div className="flex text-[#FF5200] mt-1 gap-0.5 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(restaurant.rating) ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">{restaurant.reviews} ratings</p>
                  </div>
                  <Separator orientation="vertical" className="h-12 bg-orange-200" />
                  <div>
                    <p className="font-bold text-gray-900">Overall Rating</p>
                    <p className="text-sm text-gray-600">Recommended by 95% of customers</p>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                {restaurant.reviewsList?.map((review, i) => (
                  <Card key={i} className="border-gray-100">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                            {review.user.charAt(0)}
                          </div>
                          <span className="font-semibold text-sm">{review.user}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FLOATING CART ACTION */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-0 w-full px-4 z-50 flex justify-center"
          >
            <Button 
              onClick={() => navigate('/checkout')}
              className="h-14 pl-4 pr-6 rounded-full shadow-xl bg-[#FF5200] hover:bg-orange-600 text-base gap-4"
            >
              <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">{totalItems}</span>
              <span className="font-bold">View Order</span>
              <Separator orientation="vertical" className="h-6 bg-white/20" />
              <span className="font-bold">
                ₦{Object.keys(cart).reduce((total, itemId) => {
                  const item = restaurant.menu?.find(i => i.id === parseInt(itemId));
                  return total + (item ? item.price * cart[itemId] : 0);
                }, 0).toLocaleString()}
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Restaurant;