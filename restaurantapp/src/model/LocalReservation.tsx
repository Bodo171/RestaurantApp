
type LocalReservation = {
    id: number;
    status: LocalReservationType;
    at: Date;
}

enum LocalReservationType{
    WAITING, ACCEPTED, REFUSED
}

function ValidateReservationJSON (js: any){
    if (!(js && js.id && js.status && js.at)) return false;
    if (Number.isNaN(js.id)) return false;
    if (Number.isNaN(js.at)) return false;
    if (!['waiting', 'accepted', 'refused'].includes(js.status)) return false;
    return true;
}

function LocalReservationFromJSON (js: any){
    if (!ValidateReservationJSON(js)) throw "Invalid local reservation json!";
    let reservation: LocalReservation = {
        id: js.id,
        status: LocalReservationType.WAITING,
        at: new Date(js.at)
    };
    switch (js.status){
        case "accepted":
            reservation.status = LocalReservationType.ACCEPTED;
            break;
        case "refused":
            reservation.status = LocalReservationType.REFUSED;
            break;
        default:
            reservation.status = LocalReservationType.WAITING;
            break;
    }
    return reservation;
}

function LocalReservationToJSON (data: LocalReservation){
    let json = {
        id: data.id,
        status: 'waiting',
        at: data.at.getUTCDate()
    };
    switch (data.status){
        case LocalReservationType.ACCEPTED:
            json.status = 'accepted';
            break;
    }
}

export { LocalReservationType, LocalReservationFromJSON }
export type { LocalReservation }
