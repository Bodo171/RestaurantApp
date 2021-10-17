import React from "react";
import { FoodItem } from "../../model/FoodItem";

export default function FoodBox(props:{item:FoodItem}){
    return (
        <div className="food-item">
        <img src={props.item.image} alt="" />
        <div className="price">RON {props.item.price}</div>
        <div className="text-content">
            <h4>{props.item.name}</h4>
            <p>{props.item.description}</p>
        </div>
    </div>
    )
    
}