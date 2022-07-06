import SceneView from "@arcgis/core/views/SceneView";
import WebScene from "@arcgis/core/WebScene";
import Daylight from "@arcgis/core/widgets/Daylight";
import Expand from "@arcgis/core/widgets/Expand";
import Weather from "@arcgis/core/widgets/Weather";
import CloudyWeather from "@arcgis/core/views/3d/environment/CloudyWeather";
import RainyWeather from "@arcgis/core/views/3d/environment/RainyWeather";

import "@esri/calcite-components/dist/calcite/calcite.css";
import "@esri/calcite-components/dist/components/calcite-loader";
import { FalseLiteral } from "typescript";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Layer from "@arcgis/core/layers/Layer";
import Home from "@arcgis/core/widgets/Home";
import Camera from "@arcgis/core/Camera";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

// setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.77/assets");

// const params = new URLSearchParams(document.location.search.slice(1));
// const someParam = params.has("someParam");

// IdentityManager.registerOAuthInfos([
//   new OAuthInfo({
//     appId: "",
//     popup: true,
//     popupCallbackUrl: `${document.location.origin}${document.location.pathname}oauth-callback-api.html`,
//   }),
// ]);

// (window as any).setOAuthResponseHash = (responseHash: string) => {
//   IdentityManager.setOAuthResponseHash(responseHash);
// };
/***********************************
 * Create the SceneView
 ***********************************/
// Load a webscene
const scene = new WebScene({
  portalItem: {
    id: "c56dab9e4d1a4b0c9d1ee7f589343516",
  },
});

// Create a new SceneView and set the weather to cloudy
const view = new SceneView({
  map: scene,
  container: "viewDiv",
  camera: new Camera({
    position: {
      longitude: 5.11844661,
      latitude: 52.09356785,
      z: 11.40484
    },
    heading: 86.89,
    tilt: 88.50
  }),
  qualityProfile: "high",

  environment: {
    weather: {
      type: "cloudy", // autocasts as new CloudyWeather({ cloudCover: 0.3 })
      cloudCover: 0.3,
    },
    atmosphere: {
      quality: "high",
    },
    lighting: {
      waterReflectionEnabled: true,
      ambientOcclusionEnabled: true,
    },
  },
});

/***********************************
 * Add the widgets' UI elements to the view
 ***********************************/
const weatherExpand = new Expand({
  view: view,
  content: new Weather({
    view: view,
  }),
  group: "top-right",
});

const daylightExpand = new Expand({
  view: view,
  content: new Daylight({
    view: view,
  }),
  group: "top-right",
});
view.ui.add([weatherExpand, daylightExpand], "top-right");
view.ui.add(new Home({ view: view }), "top-left")


/***********************************
 * Add functionality to change between flooding and no flooding
 ***********************************/
// Wait for the view to be loaded, in order to being able to retrieve the layer
let floodLevel: Layer;


const flooding1 = document.getElementById(
  "flooding1"
) as HTMLCalciteButtonElement;
const flooding2 = document.getElementById(
  "flooding2"
) as HTMLCalciteButtonElement;
const flooding3 = document.getElementById(
  "flooding3"
) as HTMLCalciteButtonElement;
const flooding4 = document.getElementById(
  "flooding4"
) as HTMLCalciteButtonElement;

const sliderFlooding = document.getElementById("slider") as HTMLInputElement;

view.when(() => {
  // Find the layer for the
  floodLevel = scene.allLayers.find(function (layer) {
    return layer.title === "Flood Level";
  });



  flooding1?.addEventListener("click", (event) => {
    // Change the weather to rainy to match the flooding scenario
    changeFlooding(1);
    sliderFlooding!.value = "1";
  });

  flooding2?.addEventListener("click", (event) => {
    // Change the weather to rainy to match the flooding scenario
    changeFlooding(2);
    sliderFlooding!.value = "2";
  });

  flooding3?.addEventListener("click", (event) => {
    // Change the weather to rainy to match the flooding scenario
    changeFlooding(3);
    sliderFlooding!.value = "3";
  });

  flooding4?.addEventListener("click", (event) => {
    // Change the weather to rainy to match the flooding scenario
    changeFlooding(4);
    sliderFlooding!.value = "4";
  });


  sliderFlooding?.addEventListener("input", (event) => {
    changeFlooding(parseInt(sliderFlooding.value));
  });
});

function changeFlooding(value: number) {
  let weather = view.environment.weather;

  switch (value) {
    case 1:
      view.environment.weather = new CloudyWeather({
        cloudCover: 0.5,
      });
      floodLevel.visible = false;
      break;
    case 2:
      view.environment.weather = new RainyWeather({
        cloudCover: 0.4,
        precipitation: 0.2,
      });
      floodLevel.visible = false;


      break;
    case 3:
      view.environment.weather = new RainyWeather({
        cloudCover: 0.4,
        precipitation: 0.5,
      });
      floodLevel.visible = true;
      ((floodLevel as GroupLayer).layers.getItemAt(0) as FeatureLayer).elevationInfo = { mode: 'absolute-height', offset: 1.1 };
      ((floodLevel as GroupLayer).layers.getItemAt(1) as FeatureLayer).elevationInfo = { mode: 'absolute-height', offset: 3 };
      break;
    case 4:
      view.environment.weather = new RainyWeather({
        cloudCover: 0.4,
        precipitation: 1,
      });
      floodLevel.visible = true;
      ((floodLevel as GroupLayer).layers.getItemAt(0) as FeatureLayer).elevationInfo = { mode: 'absolute-height', offset: 2 };
      ((floodLevel as GroupLayer).layers.getItemAt(1) as FeatureLayer).elevationInfo = { mode: 'absolute-height', offset: 4};
      break;

  }
}

window["view"] = view;
