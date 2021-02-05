export function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }

  if (date) {
    return new Date(date).toLocaleDateString("en-US", options);
  } else {
    return "-";
  }
}


export function formatTime(date) {
  const optionsFull = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  const optionsShort = { year: 'numeric', month: 'short', day: 'numeric' }

  if (date) {
    const fullDate = new Date(date).toLocaleDateString("en-US", optionsFull);
    const shortDate = new Date(date).toLocaleDateString("en-US", optionsShort);
    const getTime = (full, short) => full.split(short + ",");
    
    return getTime(fullDate, shortDate);
  }
}
