import {weekDays, daysInEachMonth} from '../constants/calendar';

interface MatrixItem {
  id: number;
  value: string;
}

export function generateMatrix(currentDate: Date) {
  let matrix: MatrixItem[][] = [];

  let date = new Date(currentDate);

  let year = date?.getFullYear();
  let month = date?.getMonth();

  let firstDay = new Date(year, month, 0).getDay();

  let maxDays = daysInEachMonth[month];
  if (month == 1) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      maxDays += 1;
    }
  }

  let counter = 1;
  for (let row = 0; row < 6; row++) {
    matrix[row] = [];
    for (let col = 0; col < 7; col++) {
      let formattedDate = ''; // Move the declaration here

      if (row == 0 && col >= firstDay) {
        formattedDate = formatDate(year, month, counter++);
        matrix[row][col] = {id: counter - 1, value: formattedDate};
      } else if (row > 0 && counter <= maxDays) {
        formattedDate = formatDate(year, month, counter++);
        matrix[row][col] = {id: counter - 1, value: formattedDate};
      } else {
        matrix[row][col] = {id: -1, value: ''}; // Ensure the matrix is properly filled even if no date is assigned
      }
    }
  }

  return matrix;
}
function formatDate(year: number, month: number, day: number): string {
  let monthStr = String(month + 1).padStart(2, '0'); // Adding leading zero if needed
  let dayStr = String(day).padStart(2, '0'); // Adding leading zero if needed
  return `${year}-${monthStr}-${dayStr}`;
}
