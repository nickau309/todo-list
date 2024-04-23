export function adjustChildOrder(items) {
  items
    .sort((a, b) => a.childOrder - b.childOrder)
    .forEach((item, i) => {
      item.childOrder = i;
    });
}

export function generateId() {
  return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
}
