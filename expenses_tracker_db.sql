
-- Table: currency
CREATE TABLE currency (
    id serial PRIMARY KEY,
    code varchar(3) NOT NULL,
    name varchar(50) NOT NULL
    symbol char(1) NOT NULL
);

-- Table: user
CREATE TABLE "user" (
    id serial PRIMARY KEY,
    username varchar(10) NOT NULL,
    password_hash varchar(10) NOT NULL,
    selected_currency_id int NOT NULL DEFAULT 1, -- Default currency or any other default ID
    FOREIGN KEY (selected_currency_id) REFERENCES currency(id)
);

-- Table: expense
CREATE TABLE expense (
    id serial PRIMARY KEY,
    expense_date date NOT NULL,
    description varchar(255) NOT NULL,
    amount money NOT NULL,
    payment_method int NOT NULL,
    user_id int NOT NULL,
    selected_currency_id int NOT NULL, -- Currency for this expense
    FOREIGN KEY (user_id) REFERENCES "user"(id),
    FOREIGN KEY (selected_currency_id) REFERENCES currency(id)
);

CREATE TABLE payment_methods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Table: expense_category
CREATE TABLE expense_category (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL,
    user_id int NOT NULL,
    expense_id int NOT NULL, -- Reference to the expense
    FOREIGN KEY (user_id) REFERENCES "user"(id),
    FOREIGN KEY (expense_id) REFERENCES expense(id)
);

-- Table: income
CREATE TABLE income (
    id serial PRIMARY KEY,
    income_date date NOT NULL,
    amount money NOT NULL,
    description varchar(255) NOT NULL,
    user_id int NOT NULL,
    selected_currency_id int NOT NULL, -- Currency for this income
    FOREIGN KEY (user_id) REFERENCES "user"(id),
    FOREIGN KEY (selected_currency_id) REFERENCES currency(id)
);
