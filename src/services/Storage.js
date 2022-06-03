import Database from "tauri-plugin-sql-api";
import { dateFormatter, dayGetter } from "../utils/helperFunctions";

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
  const date = await db.select("SELECT * FROM user_info WHERE id = 1").then(res=>res[0].date_stopped_smoking);
  if (!date) return [dateFormatter(), 0];
  
  const days = dayGetter(date);
  return [date, days];
}

async function changeDaysSmoked(newDate) {
  const db = await connect();
  console.log('changeDaysSmoked', newDate);
  const item_update = await db.execute(
    "UPDATE user_info SET date_stopped_smoking = ? WHERE id = 1",
    [newDate]
  );

  if (item_update.rowsAffected === 0) {
    await db.execute("INSERT INTO user_info (date_stopped_smoking) VALUES (?)", [newDate])
  }

  const totalDays = dayGetter(newDate);

  return totalDays;
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
