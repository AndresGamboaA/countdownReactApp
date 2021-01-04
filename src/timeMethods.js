export default function msToHMS(milliseconds, type="object") {
    let seconds = Math.floor((milliseconds / 1000) % 60);
    let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    let days = Math.floor((milliseconds / (1000 * 60 * 60 * 24)));
    if(type === "string"){
      return `${days===0?"":days+"d:"}${hours===0?"":hours+"h:"}${minutes+"m"}`;
    }
    else{
      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      }
    }
}
