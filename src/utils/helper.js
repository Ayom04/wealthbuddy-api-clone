const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (mypassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(mypassword, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve({ salt, hash });
      });
    });
  });
};

const comparePassword = async (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    let result = bcrypt.compare(password, hashPassword);
    if (result) {
      resolve(result);
    } else {
      reject(err);
    }
  });
};

const generateOtp = (num) => {
  if (num < 2) {
    return Math.floor(1000 + Math.random() * 9000);
  }
  const c = Math.pow(10, num - 1);

  return Math.floor(c + Math.random() * 9 * c);
};

module.exports = {
  comparePassword,
  hashPassword,
  generateOtp,
};
