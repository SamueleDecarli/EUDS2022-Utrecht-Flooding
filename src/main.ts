import SceneView from "@arcgis/core/views/SceneView";
import WebScene from "@arcgis/core/WebScene";
import Daylight from "@arcgis/core/widgets/Daylight";
import Expand from "@arcgis/core/widgets/Expand";
import Weather from "@arcgis/core/widgets/Weather";
import CloudyWeather from "@arcgis/core/views/3d/environment/CloudyWeather";
import RainyWeather from "@arcgis/core/views/3d/environment/RainyWeather";

import "@esri/calcite-components/dist/calcite/calcite.css";
import "@esri/calcite-components/dist/components/calcite-loader";
import { FalseLiteral, visitLexicalEnvironment } from "typescript";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Layer from "@arcgis/core/layers/Layer";
import Home from "@arcgis/core/widgets/Home";
import Camera from "@arcgis/core/Camera";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import Legend from "@arcgis/core/widgets/Legend";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import FeatureLayerView from "@arcgis/core/views/layers/FeatureLayerView";
import Polygon from "@arcgis/core/geometry/Polygon";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { WaterSymbol3DLayer } from "@arcgis/core/symbols";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import Graphic from "@arcgis/core/Graphic";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import { colorEqual } from "@esri/calcite-components/dist/types/components/color-picker/utils";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";


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


//***********************************
//* Step 1: Add Flooding data
//***********************************

const flood = new FeatureLayer({
  url: "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/FloodingDataUtrecht/FeatureServer/0",
  title: "Flood level layer",
  elevationInfo: {
    mode: "absolute-height"
  },
  maxScale: 0,
  minScale: 0,
  renderer: new SimpleRenderer({
    symbol: new PolygonSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: { color: "orange" }
        })
      ]
    })
  })
});

//view.map.add(flood)


//***********************************
//* Step 2: Style flooding data
//***********************************

let rendererWater = new SimpleRenderer({
  symbol: new PolygonSymbol3D({
    symbolLayers: [
      new WaterSymbol3DLayer({
        color: [194, 152, 110, 0.77],
        waveStrength: "rippled"
      })
    ]
  })
})

//flood.renderer = rendererWater


//***********************************
//* Step 3: Finalize app
//***********************************

//finalizeApp()




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
 * Add functionality to change between flooding and no flooding
 ***********************************/
// Wait for the view to be loaded, in order to being able to retrieve the layer
let floodLevel: Layer;
let floodImpact: Layer;
let floodLevelLayer: FeatureLayer;
let floodLayer: GraphicsLayer;

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

  floodLevelLayer = ((floodLevel as GroupLayer).layers.getItemAt(1) as FeatureLayer)

  view.whenLayerView(floodLevelLayer).then((layerView) => {
    let filterPolygon = new Polygon({
      spatialReference: new SpatialReference({ wkid: 102100 }),
      rings: [[[569667.6175085438, 6817221.788167432, 4.288249521990564],
      [570338.5404688591, 6817144.114795292, 4.288249522447586],
      [570276.2118804371, 6816697.20946292, 4.288249524310231],
      [569644.7564071192, 6816759.350547839, 4.288249522447586],
      [569667.6175085438, 6817221.788167432, 4.288249521990564]]]
    });
    /*
    (layerView as FeatureLayerView).filter = new FeatureFilter({
      geometry: filterPolygon,
      spatialRelationship: "contains",
      distance: 0,
      units: "meters"
    });
    */

    let waterSymbol = new PolygonSymbol3D({
      symbolLayers: [
        new WaterSymbol3DLayer({
          color: [194, 152, 110, 0.77],
          waveStrength: "rippled"
        })
      ]
    })
    floodLayer = new GraphicsLayer({});


    var query = floodLevelLayer.createQuery();
    query.geometry = filterPolygon,
      query.spatialRelationship = "contains"

    floodLevelLayer.queryFeatures(query).then((results) => {
      let features = results.features
      if (features.length > 0) {
        for (let i = 0; i < features.length; i++) {
          console.log(features[i].geometry);
          let graphic = new Graphic({
            geometry: features[i].geometry,
            symbol: waterSymbol
          });
          floodLayer.add(graphic);
        }
      }
    })
    floodLayer.elevationInfo = {
      mode: "absolute-height",
      offset: 3.6
    }
    floodLayer.visible = false;
    view.map.add(floodLayer);
    view.map.remove(floodLevel);

  })


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
      floodLayer.visible = false;
      break;
    case 2:
      view.environment.weather = new RainyWeather({
        cloudCover: 0.4,
        precipitation: 0.2,
      });
      floodLayer.visible = false;
      break;
    case 3:
      view.environment.weather = new RainyWeather({
        cloudCover: 0.4,
        precipitation: 0.5,
      });
      floodLayer.visible = true;
      floodLayer.elevationInfo = { mode: 'absolute-height', offset: 3.1 };
      break;
    case 4:
      view.environment.weather = new RainyWeather({
        cloudCover: 0.4,
        precipitation: 1,
      });
      floodLayer.visible = true;
      floodLayer.elevationInfo = { mode: 'absolute-height', offset: 3.6 };
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

function finalizeApp() {

  document.getElementById("sliderContainer")!.style.display = "flex"
  document.getElementById("labelContainer")!.style.display = "flex"
  document.getElementById("buttonContainer")!.style.display = "flex"


  view.map.remove(flood);
}

window["view"] = view;
