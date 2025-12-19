import React, { useState, useEffect } from "react";
import useRestaurants from "../hooks/useRestaurants";
import {
  Star,
  Flame,
  Clock,
  ShieldCheck,
  Truck,
  Heart,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import ScrollToTop from "../components/ScrollToTop";
import { motion } from "framer-motion";
import { useSearch } from "../context/SearchContext";
import RestaurantSkeleton from "../components/RestaurantSkeleton";
import { toast } from "sonner";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Home = () => {
  const { restaurants, loading: isLoading } = useRestaurants();
  const [favorites, setFavorites] = useState([]);

  // 2. PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory } =
    useSearch();

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavs);
  }, []);

  // 3. RESET PAGE ON FILTER CHANGE
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const toggleFavorite = (e, id, name) => {
    e.preventDefault();
    e.stopPropagation();

    let updatedFavs;
    // Ensure both are strings or numbers for comparison
    const favId = id.toString();
    if (favorites.includes(favId)) {
      updatedFavs = favorites.filter((fid) => fid !== favId);
      toast.info(`${name} removed from favorites`);
    } else {
      updatedFavs = [...favorites, favId];
      toast.success(`${name} saved to favorites`);
    }

    setFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  // --- FILTER LOGIC ---
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.categories.some((cat) => cat.toLowerCase().includes(query));

    if (activeCategory === "All") return matchesSearch;

    const hasCategory = (keyword) =>
      restaurant.categories.some(
        (cat) => cat.toLowerCase() === keyword.toLowerCase()
      );

    let matchesCategory = false;

    switch (activeCategory) {
      case "🔥 Rice":
        matchesCategory = hasCategory("Rice");
        break;
      case "🍖 Suya":
        matchesCategory = hasCategory("Suya") || hasCategory("Grills");
        break;
      case "🍲 Soups":
        matchesCategory = hasCategory("Soup");
        break;
      case "🥣 Amala":
        matchesCategory = hasCategory("Amala");
        break;
      case "🥗 Abacha":
        matchesCategory = hasCategory("Abacha");
        break;
      case "🍗 Grilled Chicken":
        matchesCategory = hasCategory("Chicken") || hasCategory("Grills");
        break;
      default:
        matchesCategory = true;
    }

    return matchesSearch && matchesCategory;
  });

  // 4. CALCULATE SLICE
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRestaurants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  // 5. HANDLER FOR PAGE CHANGE (WITH SCROLL)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const gridElement = document.getElementById("restaurant-grid");
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const categories = [
    "All",
    "🔥 Rice",
    "🍖 Suya",
    "🍲 Soups",
    "🥣 Amala",
    "🥗 Abacha",
    "🍗 Grilled Chicken",
  ];

  return (
    <div>
      <Hero />

      {/* STICKY CATEGORY BAR */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="flex items-center gap-1 text-xs font-extrabold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full whitespace-nowrap border border-orange-100">
              <Flame size={14} fill="currentColor" />
              TRENDING
            </span>
            {categories.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(item)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
                  activeCategory === item
                    ? "bg-gray-900 text-white border-gray-900 shadow-md"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* VALUE PROPS */}
      <div className="bg-orange-50 py-16 border-b border-orange-100/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4 text-orange-500">
              <Clock size={32} />
            </div>
            <h3 className="font-bold text-lg text-gray-900">
              Super Fast Delivery
            </h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">
              From the kitchen to your doorstep in minutes.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4 text-green-500">
              <ShieldCheck size={32} />
            </div>
            <h3 className="font-bold text-lg text-gray-900">
              100% Secure Payment
            </h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">
              Pay with Card, Transfer or USSD safely.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4 text-blue-500">
              <Truck size={32} />
            </div>
            <h3 className="font-bold text-lg text-gray-900">
              Nationwide Reach
            </h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">
              We cover major cities across Nigeria.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN RESTAURANT GRID */}
      <div id="restaurant-grid" className="p-4 max-w-7xl mx-auto pb-24 mt-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : "Restaurants near you"}
          </h2>
          <p className="text-gray-500 text-sm">
            {isLoading
              ? "Finding the best spots..."
              : `Showing ${currentItems.length} of ${filteredRestaurants.length} spots`}
          </p>
        </div>

        {/* LOADING LOGIC */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <RestaurantSkeleton key={n} />
            ))}
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              No restaurants found
            </h3>
            <p className="text-gray-500 mt-2">
              Try selecting a different category or search term.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 text-[#FF5200] font-bold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={activeCategory + searchQuery + currentPage}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* USE currentItems instead of filteredRestaurants */}
              {currentItems.map((restaurant) => {
                const isFavorite = favorites.includes(restaurant.id.toString());
                return (
                  <Link
                    to={`/restaurant/${restaurant.id}`}
                    key={restaurant.id}
                    className="block group h-full"
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-100 h-full flex flex-col relative"
                    >
                      <button
                        onClick={(e) =>
                          toggleFavorite(e, restaurant.id, restaurant.name)
                        }
                        className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:scale-110 transition-transform"
                      >
                        <Heart
                          size={18}
                          className={
                            isFavorite ? "text-red-500" : "text-gray-400"
                          }
                          fill={isFavorite ? "currentColor" : "none"}
                        />
                      </button>

                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                          <Clock size={12} /> {restaurant.deliveryTime}
                        </div>
                        {restaurant.tags?.includes("Nationwide Delivery") && (
                          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-md text-[10px] font-bold shadow-sm uppercase tracking-wider">
                            Nationwide
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[#FF5200] transition-colors">
                            {restaurant.name}
                          </h3>
                          <div className="flex items-center bg-green-50 px-2 py-1 rounded text-green-700 text-xs font-bold border border-green-100">
                            <span className="mr-1">{restaurant.rating}</span>
                            <Star size={10} fill="currentColor" />
                          </div>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mb-4">
                          <span className="truncate">
                            {restaurant.categories.join(" • ")}
                          </span>
                        </div>
                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-medium text-gray-400">
                          <span className="flex items-center gap-1 text-gray-500">
                            <Truck size={14} /> Min: ₦
                            {restaurant.minOrder.toLocaleString()}
                          </span>
                          <span className="text-[#FF5200] font-bold group-hover:underline">
                            View Menu
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>

            {/* 6. CLEAN REUSABLE COMPONENT */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      <Footer />
      {/* 2. ADD COMPONENT HERE */}
      <ScrollToTop />
    </div>
  );
};

export default Home;
