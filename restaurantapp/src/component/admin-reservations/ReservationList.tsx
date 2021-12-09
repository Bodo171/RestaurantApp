import React from "react";
import {FoodItem} from "../../model/FoodItem";
import '../../index.css';
import {Reservation} from "../../model/Reservation";
import ReservationItem from "./ReservationItem";

type Props = {
    items: Array<Reservation>
    updateCallback: () => void;
}
type State = {
    changed: boolean
}
export default class ReservationList extends React.Component<Props, State>{
    constructor(props:any){
        super(props);
        this.state = {
            changed: false
        }
    }
    render() {
        const itemList = this.props.items.map(item =>
            <ReservationItem reservation={item} key={item.id} updateCallback={this.props.updateCallback}/>);
        return(
            <table className="table-striped item-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Phone number</th>
                    <th>Time</th>
                    <th>Confirmed</th>
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
