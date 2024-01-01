import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { Recipe } from "../types/recipe";

function Dessert() {
  const [veggieRecipes, setVeggieRecipes] = useState<Recipe[]>([]);

  const getVeggieRecipes = async () => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_API_KEY
      }&number=6&tags=dessert`
    );
    const data = await res.json();
    localStorage.setItem("desserts", JSON.stringify(data.recipes));
    setVeggieRecipes(data.recipes);
  };

  useEffect(() => {
    getVeggieRecipes();
  }, []);

  return (
    <div className="my-6 mx-2">
      <h2 className="text-3xl font-semibold">Desserts</h2>
      <small className="text-xs text-gray-500">Swipe to see more</small>

      <Splide
        options={{
          label: "Desserts",
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
        {veggieRecipes.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <div className="relative w-full h-full">
                <div className="bg-black/40 w-full h-full absolute rounded-[2rem] z-10"></div>
                <p className="absolute z-20 text-white bottom-8 left-0 right-0 text-lg text-center">
                  {recipe.title}
                </p>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="rounded-[2rem]"
                />
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}

export default Dessert;
