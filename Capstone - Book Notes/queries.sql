CREATE TABLE book (
	id SERIAL PRIMARY KEY UNIQUE,
	title VARCHAR(100),
	notes TEXT,
	rating INTEGER,
	cover TEXT
);