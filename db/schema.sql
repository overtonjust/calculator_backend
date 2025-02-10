DROP DATABASE IF EXISTS calc_dev;
CREATE DATABASE calc_dev;

\c calc_dev;

CREATE TABLE history_dates (
    id SERIAL PRIMARY KEY,
    time_recorded DATE NOT NULL UNIQUE
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    time_recorded DATE NOT NULL DEFAULT CURRENT_DATE,
    calculation TEXT NOT NULL,
    history_date_id INT REFERENCES history_dates(id)
);



