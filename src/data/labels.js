import localforage from "localforage";
import { generateId } from "./general";

function cleanLabelData({ ...data }) {
  if (data.id) {
    throw new Error("Label's id cannot be modified directly.");
  }

  if (data.childOrder) {
    throw new Error("Label's child order cannot be modified directly.");
  }

  return data;
}

async function generateLabelId() {
  const labels = await getLabels();
  let id;
  do {
    id = "4" + generateId();
  } while (labels.some((p) => p.id === id));
  return id;
}

export async function addLabel({ ...rawData }) {
  const data = cleanLabelData(rawData);

  const labels = await getLabels();

  // Get correct location of label
  let childOrder = labels.length;

  // Create label
  const label = {
    id: await generateLabelId(),
    childOrder,
    name: "",
    color: "Charcoal",
    ...data,
  };
  labels.push(label);

  // Set labels
  await setLabels(labels);

  return label;
}

export async function getLabels() {
  return await localforage.getItem("labels");
}

async function setLabels(labels) {
  return await localforage.setItem("labels", labels);
}

// Initialize
const keys = await localforage.keys();

if (!keys.includes("labels")) {
  await setLabels([]);
}
