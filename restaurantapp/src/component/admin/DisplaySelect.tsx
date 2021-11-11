import React from "react";
import {DishType} from "../../util/util";

export default function DisplaySelect(props: {defaultValue: string, onChange: (prop: string) => void}){
    return (
    <select value={props.defaultValue} onChange={(event)=>props.onChange(event.target.value)}>
        <option value={DishType.BREAKFAST}>Breakfast</option>
        <option value={DishType.LUNCH}>Lunch</option>
        <option value={DishType.DINNER}>Dinner</option>
    </select>
    )
}
