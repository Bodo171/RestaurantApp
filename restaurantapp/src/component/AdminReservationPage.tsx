import React from "react";
import Service from "../service/Service";
import {Menu} from "../model/Menu";
import CreateOwlCarousels from "../scripts/owlcarousel";
import {DishType, dishTypeFromString, emptyMenu} from "../util/util";
import ItemList from "./admin/ItemList";
import DisplaySelect from "./admin/DisplaySelect";
import AddItem from "./admin/AddItem";
import '../index.css';
import {Reservation} from "../model/Reservation";
import ReservationItem from "./admin-reservations/ReservationItem";
import ReservationList from "./admin-reservations/ReservationList";

type State = {
    reservations: Array<Reservation>;
    fetching: boolean;
    sending: boolean;
}
export default class AdminReservationPage extends React.Component<{},State>{
    constructor(props:any){
        super(props);

        this.state = {
            sending: false,
            reservations: [],
            fetching: true
        }
        this.onUpdate = this.onUpdate.bind(this);
    }

    onUpdate(){
        this.setState({...this.state, fetching: true});
        Service.getReservations().then((reservations: Array<Reservation>) => {
            this.setState({...this.state, reservations: reservations, fetching: false});
        }).catch((error:any) => {
            alert(error);
        });
    }

    componentDidMount() {
        this.onUpdate();
    }


    render(){
        return (
            <div style={{display: "flex", alignItems: "center", justifyContent: 'center'}}>
                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                    <ReservationList items={this.state.reservations} updateCallback={this.onUpdate}/>
                </div>
            </div>
    )
    }
}
