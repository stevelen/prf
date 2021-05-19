DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions(id serial PRIMARY KEY, item_id INTEGER, transaction_date VARCHAR(255), price INTEGER);
DROP SEQUENCE IF EXISTS hibernate_sequence;
CREATE SEQUENCE hibernate_sequence START 1;