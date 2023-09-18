const readline = require('readline');
const fs = require('fs');

function questionAsync(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function playGame() {
  const secretNumber = getRandomNumber(1, 100);
  let attempts = 0;

  async function startGame() {
    while (true) {
      attempts++;
      const userInput = await questionAsync('Угадайте число от 1 до 100: ');
      const userGuess = parseInt(userInput, 10);

      if (isNaN(userGuess)) {
        console.log('Введите корректное число.');
        continue;
      }

      if (userGuess === secretNumber) {
        console.log(`Поздравляем! Вы угадали число ${secretNumber} с ${attempts} попыток.`);
        const logMessage = `Пользователь угадал число ${secretNumber} с ${attempts} попыток.\n`;
        fs.appendFileSync('game_log.txt', logMessage);
        break;
      } else if (userGuess < secretNumber) {
        console.log('Больше!');
      } else {
        console.log('Меньше!');
      }
    }
  }

  startGame();
}

playGame();
