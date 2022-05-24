DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS flavors;

CREATE TABLE user_info (
    date_stopped_smoking DATE NOT NULL
);

CREATE TABLE brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_name TEXT NOT NULL
);

CREATE TABLE flavors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flavor_name TEXT NOT NULL,
    color TEXT NULL,
    notes TEXT NULL,
    brand_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    created NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands (id)
);

INSERT INTO brands (brand_name)
VALUES('BigVape');

INSERT INTO flavors (brand_id, flavor_name, amount, notes)
VALUES
    (1, "Strawberry Lemon", 2, "enjoyable"),
    (1, "Chocolate Lemon", 1, "Interesting mix of flavors"),
    (1, "Cocoa Mango", 3, "this sucks completely"),
    (1, "Tzatziki Pie", 10, "Vaping this with pita gyro"),
    (1, "Melon Pie", 5, "good");