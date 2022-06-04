import Storage from "./Storage";

export async function init(offset) {
  const items = await Storage.all(offset);
  return items;
}

export async function getBrands() {
  const items = await Storage.getBrands();
  return items;
}

export async function fromBrandName(offset, brandName) {
  const items = await Storage.fromBrandName(offset, brandName);
  return items;
}

export async function getFlavor(id) {
  const items = await Storage.getFlavor(id);
  return items[0];
}

export async function add(newItem) {
  const item = await Storage.create(newItem);
  return item;
}

export async function edit(newItem, item_id) {
  const item = await Storage.edit(newItem, item_id);
  return item;
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