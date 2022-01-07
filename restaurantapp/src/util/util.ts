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

export const emptyMenuItem = (id: number, category: DishType) => {
    return {
        id: id,
        name: '',
        description: '',
        price: 0,
        category: category
    }
}
