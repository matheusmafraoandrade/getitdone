const calculateDaysUntilDue = (dueDateInSeconds) => {
  const currentDate = new Date();
  const dueDate = new Date(dueDateInSeconds * 1000);

  const differenceInTime = dueDate.getTime() - currentDate.getTime();

  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
};

export default calculateDaysUntilDue;
