export const config = {
  highlight: false,
  deprecated: false,
  returnType: "number",
  description: "Get the width of the object",
  params: [],
};

export const expose = true;

export default function () {
  return this.useNewSize ? this.width : this.instance.width;
}
