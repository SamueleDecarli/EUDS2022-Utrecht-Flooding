import SceneView from "@arcgis/core/views/SceneView";
import WebScene from "@arcgis/core/WebScene";
import Daylight from "@arcgis/core/widgets/Daylight";
import Expand from "@arcgis/core/widgets/Expand";
import Weather from "@arcgis/core/widgets/Weather";
import CloudyWeather from "@arcgis/core/views/3d/environment/CloudyWeather";
import RainyWeather from "@arcgis/core/views/3d/environment/RainyWeather";

import "@esri/calcite-components/dist/calcite/calcite.css";
import "@esri/calcite-components/dist/components/calcite-loader";

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
  expanded: true,
});

const daylightExpand = new Expand({
  view: view,
  content: new Daylight({
    view: view,
  }),
  group: "top-right",
});
view.ui.add([weatherExpand, daylightExpand], "top-right");

/***********************************
 * Add functionality to change between flooding and no flooding
 ***********************************/
// Wait for the view to be loaded, in order to being able to retrieve the layer
view.when(() => {
  // Find the layer for the
  let floodLevel = scene.allLayers.find(function (layer) {
    return layer.title === "Flood Level";
  });

  const buttonFlooding = document.getElementById("flooding") as HTMLCalciteButtonElement;
  const buttonNoFlooding = document.getElementById("noFlooding") as HTMLCalciteButtonElement;

  buttonFlooding?.addEventListener("click", (event) => {
    // Change the weather to rainy to match the flooding scenario
    view.environment.weather = new RainyWeather({
      cloudCover: 0.7,
      precipitation: 0.3,
    });

    // Turn on the water layer showing the flooding
    floodLevel.visible = true;

    // Styling of the buttons
    buttonNoFlooding.appearance = "outline";
    buttonFlooding.appearance = "solid";
  });

  buttonNoFlooding?.addEventListener("click", (event) => {
    // Change the weather back to cloudy
    view.environment.weather = new CloudyWeather({
      cloudCover: 0.3,
    });

    // Turn off the water layer showing the flooding
    floodLevel.visible = false;

    // Styling of the buttons
    buttonNoFlooding.appearance = "solid";
    buttonFlooding.appearance = "outline";
  });
});



window["view"] = view;
