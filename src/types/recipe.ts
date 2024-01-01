import { Ingredient } from "./ingredient";

export type Recipe = {
  id: string;
  title: string;
  image: string;
  instructions?: React.ReactNode;
  extendedIngredients?: Ingredient[];
};
