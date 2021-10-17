import { FoodItem } from "./FoodItem";

export type Menu = {
    breakfast: Array<FoodItem>;
    lunch: Array<FoodItem>;
    dinner: Array<FoodItem>;
}