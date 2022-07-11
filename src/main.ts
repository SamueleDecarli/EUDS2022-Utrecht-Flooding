import CloudyWeather from "@arcgis/core/views/3d/environment/CloudyWeather";
import RainyWeather from "@arcgis/core/views/3d/environment/RainyWeather";
import SceneView from "@arcgis/core/views/SceneView";
import WebScene from "@arcgis/core/WebScene";
import Daylight from "@arcgis/core/widgets/Daylight";
import Expand from "@arcgis/core/widgets/Expand";
import Weather from "@arcgis/core/widgets/Weather";

import Camera from "@arcgis/core/Camera";
import Color from "@arcgis/core/Color";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import Layer from "@arcgis/core/layers/Layer";
import { SimpleRenderer } from "@arcgis/core/renderers";
import { FillSymbol3DLayer, PolygonSymbol3D } from "@arcgis/core/symbols";
import Home from "@arcgis/core/widgets/Home";
import Legend from "@arcgis/core/widgets/Legend";
import "@esri/calcite-components/dist/calcite/calcite.css";
import "@esri/calcite-components/dist/components/calcite-loader";


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
      x: 5.11417868,
      y: 52.08521220,
      z: 13.60010,
    },
    heading: 320.60,
    tilt: 89.34
  }),
  qualityProfile: "high",

  environment: {
    // weather: {
    //   type: "cloudy", // autocasts as new CloudyWeather({ cloudCover: 0.3 })
    //   cloudCover: 0.3,
    // },
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
// view.ui.add(legend, "bottom-left")

/***********************************
 * Add functionality to change between flooding and no flooding
 ***********************************/
// Wait for the view to be loaded, in order to being able to retrieve the layer
let floodLevel: GroupLayer;
let floodImpact: Layer;

let floodRenderer: any;

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
  }) as GroupLayer;

  floodRenderer = (floodLevel.layers.getItemAt(0) as FeatureLayer).renderer;

  floodImpact = scene.allLayers.find(function (layer) {
    return layer.title === "Building Flood Impact";
  });
  floodImpact.title = "Flood Impact (1000 year rain)";


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


/*
Plenary steps
*/

const addFloodBtn = document.getElementById("addFlood") as HTMLCalciteButtonElement;
const addWaterBtn = document.getElementById("addWater") as HTMLCalciteButtonElement;

const overviewBtn = document.getElementById("showOverview") as HTMLCalciteButtonElement;

addFloodBtn.onclick = async () => {
  await view.goTo(new Camera({
    position: {
      x: 5.11406012,
      y: 52.08537330,
      z: 447.57952,
    },
    heading: 319.57,
    tilt: 0.50
  }));

  floodLevel.visible = true;

  const renderer = new SimpleRenderer({
    symbol: new PolygonSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: new Color("orange")
          }
        })
      ]
    })
  });

  floodLevel.layers.forEach(l => (l as FeatureLayer).renderer = renderer);
};

addWaterBtn.onclick = async () => {
  floodLevel.layers.forEach(l => (l as FeatureLayer).renderer = floodRenderer);

  await view.goTo(new Camera({
    position: {
      x: 5.11417868,
      y: 52.08521220,
      z: 13.60010,
    },
    heading: 320.60,
    tilt: 89.34
  }));

}

overviewBtn.onclick = () => {
  view.goTo(new Camera({
    position: {
      x: 5.10159473,
      y: 52.08993904,
      z: 217.99420,
    },
    heading: 93.76,
    tilt: 67.94
  }), { speedFactor: 0.75 });
}

reactiveUtils.watch(() => view.environment.weather, (weather) => {
  if (weather && weather.type !== "rainy") {
    floodLevel.visible = false;
  }
});


view.ui.add(addFloodBtn, "bottom-left");
view.ui.add(addWaterBtn, "bottom-left");

view.ui.add(overviewBtn, "bottom-left");

window["view"] = view;
