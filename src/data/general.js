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

export function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
