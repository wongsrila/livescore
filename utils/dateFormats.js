// Format date
function formatDate(dateString) {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  let formattedDate = date.toLocaleDateString('nl-NL', options);
  return formattedDate;
}

// Format timestamp
function formatTimestampAsTime(timestamp) {
  // Convert the Unix timestamp from seconds to milliseconds
  const date = new Date(timestamp * 1000);
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleTimeString('nl-NL', timeOptions);
}

function todayDate() {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2); // Get last two digits of the year
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
  const day = String(today.getDate()).padStart(2, '0'); // Pad the day with leading zero if needed

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate; // Output: e.g., "24-04-19"
}

// function formatFixtureDate(date) {
//   const dateString = '2010-08-14 11:45:00';
//   const date = new Date(dateString);

//   const options = {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   };

//   const formattedDate = date.toLocaleString('nl-NL', options).slice(-8);
//   const year = formattedDate.slice(-2);
//   const month = formattedDate.slice(0, -5);
//   const day = formattedDate.slice(0, 2);

//   const result = `${day} ${month} '${year}`;
//   console.log(result);
//   return result; // Output: "14 augustus '10"
// }

module.exports = {
  formatDate,
  formatTimestampAsTime,
  todayDate,
  // formatFixtureDate,
};
