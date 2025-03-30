export const config = {
  id: "rotY",
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the Y rotation of the object",
  params: [],
};

export const expose = true;

export default function () {
  return this.lastEuler.y;
}
