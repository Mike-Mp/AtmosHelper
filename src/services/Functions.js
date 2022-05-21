import Storage from "./Storage";

async function initDB() {
  try {
    await Storage.connect();
  } catch (e) {
    console.log(e);
  }
}

export async function init() {
  const todos = await Storage.all();
  return todos;
}

export async function getDaysSmoked() {
  const date = await Storage.getDaysSmoked();
  return date;
}

export async function changeDaysSmoked(newDate) {
  const date = await Storage.changeDaysSmoked(newDate);
  return date;
}

export async function add(title) {
  const newTodo = await Storage.create(title);
  return newTodo;
}
