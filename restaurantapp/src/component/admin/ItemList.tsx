import React from "react";
import {FoodItem} from "../../model/FoodItem";
import Item from "./Item";

type Props = {
    items: Array<FoodItem>
}
type State = {
    changed: boolean
}
export default class ItemList extends React.Component<Props, State>{
    constructor(props:any){
        super(props);
        this.state = {
            changed: false
        }
    }
    render() {
        const itemList = this.props.items.map(item => <Item item={item} key={item.id}/>);
        return(
            <table className="table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList}
                </tbody>
            </table>
    )
    }
}
