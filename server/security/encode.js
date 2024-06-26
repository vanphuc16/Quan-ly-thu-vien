function encodedValue(value) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    return bcrypt.hashSync(value, saltRounds);
}

module.exports = encodedValue;