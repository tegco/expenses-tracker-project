const { body, validationResult, check } = require("express-validator");

const validate = (validationRules) => async (req) => {
  await Promise.all(
    validationRules.map((validationRule) => validationRule.run(req))
  );
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validationError = new Error("Validation failed.");
    validationError.name = "ValidationError";
    validationError.errors = errors.array();
    throw validationError;
  }
};

const registerValidationRules = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3, max: 10 })
    .withMessage("Username must be between 3 and 10 characters."),

  body("password").notEmpty().withMessage("Password is required."),
];

const loginValidationRules = [
  body("username").notEmpty().withMessage("Username is required."),
  body("password").notEmpty().withMessage("Password is required."),
];

const updatePasswordValidationRules = [
  body("oldPassword").notEmpty().withMessage("Old password is required."),
  body("newPassword").notEmpty().withMessage("New password is required."),
  check("newPassword").custom((value, { req }) => {
    if (value === req.body.oldPassword) {
      throw new Error("Old and new password can't be the same.");
    }
    return true;
  }),
];

const createOrUpdateIncomeValidationRules = [
  body("income_date")
    .notEmpty()
    .withMessage("Income date is required.")
    .isDate({ strict: true })
    .withMessage("Invalid date format.")
    .custom((value) => {
      const currentDate = new Date();
      const inputDate = new Date(value);

      if (inputDate > currentDate) {
        throw new Error("Date must be today or before today.");
      }
      return true;
    }),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isNumeric()
    .withMessage("Invalid amount format: only numbers allowed."),

  body("description")
    .isLength({ max: 255 })
    .withMessage("Maximum of 255 characters."),
];

const createOrUpdateExpenseValidationRules = [
  body("expense_date")
    .notEmpty()
    .withMessage("Expense date is required.")
    .isDate({ strict: true })
    .withMessage("Invalid date format.")
    .custom((value) => {
      const currentDate = new Date();
      const inputDate = new Date(value);

      if (inputDate > currentDate) {
        throw new Error("Date must be today or before today.");
      }
      return true;
    }),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Invalid amount format: only numbers allowed."),

  body("description")
    .isLength({ max: 255 })
    .withMessage("Maximum of 255 characters."),

  body("payment_method_id")
    .notEmpty()
    .withMessage("Payment method is required.")
    .isInt()
    .withMessage("Invalid payment method ID."),

  body("category_id")
    .notEmpty()
    .withMessage("Category ID is required.")
    .isInt()
    .withMessage("Invalid category ID."),
];

const validateRegister = validate(registerValidationRules);
const validateLogin = validate(loginValidationRules);
const validateUpdatePassword = validate(updatePasswordValidationRules);
const validateCreateOrUpdateIncome = validate(
  createOrUpdateIncomeValidationRules
);
const validateCreateOrUpdateExpense = validate(
  createOrUpdateExpenseValidationRules
);

module.exports = {
  validate,
  validateRegister,
  validateLogin,
  validateUpdatePassword,
  validateCreateOrUpdateIncome,
  validateCreateOrUpdateExpense,
};
