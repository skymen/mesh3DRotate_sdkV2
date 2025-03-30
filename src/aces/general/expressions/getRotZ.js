export const config = {
  id: "rotZ",
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the Z rotation of the object",
  params: [],
};

export const expose = true;

export default function () {
  return this.lastEuler.z;
}
