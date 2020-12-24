export const addDate = (date: Date, day: number) => {
  let newDate = new Date();
  newDate.setDate(date.getDate() + day);
  return newDate;
};
