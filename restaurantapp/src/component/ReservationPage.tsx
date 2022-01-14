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

        this.getAction = this.getAction.bind(this);
    }

    componentDidMount(){
        this.setState({reservations: Reservations.getLocalReservations()});
        console.log(this.state.reservations);
        


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

    deleteReservation(id: number){
        Reservations.removeLocalReservation(id);
        this.setState({reservations: Reservations.getLocalReservations()});
    }

    getAction(reservation: LocalReservation){
        return <button onClick={() => {this.deleteReservation(reservation.id)}} className="btn btn-info">Sterge</button>;
        
    }

    

    render(){
        for (var i=0; i<this.state.reservations.length; i++){
            let id = this.state.reservations[i].id;
            let index = i;
            console.log('get ' +id);
            Service.getReservationStatus(id)
                .then((status: LocalReservationType) => {
                    if (status !== this.state.reservations[index].status){
                        let res = this.state.reservations[index];
                        res.status = status;
                        let allres = this.state.reservations;
                        allres[index] = res;
                        this.setState({reservations: allres});
                        Reservations.updateLocalReservation(res);
                    }
                });
        }

        const itemList = this.state.reservations.map( (reservation: LocalReservation) => (
            <tr key={reservation.at.getTime()}>
                <th style={{fontStyle: "normal"}}>{this.getDif(reservation.at)}</th>
                <th>{this.getStatus(reservation.status)}</th>
                <th>{this.getAction(reservation)}</th>
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