// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { FC } from "react";

import { Recipe } from "../types/recipe";
import RecipeCard from "./RecipeCard";

interface CarouselProps {
  recipes: Recipe[];
}

const Carousel: FC<CarouselProps> = ({ recipes }) => {
  return (
    <Splide
      options={{
        label: "Popular Recipes",
        type: "loop",
        autoplay: true,
        interval: 3000,
        perPage: 3,
        drag: "true",
        gap: "2rem",
        pagination: false,
        arrows: false,
        lazyLoad: true,
        pauseOnHover: false,
        resetProgess: false,
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
      {recipes.map((recipe) => {
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
  );
};

export default Carousel;
