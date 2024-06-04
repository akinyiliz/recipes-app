import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

import Spinner from "./Spinner";
import Carousel from "./Carousel";
import { Recipe } from "../types/recipe";

function Popular() {
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const getPopularRecipes = useCallback(async () => {
    setLoading(true);

    try {
      const storedRecipes = localStorage.getItem("popular");

      if (storedRecipes) {
        setPopularRecipes(JSON.parse(storedRecipes));
      } else {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${
            import.meta.env.VITE_API_KEY
          }&number=6`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch recipes: ${res.statusText}`);
        }

        const data = await res.json();
        setPopularRecipes(data.recipes);
        localStorage.setItem("popular", JSON.stringify(data.recipes));
      }
    } catch (error) {
      toast.info("Failed to fetch recipes, try again later!", {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPopularRecipes();
  }, [getPopularRecipes]);

  return (
    <div className="my-6 mx-2">
      <h2 className="text-3xl font-semibold">Popular Recipes</h2>
      <small className="text-xs text-gray-500">Swipe to see more</small>

      {loading ? <Spinner /> : <Carousel recipes={popularRecipes} />}
    </div>
  );
}

export default Popular;
