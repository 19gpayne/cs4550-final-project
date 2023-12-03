export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getFormattedDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours() % 12 || 12;
    const minutes = dateObj.getMinutes();
    const ampm = (dateObj.getHours() >= 12) ? "pm" : "am";
    return `${month} ${day}, ${year} at ${hours}:${minutes < 10 ? `0${minutes}` : minutes}${ampm}`;
}