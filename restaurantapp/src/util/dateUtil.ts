export const getDayOffset = () =>{
    return 1000*60*60*24;
}

export function getStr(date: Date){
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}
export function getDates() {
    var dates = []
    // Starting Monday not Sunday
    var current = Date.now()
    for (var i = 0; i < 7; i++) {
        dates.push(
            new Date(current)
        );
       current += getDayOffset();
    }
    return dates;
}
