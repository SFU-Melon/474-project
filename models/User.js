class User {
  username = "";
  password = "";

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  save() {
    if (this.username && this.password) {
      //save to db
    }
  }
}

module.exports = User;
