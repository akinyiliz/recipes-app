import { Link } from "react-router-dom";
import { Recipe } from "../types/recipe";

function RecipeCard({ id, title, image }: Recipe) {
  return (
    <Link to={"/recipe/" + id} className="relative w-full h-full" key={id}>
      <div className="bg-black/40 w-full h-full absolute rounded-[2rem] z-10"></div>
      <p className="absolute z-20 text-white bottom-8 left-0 right-0 text-lg text-center">
        {title}
      </p>
      <img src={image} alt={title} className="rounded-[2rem] w-full h-full" />
    </Link>
  );
}

export default RecipeCard;
