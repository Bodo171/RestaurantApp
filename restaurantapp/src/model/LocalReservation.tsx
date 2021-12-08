
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

function LocalReservationFromJSON(js: any) {
    if (!ValidateReservationJSON(js)) throw new Error("Invalid local reservation json!");
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

function LocalReservationToJSON(data: LocalReservation) {
    let json = {
        id: data.id,
        status: 'waiting',
        at: data.at.getTime()
    };
    switch (data.status){
        case LocalReservationType.ACCEPTED:
            json.status = 'accepted';
            break;
    }
    return json;
}

function LocalReservationsStatus(reservations: Array<LocalReservation>) {
    let waiting = 0,
        accepted = 0,
        refused = 0;
    for (var i=0; i<reservations.length; i++){
        switch(reservations[i].status){
            case LocalReservationType.WAITING:
                waiting++;
                break;
            case LocalReservationType.ACCEPTED:
                accepted++;
                break;
            case LocalReservationType.REFUSED:
                refused++;
                break;
        }
    }
    if (waiting + accepted + refused === 0) return '';
    if (waiting === 1) return 'Ai o cerere de rezervare in asteptare...';
    if (waiting > 1) return `Ai ${waiting} cereri de rezervare in asteptare...`;
    if (accepted === 1) return 'Ai o cerere de rezervare acceptata!';
    if (accepted > 1) return 'Ai cereri de rezervare acceptate!';
    if (refused === 1) return 'Ai o cerere de rezervare refuzata!';
    if (refused > 1) return 'Ai cereri de rezervare refuzate!';
    return '';
}

export { LocalReservationType, LocalReservationFromJSON, LocalReservationToJSON, LocalReservationsStatus }
export type { LocalReservation }
