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
    "SELECT flavors.flavor_name, flavors.brand_id, flavors.id, flavors.liked, flavors.notes, flavors.amount, brands.brand_name FROM flavors JOIN brands on flavors.brand_id = brands.id limit 9 offset ?",
    [offset]
  );
}

async function fromBrandName(offset, brandName) {
  const db = await connect();
  return await db.select(
    "SELECT * FROM flavors limit 9 offset ? WHERE brand_name LIKE ?",
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

async function create(newItem) {
  const db = await connect();
  let brand_id;
  let returnedItem;

  console.log(newItem);
  if (newItem.brand_name.length > 0) {
    try {
      // const brand_exist = await db.select(
      //   `SELECT id, brand_name FROM brands WHERE brand_name = '${newItem.brand_name}'`,
      // );

      const brand_exist = await db.select(
        `SELECT id, brand_name FROM brands WHERE brand_name = ?`,
        [newItem.brand_name]
      );

      console.log(brand_exist);

      if (brand_exist.length > 0) {
        throw new Error('Brand already exists');
      }

      brand_id = await db.execute(
        "INSERT INTO brands (brand_name) VALUES ($1)",
        [newItem.brand_name]
      );

      returnedItem = await db.execute(
        `INSERT INTO flavors (amount, brand_id, flavor_name, liked, notes)
      VALUES (?, ?, ?, ?, ?)`,
        [
          newItem.amount,
          brand_id.lastInsertId,
          newItem.flavor_name,
          newItem.liked ? 1 : 0,
          newItem.notes,
        ]
      );
    } catch (err) {
      console.log("create error");
      return err;
    }
  } else {
    try {
      returnedItem = await db.execute(
        `INSERT INTO flavors (amount, brand_id, flavor_name, liked, notes) 
      VALUES (?, ?, ?, ?, ?)`,
        [
          newItem.amount,
          newItem.brand_id,
          newItem.flavor_name,
          newItem.liked ? 1 : 0,
          newItem.notes,
        ]
      );
    } catch (err) {
      console.log(err);
    }
  }

  return returnedItem;
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
