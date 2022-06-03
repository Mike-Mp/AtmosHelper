export const dateFormatter = (date) => {
    let newDate = date ? new Date(date) : new Date();

    const formattedDate = newDate.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'});
    return formattedDate;
};

export const dayGetter = (newDate) => {
  let date_1 = new Date(newDate);
  let date_2 = new Date();

  let difference = date_2.getTime() - date_1.getTime();
  let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return totalDays;
};