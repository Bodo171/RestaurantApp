import { LocalReservation, LocalReservationFromJSON, LocalReservationToJSON } from "../model/LocalReservation";


export default class Reservations{
    static __listeners: { [key: string]: ()=>void } = {};

    static listen = (id: string, callback: () => void) => {
        Reservations.__listeners[id] = callback;
    }

    static unlisten = (id: string) => {
        if (Reservations.__listeners[id]) delete Reservations.__listeners[id];
    }

    static trigger = () => {
        for (var key in Reservations.__listeners){
            Reservations.__listeners[key]();
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