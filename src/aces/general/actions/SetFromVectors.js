export const config = {
  highlight: false,
  listName: "Set Rotation From Vectors",
  displayText:
    "{my}: Set from vectors up ([i]{0}[/i], [i]{1}[/i], [i]{2}[/i]) forward ([i]{3}[/i], [i]{4}[/i], [i]{5}[/i])",
  description: "Set the rotation of the object from up and forward vectors",
  params: [
    {
      id: "upX",
      name: "Up X",
      desc: "Up X",
      type: "number",
      initialValue: "0",
    },
    {
      id: "upY",
      name: "Up Y",
      desc: "Up Y",
      type: "number",
      initialValue: "0",
    },
    {
      id: "upZ",
      name: "Up Z",
      desc: "Up Z",
      type: "number",
      initialValue: "1",
    },
    {
      id: "forwardX",
      name: "Forward X",
      desc: "Forward X",
      type: "number",
      initialValue: "",
    },
    {
      id: "forwardY",
      name: "Forward Y",
      desc: "Forward Y",
      type: "number",
      initialValue: "",
    },
    {
      id: "forwardZ",
      name: "Forward Z",
      desc: "Forward Z",
      type: "number",
      initialValue: "",
    },
  ],
};

export const expose = true;

export default function (upx, upy, upz, forwardx, forwardy, forwardz) {
  this._SetMeshFromPoints(
    this._getRectanglePoints([upx, upy, upz], [forwardx, forwardy, forwardz])
  );
}
