export enum DishType{
    BREAKFAST = "breakfast",
    LUNCH = "lunch",
    DINNER = "dinner",
}

export function dishTypeFromString(dishTypeStr: string){
    dishTypeStr.toLowerCase();
    switch (dishTypeStr){
        case "breakfast":
            return DishType.BREAKFAST;
        case "lunch":
            return DishType.LUNCH;
        default:
            return DishType.DINNER;
    }
}
export const emptyMenu = () => {
    return { breakfast: [], lunch: [], dinner: [] };
}
