export function convertDateStr(dateString) {
  // Create a new Date object from the input string
  var date = new Date(dateString)

  // Define an array of month names
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Get the hours and convert to 12-hour format
  var hours = date.getHours()
  var ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'

  // Get the minutes and pad with a zero if necessary
  var minutes = date.getMinutes()
  minutes = minutes < 10 ? '0' + minutes : minutes

  // Get the day of the month, month name, and year
  var day = date.getDate()
  var month = months[date.getMonth()]
  var year = date.getFullYear()

  // Construct the new date string
  var newDateString = hours + ':' + minutes + ampm + ' | ' + day + ' ' + month + ' ' + year

  return newDateString
}
