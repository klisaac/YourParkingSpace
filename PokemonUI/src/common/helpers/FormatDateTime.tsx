const formatDateTime = (date: string, time?: boolean) => {
  if (date != null && date !== "") {
    if (time) {
      return `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)} ${date.substring(11, 16)}`;
    } else {
      return `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}`;
    }
  } else {
    return "";
  }
};
export default formatDateTime;
