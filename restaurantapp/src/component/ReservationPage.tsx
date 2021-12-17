import React from "react";
import { LocalReservation, LocalReservationType } from "../model/LocalReservation";
import Reservations from "../service/Reservations";
import Service from "../service/Service";
import '../index.css';



type State = {
    reservations: Array<LocalReservation>
}

export default class ReservationPage extends React.Component<{}, State>{
    constructor(props:any){
        super(props);
        this.state = {
            reservations: []
        };
    }

    componentDidMount(){
        this.setState({reservations: Reservations.getLocalReservations()});
        Reservations.listen("reservationpage", () => {
            this.setState({reservations: Reservations.getLocalReservations()});
        });
    }

    componentWillUnmount(){
        Reservations.unlisten("reservationpage");
    }

    getDif(date: Date){
        const dif = ((new Date()).getTime() - date.getTime())/1000;
        if (dif < 60) return `Acum ${dif} secunde.`;
        if (dif < 120) return `Acum un minut.`;
        if (dif < 60 * 60) return `Acum ${Math.floor(dif/60)} de minute.`;
        if (dif < 60 * 60 * 2) return `Acum o ora si ${Math.floor((dif/60)%60)} de minute.`;
        return `Acum ${Math.floor(dif/3600)} ore si ${Math.floor((dif/60)%60)} de minute.`;
    }

    getStatus(status: LocalReservationType){
        switch(status){
            case LocalReservationType.WAITING:
                return "In asteptare...";
            case LocalReservationType.ACCEPTED:
                return "Acceptat!";
            case LocalReservationType.REFUSED:
                return "Refuzat!";
            default:
                return "??"
        }
    }

    getAction(status: LocalReservationType){
        switch(status){
            case LocalReservationType.WAITING:
                return <button className="btn btn-danger">Anuleaza</button>;
            case LocalReservationType.ACCEPTED:
                return <button className="btn btn-info">Sterge</button>;
            case LocalReservationType.REFUSED:
                return <button className="btn btn-info">Sterge</button>;
        }
    }

    

    render(){
        const itemList = this.state.reservations.map( (reservation: LocalReservation) => (
            <tr key={reservation.at.getTime()}>
                <th style={{fontStyle: "normal"}}>{this.getDif(reservation.at)}</th>
                <th>{this.getStatus(reservation.status)}</th>
                <th>{this.getAction(reservation.status)}</th>
            </tr>
        ))
        return (
            <div style={{display: "flex", alignItems: "center", justifyContent: 'center'}}>
                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                    <table className="table-striped item-table">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Actiune</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}