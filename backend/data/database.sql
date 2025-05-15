-- \i data/database.sql
DROP TABLE times;
DROP TABLE notes;
DROP TABLE events;
DROP TABLE categories;
DROP TABLE users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO users (name) VALUES('developer');

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25)
);

INSERT INTO categories(name)
VALUES
    ('Butterfly'),
    ('Backstroke'),
    ('Breastroke'),
    ('Freestyle'),
    ('Individual Medley');

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    category_id INT,
    name VARCHAR(25) NOT NULL,
    olympic BOOLEAN,
    FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO events(name, olympic, category_id)
VALUES
    ('50 Free', FALSE, 4),
    ('50 Free', TRUE, 4),
    ('100 Free', FALSE, 4),
    ('100 Free', TRUE, 4),
    ('200 Free', FALSE, 4),
    ('200 Free', TRUE, 4),
    ('400 Free', TRUE, 4),
    ('500 Free', FALSE, 4),
    ('1500 Free', TRUE, 4),
    ('1650 Free', FALSE, 4),
    ('50 Back', FALSE, 2),
    ('50 Back', TRUE, 2),
    ('100 Back', FALSE, 2),
    ('100 Back', TRUE, 2),
    ('200 Back', FALSE, 2),
    ('200 Back', TRUE, 2),
    ('50 Breast', FALSE, 3),
    ('50 Breast', TRUE, 3),
    ('100 Breast', FALSE, 3),
    ('100 Breast', TRUE, 3),
    ('200 Breast', FALSE, 3),
    ('200 Breast', TRUE, 3),
    ('50 Fly', FALSE, 1),
    ('50 Fly', TRUE, 1),
    ('100 Fly', FALSE, 1),
    ('100 Fly', TRUE, 1),
    ('200 Fly', FALSE, 1),
    ('200 Fly', TRUE, 1),
    ('100 IM', FALSE, 5),
    ('100 IM', TRUE, 5),
    ('200 IM', FALSE, 5),
    ('200 IM', TRUE, 5),
    ('400 IM', FALSE, 5),
    ('400 IM', TRUE, 5);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    text TEXT,
    user_id INT,
    event_id INT,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE
);

INSERT INTO notes (text, user_id, event_id)
VALUES('Need to work on keeping everything narrow', 1, 20);

CREATE TABLE times (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    time FLOAT NOT NULL,
    date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

INSERT INTO times(event_id, user_id, time, date)
VALUES
    (20, 1, 70.84, '2020-03-24'),
    (20, 1, 71.10, '2020-01-07');