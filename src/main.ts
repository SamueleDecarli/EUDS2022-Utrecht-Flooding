import SceneView from "@arcgis/core/views/SceneView";
import WebScene from "@arcgis/core/WebScene";
import Daylight from "@arcgis/core/widgets/Daylight";
import Expand from "@arcgis/core/widgets/Expand";
import Weather from "@arcgis/core/widgets/Weather";
import CloudyWeather from "@arcgis/core/views/3d/environment/CloudyWeather";
import RainyWeather from "@arcgis/core/views/3d/environment/RainyWeather";

import "@esri/calcite-components/dist/calcite/calcite.css";
import "@esri/calcite-components/dist/components/calcite-loader";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Layer from "@arcgis/core/layers/Layer";
import Home from "@arcgis/core/widgets/Home";
import Camera from "@arcgis/core/Camera";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import Legend from "@arcgis/core/widgets/Legend";
import Slider from "@arcgis/core/widgets/Slider";
import promiseUtils from "@arcgis/core/core/promiseUtils";


/***********************************
 * Create the SceneView
 ***********************************/
// Load a webscene
const scene = new WebScene({
  portalItem: {
    id: "4211bb14e7374366be9d964918ee2e5d",
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
const legend = new Expand({ view: view, expanded: false, content: new Legend({ view: view }) })
view.ui.add(legend, "bottom-left")

/***********************************
 * Add functionality to change between the different flooding scenarios
 ***********************************/

let floodLevel: Layer;
let floodImpact: Layer;
// Wait for the view to be loaded, in order to being able to retrieve the layer
view.when(() => {
  // Find the layer for the
  floodLevel = scene.allLayers.find(function (layer) {
    return layer.title === "Flood Level";
  });

  floodImpact = scene.allLayers.find(function (layer) {
    return layer.title === "Building Flood Impact";
  });
  floodImpact.title = "Flood Impact (1000 year rain)";

});

const floodingSlider = new Slider({
  container: "floodingSlider",
  min: 1,
  max: 4,
  steps: [1, 2, 3, 4],
  layout: "vertical",
  values: [1],
  visibleElements: {
    labels: true,
    rangeLabels: true
  },
  tickConfigs: [{
    mode: "position",
    values: [1, 2, 3, 4],
    labelsVisible: true,
    tickCreatedFunction: tickConfig
  }]
});

floodingSlider.when(() => {
  floodingSlider.maxLabelElement.style.display = "none";
  floodingSlider.minLabelElement.style.display = "none";
  console.log(floodingSlider.labelElements.length)
  floodingSlider.labelElements.getItemAt(0).style.display = "none";
})

function tickConfig(value: any, tickElement: any, labelElement: any) {
  labelElement.style.transform = "unset"
  switch (value) {
    case 1:
      labelElement.innerHTML = "No rain";
      break;
    case 2:
      labelElement.innerHTML = "Light rain";
      break;
    case 3:
      labelElement.innerHTML = "Strong rain";
      break;
    case 4:
      labelElement.innerHTML = "1000 year rain";
      break;
  }
  const setValue = () => {
    floodingSlider.values = [value];
  };
  tickElement.addEventListener("click", setValue);
  tickElement.style.cursor = "pointer";
  labelElement.addEventListener("click", setValue);
  labelElement.style.cursor = "pointer";
}

floodingSlider.watch(
  "values",
  () => {
    changeFlooding(floodingSlider.values[0])
  }
);

view.ui.add("container", "bottom-right")


function changeFlooding(value: number) {
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
      ((floodLevel as GroupLayer).layers.getItemAt(0) as FeatureLayer).elevationInfo = { mode: 'absolute-height', offset: 2 };
      ((floodLevel as GroupLayer).layers.getItemAt(1) as FeatureLayer).elevationInfo = { mode: 'absolute-height', offset: -0.5 };
      break;
    case 4:
      view.environment.weather = new RainyWeather({
        cloudCover: 0.4,
        precipitation: 1,
      });
      floodLevel.visible = true;
      ((floodLevel as GroupLayer).layers.getItemAt(0) as FeatureLayer).elevationInfo = { mode: 'absolute-height', offset: 3 };
      ((floodLevel as GroupLayer).layers.getItemAt(1) as FeatureLayer).elevationInfo = { mode: 'absolute-height', offset: 0 };
      break;
  }
}

let impact = document.getElementById("impact") as HTMLCalciteButtonElement;

impact.addEventListener("click", () => {
  if (impact.appearance == "outline") {
    impact.appearance = "solid";
    floodImpact.visible = true;
    legend.expanded = true;
  }
  else {
    impact.appearance = "outline";
    floodImpact.visible = false;
    legend.expanded = false;
  }
});

window["view"] = view;
