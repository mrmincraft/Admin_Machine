class User {
    constructor(id, username, levelAccess, password) {
      this.id = id;
      this.levelAccess = levelAccess;
      this.username = username;
      this.password = password;
    }
  }
  
  module.exports = User;