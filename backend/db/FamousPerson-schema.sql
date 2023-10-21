CREATE TABLE famous_people (
    PersonID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    years_of_living VARCHAR(50) NOT NULL,
    profession VARCHAR(255),
    music_instrument VARCHAR(255)
);
