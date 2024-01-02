import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import { Recipe } from "../types/recipe";
import RecipeCard from "../components/RecipeCard";

function Cuisine() {
  const params = useParams();

  const [cuisines, setCuisines] = useState<Recipe[]>([]);

  const fetchCuisines = async (cuisine: string) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&cuisine=${cuisine}`
    );

    const data = await res.json();

    setCuisines(data.results);
  };

  useEffect(() => {
    fetchCuisines(params.name ?? "");
  }, [params.name]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto my-6 space-y-4">
        <h2 className="text-3xl font-bold px-6">{params.name} Cuisines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
          {cuisines.map((cuisine) => {
            return (
              <RecipeCard
                key={cuisine.id}
                id={cuisine.id}
                title={cuisine.title}
                image={cuisine.image}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default Cuisine;
