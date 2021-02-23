function dateSpliter(date) {
  const dateString = date.toString();
  const splited = dateString.substring(4, 15);
  return splited;
}

export default dateSpliter;
