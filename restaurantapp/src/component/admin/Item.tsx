import React from "react";
import {FoodItem} from "../../model/FoodItem";
type Props = {
    item: FoodItem
}
type State = {
    changed: boolean
}
export default class Item extends React.Component<Props, State>{
    constructor(props:any){
        super(props);
        this.state = {
            changed: false
        }
    }
    render() {
        const item = this.props.item;
        return <div className="adminItem">
            Name: {item.name} <br/>
            Description: {item.description}  <br/>
            Price {item.price} <br/>
            </div>
    }
}

