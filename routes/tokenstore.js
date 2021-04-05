class TStore {
  constructor() {
    this.tokens = [];
    this.expiration = 10 * 60 * 1000;
  }

  addToken(token) {
    const item = { token, timestamp: new Date() };
    this.token.push(item);
  }

  removeToken(token) {
    this.tokens = this.tokens.filter((item) => item.token !== token);
  }

  cleanUp() {
    const date = new Date();
    this.tokens = this.tokens.filter(
      (item) => date - item.timestamp < this.expiration
    );
  }

  isValid(token) {
    for (let i = 0; i < this.tokens.length; i++) {
      if (this.tokens[i].token === token) return true;
    }
    return false;
  }

  printAllTokens() {
    console.log("Tokens: ", this.tokens);
  }
}

const TokenStore = new TStore();
module.exports = {
  TokenStore,
};
