function getStartAndEndDate(year, month) {
  // Ensure the month is a valid number between 1 and 12
  if (isNaN(month) || month < 1 || month > 12) {
    throw new Error('Invalid month');
  }

  // Create a new Date object with the specified year and month
  const startDate = new Date(year, month - 1, 1); // Month is 0-based
  const endDate = new Date(year, month, 0); // Set to the last day of the month

  // Format the dates to match the desired format
  const formattedStartDate = startDate.toISOString();
  const formattedEndDate = endDate.toISOString();

  return {
    start: formattedStartDate,
    end: formattedEndDate,
  };
}

// Example usage:
const { start, end } = getStartAndEndDate(2023, 10);
console.log('Start Date:', start);
console.log('End Date:', end);
