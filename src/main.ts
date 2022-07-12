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
import { SpatialReference } from "@arcgis/core/geometry";
import WaterSymbol3DLayer from "@arcgis/core/symbols/WaterSymbol3DLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import Polygon from "@arcgis/core/geometry/Polygon";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
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
//* Step 3: Add weather
//***********************************

//view.environment.weather = new RainyWeather({ cloudCover: 0.4, precipitation: 0.5 });


//***********************************
//* Step 4: Finalize app
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
 * Add functionality to change between the different flooding scenarios
 ***********************************/

let floodLevel: Layer;
let floodLayer: GraphicsLayer;
let floodImpact: Layer;
let floodLevelLayer: FeatureLayer;

// Wait for the view to be loaded, in order to being able to retrieve the layer
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
