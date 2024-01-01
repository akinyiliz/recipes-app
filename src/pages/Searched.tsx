import { Recipe } from "../types/recipe";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

function Searched() {
  const params = useParams();

  const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>([]);

  const fetchSearchedRecipe = async (query: string) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&query=${query}`
    );

    const data = await res.json();
    setSearchedRecipes(data.results);
  };

  useEffect(() => {
    fetchSearchedRecipe(params.query ?? "");
  }, [params.query]);
  return (
    <div className="max-w-7xl mx-auto my-6 space-y-4">
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
    </div>
  );
}

export default Searched;
