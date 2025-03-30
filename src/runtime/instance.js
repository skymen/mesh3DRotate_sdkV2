import { id } from "../../config.caw.js";

export default function (parentClass) {
  return class extends parentClass {
    constructor() {
      super();
      const properties = this._getInitProperties();
      this.useNewSize = false;
      this.width = 0;
      this.height = 0;
      this.lastUp = {
        x: 0,
        y: -1,
        z: 0,
      };
      this.lastForward = {
        x: 0,
        y: 0,
        z: 1,
      };

      this.lastEuler = {
        x: 0,
        y: 0,
        z: 0,
      };

      this.tempQuad = C3.New(C3.Quad);
      this._init_rotX = 0;
      this._init_rotY = 0;
      this._init_rotZ = 0;
      if (properties) {
        this._init_rotX = properties[0];
        this._init_rotY = properties[1];
        this._init_rotZ = properties[2];
        this.useNewSize = properties[3];
        this.width = properties[4];
        this.height = properties[5];
      }
    }

    _postCreate() {
      this._SetMeshFromPoints(
        this._getRectanglePointsFromEuler({
          x: this._init_rotX,
          y: this._init_rotY,
          z: this._init_rotZ,
        })
      );
    }

    _trigger(method) {
      super._trigger(self.C3.Plugins[id].Cnds[method]);
    }

    _release() {
      super._release();
    }

    _saveToJson() {
      return {
        useNewSize: this.useNewSize,
        width: this.width,
        height: this.height,
        lastUpX: this.lastUp.x,
        lastUpY: this.lastUp.y,
        lastUpZ: this.lastUp.z,
        lastForwardX: this.lastForward.x,
        lastForwardY: this.lastForward.y,
        lastForwardZ: this.lastForward.z,
        lastEulerX: this.lastEuler.x,
        lastEulerY: this.lastEuler.y,
        lastEulerZ: this.lastEuler.z,
      };
    }

    _loadFromJson(o) {
      this.useNewSize = o.useNewSize;
      this.width = o.width;
      this.height = o.height;
      this.lastUp = {
        x: o.lastUpX,
        y: o.lastUpY,
        z: o.lastUpZ,
      };
      this.lastForward = {
        x: o.lastForwardX,
        y: o.lastForwardY,
        z: o.lastForwardZ,
      };
      this.lastEuler = {
        x: o.lastEulerX,
        y: o.lastEulerY,
        z: o.lastEulerZ,
      };
    }

    // ====================================================================

    _UpdateRectangleFromLastVectors() {
      this._SetMeshFromPoints(
        this._getRectanglePoints(this.lastUp, this.lastForward)
      );
    }

    isMeshCorrect() {
      const [width, height] = this.instance.getMeshSize();
      return width === 2 && height === 2;
    }

    interpolateQuad(u, v, quad) {
      // Extract the top-left corner position
      const topLeftX = quad.p1.x;
      const topLeftY = quad.p1.y;

      // Compute the edge vectors
      const topEdgeX = quad.p2.x - topLeftX;
      const topEdgeY = quad.p2.y - topLeftY;
      const leftEdgeX = quad.p4.x - topLeftX;
      const leftEdgeY = quad.p4.y - topLeftY;

      // Compute interpolated position
      const x = topLeftX + topEdgeX * u + leftEdgeX * v;
      const y = topLeftY + topEdgeY * u + leftEdgeY * v;

      return [x, y];
    }

    inverseInterpolateQuad(xWorld, yWorld, quad) {
      // Extract the corner coordinates
      const tlx = quad.p1.x,
        tly = quad.p1.y;
      const trx = quad.p2.x,
        try_ = quad.p2.y;
      const blx = quad.p4.x,
        bly = quad.p4.y;

      // Compute the vectors
      const dxT = trx - tlx,
        dyT = try_ - tly;
      const dxB = blx - tlx,
        dyB = bly - tly;

      // Compute the relative position of (xWorld, yWorld)
      const dx = xWorld - tlx,
        dy = yWorld - tly;

      // Solve for (t, e) using Cramer's Rule
      const det = dxT * dyB - dyT * dxB; // Determinant of the transformation matrix

      if (Math.abs(det) < 1e-6) {
        throw new Error(
          "Degenerate quad transformation (determinant is too close to zero)."
        );
      }

      // Compute the inverse matrix components
      const t = (dx * dyB - dy * dxB) / det;
      const e = (dy * dxT - dx * dyT) / det;

      return [t, e]; // Return normalized coordinates
    }

    updateBbox() {
      this.tempQuad = this.instance.getBoundingQuad(true);
    }

    worldPosToRelative(x, y) {
      const [t, e] = this.inverseInterpolateQuad(x, y, this.tempQuad);
      return [t, e];
    }

    _SetMeshFromPoints(points) {
      let inst = this.instance;
      if (!this.isMeshCorrect()) {
        inst.createMesh(2, 2);
      }
      this.updateBbox();
      [points.topLeft[0], points.topLeft[1]] = this.worldPosToRelative(
        points.topLeft[0] + inst.x,
        points.topLeft[1] + inst.y
      );
      [points.topRight[0], points.topRight[1]] = this.worldPosToRelative(
        points.topRight[0] + inst.x,
        points.topRight[1] + inst.y
      );
      [points.bottomLeft[0], points.bottomLeft[1]] = this.worldPosToRelative(
        points.bottomLeft[0] + inst.x,
        points.bottomLeft[1] + inst.y
      );
      [points.bottomRight[0], points.bottomRight[1]] = this.worldPosToRelative(
        points.bottomRight[0] + inst.x,
        points.bottomRight[1] + inst.y
      );
      inst.setMeshPoint(0, 0, {
        x: points.topLeft[0],
        y: points.topLeft[1],
        zElevation: points.topLeft[2],
      });
      inst.setMeshPoint(0, 1, {
        x: points.topRight[0],
        y: points.topRight[1],
        zElevation: points.topRight[2],
      });
      inst.setMeshPoint(1, 0, {
        x: points.bottomLeft[0],
        y: points.bottomLeft[1],
        zElevation: points.bottomLeft[2],
      });
      inst.setMeshPoint(1, 1, {
        x: points.bottomRight[0],
        y: points.bottomRight[1],
        zElevation: points.bottomRight[2],
      });
    }

    _adjustPointsOnZAxis(points) {
      let minZ = points.topLeft[2];
      minZ = Math.min(minZ, points.topRight[2]);
      minZ = Math.min(minZ, points.bottomLeft[2]);
      minZ = Math.min(minZ, points.bottomRight[2]);

      points.topLeft[2] -= minZ;
      points.topRight[2] -= minZ;
      points.bottomLeft[2] -= minZ;
      points.bottomRight[2] -= minZ;

      return points;
    }

    _getRectanglePoints(up, forward) {
      this.lastUp = up;
      this.lastForward = forward;
      this.lastEuler = this.getEulerAngles();
      let width = this.getWidth();
      let height = this.getHeight();
      // Normalize the up and forward vectors
      function normalize(vector) {
        const length = Math.sqrt(
          vector[0] ** 2 + vector[1] ** 2 + vector[2] ** 2
        );
        return [vector[0] / length, vector[1] / length, vector[2] / length];
      }

      up = normalize(up);
      forward = normalize(forward);

      // Calculate the right vector as the cross product of forward and up
      function crossProduct(a, b) {
        return [
          a[1] * b[2] - a[2] * b[1],
          a[2] * b[0] - a[0] * b[2],
          a[0] * b[1] - a[1] * b[0],
        ];
      }

      const right = crossProduct(forward, up);

      // Calculate the half dimensions
      const halfWidth = width / 2;
      const halfHeight = height / 2;

      // Calculate the corner points
      const topLeft = [
        -right[0] * halfWidth + up[0] * halfHeight,
        -right[1] * halfWidth + up[1] * halfHeight,
        -right[2] * halfWidth + up[2] * halfHeight,
      ];

      const topRight = [
        -right[0] * halfWidth - up[0] * halfHeight,
        -right[1] * halfWidth - up[1] * halfHeight,
        -right[2] * halfWidth - up[2] * halfHeight,
      ];

      const bottomLeft = [
        right[0] * halfWidth + up[0] * halfHeight,
        right[1] * halfWidth + up[1] * halfHeight,
        right[2] * halfWidth + up[2] * halfHeight,
      ];

      const bottomRight = [
        right[0] * halfWidth - up[0] * halfHeight,
        right[1] * halfWidth - up[1] * halfHeight,
        right[2] * halfWidth - up[2] * halfHeight,
      ];

      return this._adjustPointsOnZAxis({
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
      });
    }

    _getVectorsFromEuler(euler) {
      // Convert Euler angles (in degrees) to radians
      function toRadians(degrees) {
        return degrees * (Math.PI / 180);
      }

      const pitch = toRadians(euler.x);
      const yaw = toRadians(euler.y);
      const roll = toRadians(euler.z);

      // Calculate rotation matrices for pitch, yaw, and roll
      function getRotationMatrix(pitch, yaw, roll) {
        const cosPitch = Math.cos(pitch);
        const sinPitch = Math.sin(pitch);
        const cosYaw = Math.cos(yaw);
        const sinYaw = Math.sin(yaw);
        const cosRoll = Math.cos(roll);
        const sinRoll = Math.sin(roll);

        return [
          [cosYaw * cosRoll, cosYaw * sinRoll, -sinYaw],
          [
            sinPitch * sinYaw * cosRoll - cosPitch * sinRoll,
            sinPitch * sinYaw * sinRoll + cosPitch * cosRoll,
            sinPitch * cosYaw,
          ],
          [
            cosPitch * sinYaw * cosRoll + sinPitch * sinRoll,
            cosPitch * sinYaw * sinRoll - sinPitch * cosRoll,
            cosPitch * cosYaw,
          ],
        ];
      }

      const rotationMatrix = getRotationMatrix(pitch, yaw, roll);

      // Transform a vector using a rotation matrix
      function transformVector(vector, matrix) {
        return [
          vector[0] * matrix[0][0] +
            vector[1] * matrix[0][1] +
            vector[2] * matrix[0][2],
          vector[0] * matrix[1][0] +
            vector[1] * matrix[1][1] +
            vector[2] * matrix[1][2],
          vector[0] * matrix[2][0] +
            vector[1] * matrix[2][1] +
            vector[2] * matrix[2][2],
        ];
      }

      // Default up and right vectors
      const up = [0, -1, 0];
      const forward = [0, 0, 1];

      // Transform up and right vectors using the rotation matrix
      const transformedUp = transformVector(up, rotationMatrix);
      const transformedForward = transformVector(forward, rotationMatrix);

      return {
        up: transformedUp,
        forward: transformedForward,
      };
    }

    _getRectanglePointsFromEuler(euler) {
      const vectors = this._getVectorsFromEuler(euler);
      return this._getRectanglePoints(vectors.up, vectors.forward);
    }

    getEulerAngles() {
      const up = this.lastUp;
      const forward = this.lastForward;

      // Calculate Euler angles from the up and forward vectors
      function calculateEulerAngles(up, forward) {
        const pitch = Math.asin(-up[1]);
        const yaw = Math.atan2(forward[0], forward[2]);
        const roll = Math.atan2(up[0], up[2]);

        return {
          x: (pitch * 180) / Math.PI,
          y: (yaw * 180) / Math.PI,
          z: (roll * 180) / Math.PI,
        };
      }

      return calculateEulerAngles(up, forward);
    }
  };
}
