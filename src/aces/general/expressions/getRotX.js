export const config = {
  id: "rotX",
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the X rotation of the object",
  params: [],
};

export const expose = true;

export default function () {
  return this.lastEuler.x;
}
