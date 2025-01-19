export const config = {
  highlight: false,
  listName: "Set Use New Size",
  displayText: "{my}: Set use new size [i]{0}[/i]",
  description: "Set the use new size of the object",
  params: [
    {
      id: "useNewSize",
      name: "Use New Size",
      desc: "Use New Size",
      type: "boolean",
      initialValue: "true",
    },
  ],
};

export const expose = true;

export default function (useNewSize) {
  this.useNewSize = useNewSize;
}
