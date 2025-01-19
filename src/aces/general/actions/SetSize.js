export const config = {
  highlight: false,
  listName: "Set Size",
  displayText: "{my}: Set size [i]{0}[/i], [i]{1}[/i]",
  description: "Set the size of the object",
  params: [
    {
      id: "width",
      name: "Width",
      desc: "Width",
      type: "number",
      initialValue: 0,
    },
    {
      id: "height",
      name: "Height",
      desc: "Height",
      type: "number",
      initialValue: 0,
    },
  ],
};

export const expose = true;

export default function (width, height) {
  this.width = width;
  this.height = height;
}
