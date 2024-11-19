CREATE TABLE user_accounts (
  id SERIAL PRIMARY KEY,
  photo TEXT,
  name VARCHAR(100),
  username VARCHAR(50),
  country VARCHAR(50),
  email VARCHAR(100),
  account_type VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
