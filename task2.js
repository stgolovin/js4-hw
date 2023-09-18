const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secretNumber = Math.floor(Math.random() * 100) + 1;  // Генерация случайного числа от 1 до 100
let attempts = 0;

function startGame() {
  rl.question('Угадайте число от 1 до 100: ', (userInput) => {
    attempts++;
    const userGuess = parseInt(userInput, 10);

    if (userGuess === secretNumber) {
      console.log(`Поздравляем! Вы угадали число ${secretNumber} с ${attempts} попыток.`);
      // Записываем протокол игры
      const logMessage = `Пользователь угадал число ${secretNumber} с ${attempts} попыток.\n`;
      fs.appendFile('game_log.txt', logMessage, (err) => {
        if (err) throw err;
        console.log('Протокол игры сохранен в файл game_log.txt.');
        rl.close();
      });
    } else if (userGuess < secretNumber) {
      console.log('Больше!');
      startGame();
    } else {
      console.log('Меньше!');
      startGame();
    }
  });
}

startGame();
