import React from "react";
import {FoodItem} from "../../model/FoodItem";
import Service from "../../service/Service";
import {Link} from "react-router-dom";
import {Reservation} from "../../model/Reservation";
type Props = {
    reservation: Reservation;
    updateCallback: () => void;
}
type State = {
    fetching: boolean,
    error: string,
}
export default class ReservationItem extends React.Component<Props, State>{
    constructor(props:any){
        super(props);
        this.state = {
            fetching: false,
            error: '',
        }
        this.onConfirm = this.onConfirm.bind(this);
    }
    onConfirm(){
        this.setState({fetching: true, error: ''});
        Service.confirmReservation({id: this.props.reservation.id})
            .catch((error) => {
                this.setState({error: String(error)});
            })
            .finally(() => {
                this.setState({fetching: false});
                this.props.updateCallback();
            });
    }
    render() {
        const item = this.props.reservation;
        return <tr>
            <td>{item.id}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.datetime} </td>
            <td>{item.confirmed} </td>
            <td>
                <button onClick={this.onConfirm} className="btn btn-info">Confirm</button>
            </td>
        </tr>
    }
}
