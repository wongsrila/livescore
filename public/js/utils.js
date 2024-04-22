// Format timestamp function
export function formatTimestampAsTime(timestamp) {
  if (timestamp === undefined) return '';

  // Convert the Unix timestamp from seconds to milliseconds
  const date = new Date(timestamp * 1000);
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleTimeString('nl-NL', timeOptions);
}

export function formatFixtureDate(starting_at) {
  if (!starting_at) return '';

  const dateString = starting_at;
  const date = new Date(dateString);
  const monthNames = [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december',
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear().toString().slice(-2);
  const month = monthNames[monthIndex];
  const result = `${day} ${month} '${year}`;
  return result; // Output: "14 augustus '10"
}

export const stateNames = {
  1: 'Not Started',
  2: '1st Half',
  3: 'Half Time',
  4: 'Break',
  5: 'Full Time',
  6: 'Extra Time',
  7: 'After Extra Time',
  8: 'After Penalties',
  9: 'Penalties',
  10: 'Postponed',
  11: 'Suspended',
  12: 'Cancelled',
  13: 'To Be Announced',
  14: 'Walk Over',
  15: 'Abandoned',
  16: 'Delayed',
  17: 'Awarded',
  18: 'Interrupted',
  19: 'Awaiting Updates',
  20: 'Deleted',
  21: 'Extra Time - Break',
  22: '2nd Half',
  23: 'ET - 2nd Half',
  25: 'Penalties - Break',
  26: 'Pending',
};
