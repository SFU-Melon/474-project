class TStore {
  constructor() {
    this.tokens = [];
    this.expiration = 10 * 60 * 1000; //10 mins
  }

  addToken(token, username) {
    const item = { token, username, timestamp: new Date() };
    this.tokens.push(item);
  }

  removeToken(token) {
    this.tokens = this.tokens.filter((item) => item.token !== token);
  }

  updateUserToken(username, new_token) {
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i].username === username) {
        this.tokens[i].token = new_token;
        this.tokens[i].timestamp = new Date();
      }
      return true;
    }
    return false;
  }

  isValid(token) {
    const date = new Date();
    for (let i = 0; i < this.tokens.length; i++) {
      const item = this.tokens[i];
      console.log(date - item.timestamp);
      if (item.token === token && date - item.timestamp <= this.expiration) {
        return true;
      }
    }
    return false;
  }

  cleanUp() {
    const date = new Date();
    this.tokens = this.tokens.filter(
      (item) => date - item.timestamp <= this.expiration
    );
  }

  print() {
    console.log("Tokens: ", this.tokens);
  }
}

const TokenStore = new TStore();
module.exports = {
  TokenStore,
};
