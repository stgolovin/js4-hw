function getPasswordChecker(password) {
    return function (userPassword) {
      return userPassword === password;
    };
  }

  const correctPassword = "SecretPassword";
  const checkPassword = getPasswordChecker(correctPassword);
  
  console.log(checkPassword("SecretPassword"));
  console.log(checkPassword("wrongPassword")); 