const db = require("../database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  validateRegister,
  validateLogin,
  validateUpdatePassword,
} = require("../middleware/validationMiddleware");

exports.register = async (req, res) => {
  /*
    Wait for the validation middleware to complete its execution for 
    the provided rules, and then continue with the rest of the code.
    */
  try {
    await validateRegister(req, res);
    const { username, password } = req.body;
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO "app_user" (username, password_hash, selected_currency_id, monthly_totals) VALUES ($1, $2, $3, $4)',
      [username, hashedPassword, 2, {}]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = error.errors.map((err) => err.msg);
      return res
        .status(401)
        .json({ message: "Validation failed", errors: errorMessages });
    } else {
      console.error(error);
      res.status(500).json({ message: "Registration failed" });
    }
  }
};

exports.login = async (req, res) => {
  console.log("Received Headers:", req.headers);
  try {
    await validateLogin(req, res);

    const { username, password } = req.body;
    console.log("Req body", username, password);
    // Retrieve the user from the database
    const result = await db.query(
      "SELECT * FROM app_user WHERE username = $1",
      [username]
    );
    console.log("Result:", result);

    if (result.length === 0) {
      return res.status(401).json({ message: "Incorrect username!" });
    }

    const user = result[0];
    // Compare the hashed input password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    // Generate a JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = error.errors.map((err) => err.msg);
      return res
        .status(401)
        .json({ message: "Validation failed", errors: errorMessages });
    } else {
      return res.status(500).json({ message: "Authentication failed" });
    }
  }
};

exports.getProfile = async (req, res) => {
  const loggedUser = req.user;
  res.json({ loggedUser });
};

exports.updatePassword = async (req, res) => {
  try {
    await validateUpdatePassword(req, res);

    const loggedUserId = req.user.id;
    console.log("userID, ", loggedUserId);
    const { oldPassword, newPassword } = req.body;
    console.log("Req body", req.body);

    //if (!oldPassword || !newPassword) {
    //return res.status(400).json({ message: 'Old and new passwords are required' });
    //}

    const result = await db.query("SELECT * FROM app_user WHERE id = $1", [
      loggedUserId,
    ]);
    if (!result) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result[0];
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect old password" });
    }
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query("UPDATE app_user SET password_hash = $1 WHERE id = $2", [
      hashedPassword,
      loggedUserId,
    ]);
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = error.errors.map((err) => err.msg);
      return res
        .status(401)
        .json({ message: "Validation failed", errors: errorMessages });
    } else {
      console.error(error);
      res.status(500).json({ message: "Password update failed" });
    }
  }
};
