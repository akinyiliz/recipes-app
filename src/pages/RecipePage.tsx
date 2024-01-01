import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Recipe } from "../types/recipe";

function RecipePage() {
  const params = useParams();

  const [activeTab, setActiveTab] = useState("ingredients");

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const getRecipeInfo = async () => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );

    const data = await res.json();

    setRecipe(data);
  };

  useEffect(() => {
    getRecipeInfo();
  }, [params.id]);

  return (
    <div className="max-w-7xl h- mx-2 lg:mx-auto my-6 flex flex-col md:flex-row gap-4">
      {!recipe && <div className="h-80 font-bold text-lg">Loading...</div>}

      {recipe && (
        <>
          <div className="flex flex-col items-center space-y-4 w-full md:w-1/2">
            <h2 className="text-xl md:text-3xl font-bold">{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
          </div>

          <div className="py-2 w-full md:w-1/2">
            <div className="space-x-6">
              <button
                className={`border border-black w-32 h-12 cursor-pointer ${
                  activeTab === "ingredients" && "bg-black text-white"
                }`}
                onClick={() => setActiveTab("ingredients")}
              >
                Ingredients
              </button>
              <button
                className={`border border-black w-32 h-12 cursor-pointer ${
                  activeTab === "instructions" && "bg-black text-white"
                }`}
                onClick={() => setActiveTab("instructions")}
              >
                Instructions
              </button>
            </div>

            <div className="p-4 md:py-4">
              {activeTab === "ingredients" && (
                <ul>
                  {recipe.extendedIngredients &&
                    recipe.extendedIngredients.map((ingredient, index) => {
                      return (
                        <li key={index} className="list-disc">
                          {ingredient.original}
                        </li>
                      );
                    })}
                </ul>
              )}

              {activeTab === "instructions" && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: recipe.instructions as string,
                  }}
                ></p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipePage;
