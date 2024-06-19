export const getNext16_30 = () => {
    const currentDate = new Date();
    let nextDate = new Date(currentDate);
    nextDate.setHours(16);
    nextDate.setMinutes(45);
    if (nextDate <= currentDate) {
      nextDate.setDate(nextDate.getDate() + 1); // Move to tomorrow
    }
    return nextDate;
  };
