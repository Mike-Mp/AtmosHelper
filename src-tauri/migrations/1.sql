DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS flavors;

CREATE TABLE user_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_stopped_smoking DATE NOT NULL
);

CREATE TABLE brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_name TEXT NOT NULL UNIQUE 
);

CREATE TABLE flavors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_id INTEGER NOT NULL,
    flavor_name TEXT NOT NULL,
    liked BOOLEAN NULL CHECK (liked IN (0, 1)),
    notes TEXT NULL,
    amount INTEGER NOT NULL,
    created NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands (id)
);

INSERT INTO brands (brand_name)
VALUES
    ('BigVape'),
    ('AtmosLab');

INSERT INTO flavors (brand_id, flavor_name, amount, notes, liked)
VALUES
    (1, "Strawberry Lemon", 2, "enjoyable", 1),
    (2, "Chocolate Lemon", 1, "Interesting mix of flavors", 1),
    (1, "Cocoa Mango", 3, "this sucks completely", 0),
    (2, "Tzatziki Pie", 10, "Vaping this with pita gyro", 1),
    (1, "Melon Pie", 5, "good", 1);
