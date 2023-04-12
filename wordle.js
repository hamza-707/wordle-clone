import words from "./dictionary";
const dictionary = [];
words.forEach((word) => dictionary.push(word.word));
const gameState = {
  secret: dictionary[Math.floor(Math.random() * dictionary.length)],
  matrix: Array(6)
    .fill()
    .map(() => Array(5).fill("")),
  row: 0,
  col: 0,
};

const updateGrid = () => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = document.getElementById(`box-${i}-${j}`);
      cell.textContent = gameState.matrix[i][j];
    }
  }
};

const drawCell = (div, row, col, letter = "") => {
  const cell = document.createElement("div");
  cell.className = "box";
  cell.id = `box-${row}-${col}`;
  cell.textContent = letter;
  div.appendChild(cell);
};

const makeGrid = (container) => {
  const grid = document.createElement("div");
  grid.className = "grid";
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      drawCell(grid, i, j);
    }
  }
  container.appendChild(grid);
};

const getCurrentWord = () => {
  return gameState.matrix[gameState.row].reduce((prev, curr) => prev + curr);
};

const isWordValid = (word) => {
  return dictionary.includes(word);
};

const getNumOfOccurrencesInWord = (word, letter) => {
  let result = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      result++;
    }
  }
  return result;
};

const getPositionOfOccurrence = (word, letter, position) => {
  let result = 0;
  for (let i = 0; i <= position; i++) {
    if (word[i] === letter) {
      result++;
    }
  }
  return result;
};

const revealWord = (guess) => {
  const row = gameState.row;
  const animation_duration = 500; // ms

  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`box-${row}-${i}`);
    const letter = box.textContent;
    const numOfOccurrencesSecret = getNumOfOccurrencesInWord(
      gameState.secret,
      letter
    );
    const numOfOccurrencesGuess = getNumOfOccurrencesInWord(guess, letter);
    const letterPosition = getPositionOfOccurrence(guess, letter, i);

    setTimeout(() => {
      if (
        numOfOccurrencesGuess > numOfOccurrencesSecret &&
        letterPosition > numOfOccurrencesSecret
      ) {
        box.classList.add("empty");
      } else {
        if (letter === state.secret[i]) {
          box.classList.add("right");
        } else if (state.secret.includes(letter)) {
          box.classList.add("wrong");
        } else {
          box.classList.add("empty");
        }
      }
    }, ((i + 1) * animation_duration) / 2);

    box.classList.add("animated");
    box.style.animationDelay = `${(i * animation_duration) / 2}ms`;
  }

  const isWinner = gameState.secret === guess;
  const isGameOver = gameState.row === 5;

  setTimeout(() => {
    if (isWinner) {
      alert("Congratulations!");
    } else if (isGameOver) {
      alert(`Better luck next time! The word was ${state.secret}.`);
    }
  }, 3 * animation_duration);
};

const isLetter = (key) => {
  return key.length === 1 && key.match(/[a-z]/i);
};

const addLetter = (letter) => {
  if (gameState.col === 5) return;
  gameState.matrix[gameState.row][gameState.col] = letter;
  gameState.col++;
};

const removeLetter = () => {
  if (gameState.col === 0) return;
  gameState.matrix[gameState.row][gameState.col - 1] = "";
  gameState.col--;
};

const registerKeyPress = () => {
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      if (gameState.col === 5) {
        const word = getCurrentWord();
        if (isWordValid(word)) {
          revealWord(word);
          gameState.row++;
          gameState.col = 0;
        } else {
          alert("Not a valid word.");
        }
      }
    } else if (key === "Backspace") {
      removeLetter();
    } else if (isLetter(key)) {
      addLetter(key);
    }
    updateGrid();
  };
};

const startGame = () => {
  const game = document.getElementById("game");
  makeGrid(game);

  registerKeyPress();
};

startGame();
