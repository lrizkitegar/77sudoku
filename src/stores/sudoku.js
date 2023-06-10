import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSudokuStore = defineStore('sudoku', () => {
  const completeBoard = ref([])
  const playBoard = ref([])
  const checkBoard = ref([])

  function fillSudokuBoard(inputBoard) {
    // Recursive function to fill the Sudoku board
    const board = [...inputBoard]
    // Find the next empty cell
    const nextCell = findEmptyCell(board);
    if (!nextCell) {
      // All cells are filled, the board is complete
      return true;
    }

    const [row, col] = nextCell;

    // Try numbers from 1 to 9
    for (let num = 1; num <= 9; num++) {
      const generatedNum = Math.floor(Math.random() * 9) + 1;
      if (isValidNumber(board, row, col, generatedNum)) {
        // Assign the number to the cell
        board[row][col] = generatedNum


        // Recursively fill the remaining cells
        if (fillSudokuBoard(board)) {
          return board; // Board is complete
        }

        // If the number doesn't lead to a complete solution, backtrack and try the next number
        board[row][col] = 0;
      }
    }


    // Exhausted all numbers without finding a valid solution
    return false;
  }
  function checkSudoku(inputBoard) {
    // Recursive function to fill the Sudoku board
    const board = [...inputBoard]
    // Find the next empty cell
    const nextCell = findEmptyCell(board);
    if (!nextCell) {
      // All cells are filled, the board is complete
      return true;
    }

    const [row, col] = nextCell;

    // Try numbers from 1 to 9
    for (let num = 1; num <= 9; num++) {
      // const generatedNum = Math.floor(Math.random() * 9) + 1;
      if (isValidNumber(board, row, col, num)) {
        // Assign the number to the cell
        board[row][col] = num


        // Recursively fill the remaining cells
        if (fillSudokuBoard(board)) {
          return board; // Board is complete
        }

        // If the number doesn't lead to a complete solution, backtrack and try the next number
        board[row][col] = 0;
      }
    }


    // Exhausted all numbers without finding a valid solution
    return false;
  }

  function findEmptyCell(board) {
    // Find the next empty cell (cell with value 0)
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null; // No empty cell found, board is complete
  }

  function isValidNumber(board, row, col, num) {
    // Check if the number is valid in the given cell

    // Check row and column
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false; // Number already exists in the row or column
      }
    }

    // Check 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === num) {
          return false; // Number already exists in the 3x3 grid
        }
      }
    }

    return true; // Number is valid in the given cell
  }

  function removeNumbersFromBox(board, count) {
    const newBoard = [...board]
    for (let row = 0; row < 9; row = row + 3) {
      for (let col = 0; col < 9; col = col + 3) {
        // const currRow = Math.floor(Math.random() * 3) * 3;  // Random row index of the box
        // const currCol = Math.floor(Math.random() * 3) * 3;  // Random column index of the box

        let removedCount = 0;
        while (removedCount < count) {
          const randomRow = row + Math.floor(Math.random() * 3);  // Random row index within the box
          const randomCol = col + Math.floor(Math.random() * 3);  // Random column index within the box

          // Remove the number at the random position if it's not already removed
          if (newBoard[randomRow][randomCol] !== 0) {
            newBoard[randomRow][randomCol] = 0;
            removedCount++;
          }
        }
      }
    }
    return newBoard
  }

  function generateSudokuBoard() {
    // Create an empty 9x9 Sudoku board
    const board = Array.from(Array(9), () => Array(9).fill(0));

    // Fill the board with random numbers that satisfy Sudoku rules
    completeBoard.value = fillSudokuBoard(board);

    const playBoardCopy = JSON.parse(JSON.stringify(board));
    playBoard.value = removeNumbersFromBox(playBoardCopy, 4);
    // Print the Sudoku board
    const fillBoard = JSON.parse(JSON.stringify(playBoard.value));
    checkBoard.value = checkSudoku(fillBoard)
  }

  return { completeBoard, playBoard, checkBoard, generateSudokuBoard }
})
