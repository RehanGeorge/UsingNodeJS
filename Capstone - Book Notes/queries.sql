CREATE TABLE book (
	id SERIAL PRIMARY KEY UNIQUE,
	title VARCHAR(100),
	notes TEXT,
	rating INTEGER,
	cover TEXT
);

INSERT INTO book (title, notes, rating, cover)
VALUES ('The Great Gatsby', 'A classic', 5, 'blank for now');