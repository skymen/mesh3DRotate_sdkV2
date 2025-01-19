export const config = {
  highlight: false,
  listName: "Set Euler Rotation",
  displayText: "{my}: Set euler rotation [i]{0}[/i], [i]{1}[/i], [i]{2}[/i]",
  description: "Set the rotation of the object from euler angles",
  params: [
    {
      id: "rotx",
      name: "Rotation X",
      desc: "Rotation X",
      type: "number",
      initialValue: 0,
    },
    {
      id: "roty",
      name: "Rotation Y",
      desc: "Rotation Y",
      type: "number",
      initialValue: 0,
    },
    {
      id: "rotz",
      name: "Rotation Z",
      desc: "Rotation Z",
      type: "number",
      initialValue: 0,
    },
  ],
};

export const expose = true;

export default function (x, y, z) {
  this._SetMeshFromPoints(
    this._getRectanglePointsFromEuler({
      x: x,
      y: y,
      z: z,
    })
  );
}
