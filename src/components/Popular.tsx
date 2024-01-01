import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import RecipeCard from "./RecipeCard";
import { Recipe } from "../types/recipe";

function Popular() {
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);

  const getPopularRecipes = async () => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_API_KEY
      }&number=6`
    );
    const data = await res.json();
    setPopularRecipes(data.recipes);
  };

  useEffect(() => {
    getPopularRecipes();
  }, []);

  return (
    <div className="my-6 mx-2">
      <h2 className="text-3xl font-semibold">Popular Recipes</h2>
      <small className="text-xs text-gray-500">Swipe to see more</small>

      <Splide
        options={{
          label: "Popular Recipes",
          perPage: 3,
          drag: "free",
          gap: "2rem",
          pagination: false,
          arrows: false,
          breakpoints: {
            600: {
              perPage: 1,
            },
            1024: {
              perPage: 2,
            },
          },
        }}
        className="w-full h-full md:h-72"
      >
        {popularRecipes.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <RecipeCard
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}

export default Popular;
