const sqlite3 = require("sqlite3").verbose();
const color = require("colors");

class Connection {
  static connectDB(dbPath = "./database/recipes.db") {
    return new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the recipes database".cyan.underline);
    });
  }
}
const db = Connection.connectDB();
module.exports = db;
