export const getDateFormat = (string) => {
  let date = new Date(string).getDate();
  let month = new Date(string).getMonth() + 1;
  let year = new Date(string).getFullYear();

  let formatableDate = `${date}/${month}/${year}`;
  return formatableDate;
};
