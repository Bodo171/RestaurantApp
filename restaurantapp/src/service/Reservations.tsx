import { LocalReservation, LocalReservationFromJSON, LocalReservationToJSON } from "../model/LocalReservation";


export default class Reservations{
    static __listeners: Array<()=>void> = [];

    static listen = (callback: () => void) => {
        Reservations.__listeners.push(callback);
    }

    static trigger = () => {
        for (var i=0; i<Reservations.__listeners.length; i++){
            Reservations.__listeners[i]();
        }
    }

    static getLocalReservations = () => {
        let data = localStorage.getItem('reservations');
        if (!data) return [];
        try{
            data = JSON.parse(data);
        }catch(e){
            localStorage.removeItem('reservations');
            return [];
        }
        if (!Array.isArray(data)){
            localStorage.removeItem('reservations');
            return [];
        }
        let reservations: Array<LocalReservation> = [];
        for (let i = 0; i < data.length; i++){
            try{
                let res = LocalReservationFromJSON(data[i]);
                reservations.push(res);
            }catch(e){
                console.error('Invalid reservation in local storage!');
                console.error(data[i]);
            }
        }
        return reservations;
    }

    static saveLocalReservation = (data: LocalReservation) => {
        let reservations = [];
        try{
            reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
            if (!Array.isArray(reservations)) reservations = [];
        }finally{
            reservations.push(LocalReservationToJSON(data));
            localStorage.setItem('reservations', JSON.stringify(reservations));
            Reservations.trigger();
        }
        
    }
}