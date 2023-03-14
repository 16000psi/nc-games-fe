export const secondsToTimeString = (seconds, result = {years: 0, days: 0, hours: 0, minutes: 0, seconds: 0}) => {

    if (seconds >= 31536000) { // years
      seconds -= 31536000
      result.years ++
      return secondsToTimeString(seconds, result)
    }
  
    if (seconds >= 86400) { // days
      seconds -= 86400
      result.days ++
      return secondsToTimeString(seconds, result)
    }
  
    if (seconds >= 3600) { //hours
      seconds -= 3600
      result.hours ++
      return secondsToTimeString(seconds, result)
    }
  
    if (seconds >= 60) { //minutes
      seconds -= 60
      result.minutes ++
      return secondsToTimeString(seconds, result)
    }
  
    if (seconds >= 1) { //seconds
      seconds -= 1
      result.seconds ++
      return secondsToTimeString(seconds, result)
    }
  
    if (seconds === 0) {  // process result string
      let arr = Object.values(result)
      let textDisplayArr = []
  
      if (arr[0] === 1) {
        textDisplayArr.push(`${arr[0]} year`)
      } else if (arr[0] > 1) {
        textDisplayArr.push(`${arr[0]} years`)
      }
  
      if (arr[1] === 1) {
        textDisplayArr.push(`${arr[1]} day`)
      } else if (arr[1] > 1) {
        textDisplayArr.push(`${arr[1]} days`)
      }
  
      if (arr[2] === 1 && !(arr[0] > 0 || arr[1] > 0)) {
        textDisplayArr.push(`${arr[2]} hour`)
      } else if (arr[2] > 1 && !(arr[0] > 0 || arr[1] > 0)) {
        textDisplayArr.push(`${arr[2]} hours`)
      }
  
      if (arr[3] === 1 && !(arr[0] > 0 || arr[1] > 0 || arr[2] > 0)) {
        textDisplayArr.push(`${arr[3]} minute`)
      } else if (arr[3] > 1 && !(arr[0] > 0 || arr[1] > 0 || arr[2] > 0)) {
        textDisplayArr.push(`${arr[3]} minutes`)
      }
  
      if (arr[4] === 1 && !(arr[0] > 0 || arr[1] > 0 || arr[2] > 0 || arr[3] > 0)) {
        textDisplayArr.push(`${arr[4]} second`)
      } else if (arr[4] > 1 && !(arr[0] > 0 || arr[1] > 0 || arr[2] > 0 || arr[3] > 0)) {
        textDisplayArr.push(`${arr[4]} seconds`)
      }
  
      if (textDisplayArr.length > 1) {
  
        textDisplayArr.splice(textDisplayArr.length - 1, 0, " and ")
      }
  
      let textDisplay = ""
  
      for (let i in textDisplayArr) {
  
        if (i < textDisplayArr.length - 3) {
          textDisplay += (textDisplayArr[i] + ", ")
        }
  
        else {
          textDisplay += textDisplayArr[i]
        }
      }

      textDisplay += " ago."
  
      return textDisplay
    }
  
  };
