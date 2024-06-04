import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Tab from "../components/Tab";
import { Recipe } from "../types/recipe";
import Spinner from "../components/Spinner";
import { RouteParams } from "../types/routeParams";
import RecipeDetails from "../components/RecipeDetails";

function RecipePage() {
  const params = useParams<RouteParams>();

  const [activeTab, setActiveTab] = useState("ingredients");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipeInfo = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.spoonacular.com/recipes/${
            params.id
          }/information?apiKey=${import.meta.env.VITE_API_KEY}`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch recipe, ${res.statusText}`);
        }

        const data = await res.json();

        setRecipe(data);
      } catch (error) {
        toast.info("Failed to fetch recipe, try again later!", {
          position: "top-center",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    getRecipeInfo();
  }, [params.id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className=" ">
      <div className="max-w-7xl mx-2 lg:mx-auto my-6 flex flex-col md:flex-row gap-4">
        {recipe && (
          <>
            <div className="flex flex-col items-center space-y-4 w-full md:w-1/2">
              <h2 className="text-xl md:text-3xl font-bold">{recipe.title}</h2>
              <img src={recipe.image} alt={recipe.title} loading="lazy" />
            </div>

            <div className="py-2 w-full md:w-1/2">
              <div className="space-x-6" role="tablist">
                <Tab
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  tabName="ingredients"
                />
                <Tab
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  tabName="instructions"
                />
              </div>

              <div className="p-4 md:py-4">
                <RecipeDetails activeTab={activeTab} recipe={recipe} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecipePage;
