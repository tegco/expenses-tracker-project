const pgp = require("pg-promise")();
const db = require("../database/db.js");
const jsonData = require("./currencies.json");

async function insertCurrencies() {
  try {
    for (const currency of jsonData) {
      const { code, name, symbol } = currency;
      const query =
        "INSERT INTO currency (code, name, symbol) VALUES ($1, $2, $3)";
      const values = [code, name, symbol];

      console.log(`Executing query: ${query} with values: ${values}`);

      const result = await db.query(query, values);

      // Check if there are rows returned
      if (result.rows && result.rows.length > 0) {
        console.log(
          `Inserted currency: ${result.rows[0].code} - ${result.rows[0].name} -  ${result.rows[0].symbol}`
        );
      } else {
        console.log("No rows returned after insertion.");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

insertCurrencies();
