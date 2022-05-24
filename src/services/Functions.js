import Storage from "./Storage";

export async function init(offset) {
  const items = await Storage.all(offset);
  return items;
}

export async function fromBrandName(offset, brandName) {
  const items = await Storage.fromBrandName(offset, brandName);
  return items;
}

export async function add(title) {
  const newTodo = await Storage.create(title);
  return newTodo;
}

// PUT IN DIFFERENT FILE
export async function getDaysSmoked() {
  const date = await Storage.getDaysSmoked();
  return date;
}

export async function changeDaysSmoked(newDate) {
  const date = await Storage.changeDaysSmoked(newDate);
  return date;
}