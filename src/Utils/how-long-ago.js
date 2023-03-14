import { secondsToTimeString } from "./seconds-to-time"

const howLongAgo = (date) => {
    return secondsToTimeString(Math.floor((Date.now() - Date.parse(date)) / 1000))

} 

const howLongAgoShort = (date) => {
    return howLongAgo(date).replace("years", "y").replace("year", "y").replace("days", "d").replace("day", "d").replace("hours", "h").replace("hour", "h").replace("minutes", "m").replace("minute", "m").replace("seconds", "s").replace("second", "s").replace("and", "").replace(" ago.", " ago.")

}

export {howLongAgo, howLongAgoShort}

