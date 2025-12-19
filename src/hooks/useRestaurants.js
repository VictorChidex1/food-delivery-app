import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Real-time listener for restaurants
    const unsubscribe = onSnapshot(
      collection(db, "restaurants"),
      (snapshot) => {
        try {
          const restaurantList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRestaurants(restaurantList);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching restaurants:", err);
          setError(err);
          setLoading(false);
        }
      },
      (err) => {
        console.error("Error fetching restaurants:", err);
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { restaurants, loading, error };
};

export default useRestaurants;
