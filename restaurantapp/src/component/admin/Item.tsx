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
        return <tr>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>Price {item.price} </td>
            </tr>
    }
}

