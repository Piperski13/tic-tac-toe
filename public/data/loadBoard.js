export function updateBoard(options) {
  // Update the board with current options and HTML content
  Object.keys(options).forEach(index => {
    const cell = document.querySelector(`.grid-element[cellIndex="${index}"]`);
    if (cell) {
      cell.innerHTML = options[index];
    }
  });
}