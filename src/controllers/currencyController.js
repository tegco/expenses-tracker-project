const db = require('../database/db');

exports.getAllCurrencies = async (req, res) => {
    try {
        const currencies = await db.query("SELECT * FROM currency");

        if (!currencies) {
            return res.status(404).send("No currencies found.");
        }

        const currencies_names = [];

        for (const currency of currencies) {
            const name = currency.name;
            if (name != null) {
                currencies_names.push(name);
            }
        }
        res.send(currencies_names);
        
    } catch (error) {
        console.error('Error fetching currencies:', error);
        res.status(500).send("Internal server error");
    }
  };