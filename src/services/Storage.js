import Database from "tauri-plugin-sql-api";

// let db = null;

async function connect() {
  try {
    let db = await Database.load("sqlite:test.db");
    return db;
  } catch (err) {
    console.log(err);
  }
}

async function all() {
  const db = await connect();
  return await db.select("SELECT * FROM todos");
}

async function getDaysSmoked() {
  const db = await connect();

  const date = await db.execute("SELECT date_stopped_smoking FROM user_info");

  return date;
}

async function changeDaysSmoked(newDate) {
  const db = await connect();
  const date = await db.execute("INSERT INTO user_info (date_stopped_smoking) VALUES ($1)", [newDate]);

  return {
    date_stopped_smoking: date,
  }
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
  getDaysSmoked,
  changeDaysSmoked
};
