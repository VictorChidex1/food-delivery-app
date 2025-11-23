import img1 from '../assets/images/restaurant1.png';
import img2 from '../assets/images/restaurant2.png';
import img3 from '../assets/images/restaurant3.png';
import img4 from '../assets/images/restaurant4.png';
import img5 from '../assets/images/restaurant5.png';
import img6 from '../assets/images/restaurant6.png';
import img7 from '../assets/images/restaurant7.png';
import img8 from '../assets/images/restaurant8.png';
import img9 from '../assets/images/restaurant9.png';
import img10 from '../assets/images/restaurant10.png';
import img11 from '../assets/images/restaurant11.png';
import img12 from '../assets/images/restaurant12.png';

export const restaurants = [
  {
    id: 1,
    name: "Burger & Bliss",
    rating: 4.8,
    reviews: "1.2k",
    deliveryTime: "25-35 min",
    minOrder: 3500,
    image: img1,
    categories: ["Burgers", "Fast Food"],
    city: "Lagos",
    address: "12 Admiralty Way, Lekki Phase 1",
    openingHours: "10:00 AM - 11:00 PM",
    about: "The juiciest gourmet burgers in Lagos. We use 100% grass-fed beef and our secret family sauce.",
    tags: ["Halal", "Outdoor Seating", "Free Wifi"],
    menu: [
     
      { id: 102, name: "BBQ Bacon Burger", price: 5500, description: "Smoked bacon, BBQ sauce, onion rings", image: img1, category: "Mains" },
     
    ]
  },
  {
    id: 2,
    name: "Native Fisherman Soup",
    rating: 4.9,
    reviews: "950",
    deliveryTime: "30-45 min",
    minOrder: 5000,
    image: img2,
    categories: ["African", "Seafood"],
    city: "Port Harcourt",
    address: "GRA Phase 2, Port Harcourt",
    openingHours: "11:00 AM - 10:00 PM",
    about: "Authentic Rivers State cuisine prepared by native chefs. Experience the true taste of the Niger Delta.",
    tags: ["Nationwide Delivery", "Fresh Catch", "Spicy"], // Added Nationwide tag
    menu: [
      { id: 201, name: "Fisherman Soup", price: 8000, description: "Fresh seafood soup native to Rivers", image: img2, category: "Soups" },
    ]
  },
  {
    id: 3,
    name: "Grill House",
    rating: 4.6,
    reviews: "2.1k",
    deliveryTime: "20-30 min",
    minOrder: 9000,
    image: img3,
    categories: ["Grills", "Suya"],
    city: "Abuja",
    address: "Wuse 2, Abuja",
    openingHours: "12:00 PM - 11:00 PM",
    about: "The best suya spot in the capital. We grill all night long.",
    tags: ["Nationwide Delivery", "Late Night", "Spicy"],
    menu: [
     
      { id: 301, name: "Grilled Chicken", price: 6000, image: img3, category: "Mains" },
    ]
  },
  {
    id: 4,
    name: "Amala Sky",
    rating: 4.7,
    reviews: "3.5k",
    deliveryTime: "15-25 min",
    minOrder: 3000,
    image: img4,
    categories: ["Local", "Soup"],
    city: "Ibadan",
    address: "Bodija Market Rd",
    openingHours: "9:00 AM - 8:00 PM",
    about: "Fluffy Amala, Gbegiri and Ewedu served piping hot.",
    tags: ["Nationwide Delivery", "Traditional"],
    menu: [
      { id: 401, name: "Amala & Ewedu", price: 2500, description: "Fluffy Amala with Gbegiri and Ewedu", image: img4, category: "Swallows" },
    ]
  },
  {
    id: 5,
    name: "Abacha Corner",
    rating: 4.8,
    reviews: "2k",
    deliveryTime: "25-40 min",
    minOrder: 2500,
    image: img5,
    categories: ["Salad", "Traditional"],
    city: "Enugu",
    address: "Independence Layout",
    openingHours: "10:00 AM - 8:00 PM",
    about: "African Salad at its finest. Crunchy, spicy, and delicious.",
    tags: ["Nationwide Delivery", "Light Meal"],
    menu: [
      { id: 501, name: "Special Abacha", price: 3000, description: "African Salad with ugba and garden egg", image: img5, category: "Mains" },
    ]
  },
  {
    id: 6,
    name: "Banga Delight",
    rating: 4.9,
    reviews: "1.1k",
    deliveryTime: "40-50 min",
    minOrder: 6000,
    image: img6,
    categories: ["Soup", "Swallow"],
    city: "Delta",
    address: "Warri Central",
    openingHours: "10:00 AM - 9:00 PM",
    about: "Rich palm nut soup served with your choice of starch or eba.",
    tags: ["Nationwide Delivery", "Traditional"],
    menu: [
      { id: 601, name: "Banga & Starch", price: 6500, description: "Rich palm nut soup with fresh fish", image: img6, category: "Swallows" },
    ]
  },
  {
    id: 7,
    name: "Pounded Yam with Egusi Soup",
    rating: 4.5,
    reviews: "1.5k",
    deliveryTime: "30-40 min",
    minOrder: 4000,
    image: img7,
    categories: ["Traditional", "Soup"],
    city: "Benin",
    address: "Airport Rd",
    openingHours: "9:00 AM - 9:00 PM",
    about: "Smooth pounded yam paired with rich, chunky egusi soup.",
    tags: ["Nationwide Delivery", "Heavy Meal"],
    menu: [
      { id: 701, name: "Pounded Yam & Egusi", price: 5000, image: img7, category: "Swallows" },
    ]
  },
  {
    id: 8,
    name: "Owerri Soup",
    rating: 4.7,
    reviews: "950",
    deliveryTime: "35-45 min",
    minOrder: 5500,
    image: img8,
    categories: ["Soup", "Local"],
    city: "Owerri",
    address: "Wetheral Rd",
    openingHours: "10:00 AM - 9:00 PM",
    about: "The legendary Ofe Owerri, prepared with assorted meats and stockfish.",
    tags: ["Nationwide Delivery", "Spicy"],
    menu: [
      { id: 801, name: "Ofe Owerri", price: 7000, description: "Assorted meat soup", image: img8, category: "Soups" },
    ]
  },
  {
    id: 9,
    name: "Ofada Rice and Ayamase Stew",
    rating: 4.7,
    reviews: "1.4k",
    deliveryTime: "35-45 min",
    minOrder: 6000,
    image: img9,
    categories: ["African", "Local"],
    city: "Lagos",
    address: "Ikoyi",
    openingHours: "10:00 AM - 9:00 PM",
    about: "Spicy Ayamase stew with local Ofada rice. A Lagos classic.",
    tags: ["Nationwide Delivery", "Spicy"],
    menu: [
      { id: 901, name: "Ofada Rice Special", price: 6000, description: "Served with spicy Ayamase stew and egg", image: img9, category: "Mains" },
    ]
  },
  {
    id: 10,
    name: "White Rice and Stew",
    rating: 4.7,
    reviews: "3k",
    deliveryTime: "35-45 min",
    minOrder: 5000,
    image: img10,
    categories: ["African", "Local"],
    city: "Lagos",
    address: "Yaba",
    openingHours: "9:00 AM - 10:00 PM",
    about: "Classic Nigerian stew served with fluffy white rice.",
    tags: ["Nationwide Delivery", "Classic"],
    menu: [
      { id: 1001, name: "White Rice & Chicken Stew", price: 5000, description: "Steaming white rice with rich tomato stew", image: img10, category: "Mains" },
    ]
  },
  {
    id: 11,
    name: "Fufu with Ogbono Soup",
    rating: 4.7,
    reviews: "3.3k",
    deliveryTime: "35-45 min",
    minOrder: 4500,
    image: img11,
    categories: ["African", "Local"],
    city: "Lagos",
    address: "Festac",
    openingHours: "10:00 AM - 9:00 PM",
    about: "Draw soup delight served with soft Fufu.",
    tags: ["Nationwide Delivery", "Traditional"],
    menu: [
      { id: 1101, name: "Fufu & Ogbono", price: 4500, description: "Smooth fufu with draw soup and beef", image: img11, category: "Swallows" },
    ]
  },
  {
    id: 12,
    name: "Beans and Plantain (Porridge)",
    rating: 4.7,
    reviews: "4k",
    deliveryTime: "35-45 min",
    minOrder: 3500,
    image: img12,
    categories: ["African", "Local"],
    city: "Lagos",
    address: "45 Bode Thomas St, Surulere",
    openingHours: "8:00 AM - 9:00 PM",
    about: "Legendary beans pottage that tastes just like home. Soft, spicy, and served with perfectly fried dodo.",
    tags: ["Nationwide Delivery", "Vegetarian Options"],
    menu: [
      { id: 1201, name: "Beans Porridge & Plantain", price: 3500, description: "Soft honey beans pottage with fried plantain", image: img12, category: "Mains" },
    ]
  }
];