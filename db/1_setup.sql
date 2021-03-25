DROP TABLE IF EXISTS mountains;

CREATE TABLE moutains (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    height int NOT NULL,
    country varchar(255) NOT NULL,
    firstSummt DATE NOT NULL
);