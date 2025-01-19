export const config = {
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the height of the object",
  params: [],
};

export const expose = true;

export default function () {
  return this.useNewSize ? this.height : this.instance.height;
}
