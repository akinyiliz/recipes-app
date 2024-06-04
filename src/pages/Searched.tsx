import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { Recipe } from "../types/recipe";
import Spinner from "../components/Spinner";
import RecipeCard from "../components/RecipeCard";

function Searched() {
  const params = useParams();

  const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSearchedRecipe = async (query: string) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&query=${query}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch recipes: ${res.statusText}`);
      }

      const data = await res.json();
      setSearchedRecipes(data.results);
    } catch (error) {
      toast.info("Failed to fetch recipe, try again later!", {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchedRecipe(params.query ?? "");
  }, [params.query]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-7xl mx-auto my-6 space-y-4">
      {searchedRecipes.length > 0 ? (
        <>
          <h2 className="text-3xl font-bold px-6 capitalize">
            {params.query} Recipes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
            {searchedRecipes.map((recipe) => {
              return (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                />
              );
            })}
          </div>
        </>
      ) : (
        <h2 className="text-2xl font-medium px-6">
          No results found for "{params.query}" recipes
        </h2>
      )}
    </div>
  );
}

export default Searched;
