import React from "react";
import {FoodItem} from "../../model/FoodItem";
import Item from "./Item";
import '../../index.css';

type Props = {
    items: Array<FoodItem>
    updateCallback: () => void;
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
        const itemList = this.props.items.map(item =>
            <Item item={item} key={item.id} updateCallback={this.props.updateCallback}/>);
        return(
            <table className="table-striped item-table">
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
