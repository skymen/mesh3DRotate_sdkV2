import {
  ADDON_CATEGORY,
  ADDON_TYPE,
  PLUGIN_TYPE,
  PROPERTY_TYPE,
} from "./template/enums.js";
import _version from "./version.js";
export const addonType = ADDON_TYPE.BEHAVIOR;
export const type = PLUGIN_TYPE.OBJECT;
export const id = "skymen_mesh_rotate";
export const name = "Mesh Rotate";
export const version = _version;
export const author = "skymen";
export const website = "https://github.com/skymen/mesh3DRotate_sdkV2";
export const documentation =
  "https://www.construct.net/en/make-games/addons/1273/mesh-3d-rotate/documentation";
export const description = "Rotate an object using the mesh points";
export const category = ADDON_CATEGORY.GENERAL;

export const hasDomside = false;
export const files = {
  extensionScript: {},
  fileDependencies: [],
};

// categories that are not filled will use the folder name
export const aceCategories = {};

export const info = {
  // icon: "icon.svg",
  // PLUGIN world only
  // defaultImageUrl: "default-image.png",
  Set: {
    // COMMON to all
    CanBeBundled: true,
    IsDeprecated: false,
    GooglePlayServicesEnabled: false,

    // BEHAVIOR only
    IsOnlyOneAllowed: true,

    // PLUGIN world only
    IsResizable: false,
    IsRotatable: false,
    Is3D: false,
    HasImage: false,
    IsTiled: false,
    SupportsZElevation: false,
    SupportsColor: false,
    SupportsEffects: false,
    MustPreDraw: false,

    // PLUGIN object only
    IsSingleGlobal: false,
  },
  // PLUGIN only
  AddCommonACEs: {
    Position: false,
    SceneGraph: false,
    Size: false,
    Angle: false,
    Appearance: false,
    ZOrder: false,
  },
};

export const properties = [
  /*
  {
    type: PROPERTY_TYPE.INTEGER,
    id: "property_id",
    options: {
      initialValue: 0,
      interpolatable: false,

      // minValue: 0, // omit to disable
      // maxValue: 100, // omit to disable

      // for type combo only
      // items: [
      //   {itemId1: "item name1" },
      //   {itemId2: "item name2" },
      // ],

      // dragSpeedMultiplier: 1, // omit to disable

      // for type object only
      // allowedPluginIds: ["Sprite", "<world>"],

      // for type link only
      // linkCallback: function(instOrObj) {},
      // linkText: "Link Text",
      // callbackType:
      //   "for-each-instance"
      //   "once-for-type"

      // for type info only
      // infoCallback: function(inst) {},
    },
    name: "Property Name",
    desc: "Property Description",
  }
  */
  {
    type: "float",
    id: "rotx",
    options: {
      initialValue: 0,
      interpolatable: true,
    },
    name: "Rotate X",
    desc: "Rotate X",
  },
  {
    type: "float",
    id: "roty",
    options: {
      initialValue: 0,
      interpolatable: true,
    },
    name: "Rotate Y",
    desc: "Rotate Y",
  },
  {
    type: "float",
    id: "rotz",
    options: {
      initialValue: 0,
      interpolatable: true,
    },
    name: "Rotate Z",
    desc: "Rotate Z",
  },
  {
    type: "check",
    id: "useNewSize",
    options: {
      initialValue: false,
    },
    name: "Use New Size",
    desc: "Use New Size",
  },
  {
    type: "float",
    id: "width",
    options: {
      initialValue: 0,
      interpolatable: true,
    },
    name: "Width",
    desc: "Width",
  },
  {
    type: "float",
    id: "height",
    options: {
      initialValue: 0,
      interpolatable: true,
    },
    name: "Height",
    desc: "Height",
  },
];
