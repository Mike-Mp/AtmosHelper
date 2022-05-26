import Database from "tauri-plugin-sql-api";

async function connect() {
  try {
    let db = await Database.load("sqlite:test.db");
    return db;
  } catch (err) {
    console.log(err);
  }
}

async function all(offset) {
  const db = await connect();
  return await db.select(
    "SELECT flavors.flavor_name, flavors.brand_id, flavors.id, brands.brand_name FROM flavors JOIN brands on flavors.brand_id = brands.id limit 9 offset ?",
    [offset]
  );
}

async function fromBrandName(offset, brandName) {
  const db = await connect();
  return await db.select(
    "SELECT * FROM flavors limit 9 offset ? WHERE brand_name = ?",
    [offset, brandName]
  );
}

async function getBrands() {
  const db = await connect();
  return await db.select("SELECT * FROM brands");
}

async function getFlavor(id) {
  const db = await connect();
  return await db.select("SELECT * FROM flavors WHERE id = ?", [parseInt(id)]);
}

async function getDaysSmoked() {
  const db = await connect();

  const date = await db.execute("SELECT date_stopped_smoking FROM user_info");

  return date;
}

async function changeDaysSmoked(newDate) {
  const db = await connect();
  const date = await db.execute(
    "INSERT INTO user_info (date_stopped_smoking) VALUES ($1)",
    [newDate]
  );

  return {
    date_stopped_smoking: date,
  };
}

async function create(title) {
  const db = await connect();
  const { lastInsertId } = await db.execute(
    "INSERT INTO todos (title) VALUES ($1)",
    [title]
  );

  return {
    id: lastInsertId,
    title,
    completed: false,
  };
}

export default {
  all,
  create,
  fromBrandName,
  getBrands,
  getFlavor,
  getDaysSmoked,
  changeDaysSmoked,
};
