import L from "leaflet";
import { App } from "../app";
import { IconSrc } from "./IconsSrc";
export class MapLayers {
  constructor() {
    this.latShowerElm = document.getElementById("lat-shower-box");
    this.lngShowerElm = document.getElementById("lng-shower-box");

    this.marker;
    this.circle;
    this.multyMarkers;
    this.destinationMarkers;
  }

  destinationMarker(lat, lng) {
    const placeCategoryIcons = new IconSrc().placeCategoryIcons(lat, lng);

    this.destinationMarkers = [
      { marker: placeCategoryIcons["restaurant"], name: "restaurant" },
      { marker: placeCategoryIcons["cafe"], name: "cafe" },
      { marker: placeCategoryIcons["hospital"], name: "hospital" },
      { marker: placeCategoryIcons["pharmacy"], name: "pharmacy" },
      { marker: placeCategoryIcons["park"], name: "park" },
      { marker: placeCategoryIcons["supermarket"], name: "supermarket" },
      { marker: placeCategoryIcons["fuel"], name: "fuel" },
      { marker: placeCategoryIcons["toilets"], name: "toilets" },
      { marker: placeCategoryIcons["hotel"], name: "hotel" },
      { marker: placeCategoryIcons["redMarker"], name: "redMarker" },
    ];
  }

  orangeMarker(lat, lng) {
    return L.icon({
      iconUrl: new IconSrc().orangeMarker(),
      iconSize: [50, 50],
      iconAnchor: [lat, lng],
    });
  }

  blueMarker(lat, lng) {
    return L.icon({
      iconUrl: new IconSrc().blueMarker(),
      iconSize: [50, 50],
      iconAnchor: [lat, lng],
    });
  }

  arrowMarker(lat, lng) {
    return L.icon({
      iconUrl: new IconSrc().arrowMarker(),
      iconSize: [50, 50],
      iconAnchor: [lat, lng],
    });
  }

  getPlaceMultyMarkers(multyMarkers) {
    this.multyMarkers = multyMarkers;
  }

  removePlaceMultyMarkers(singleMap) {
    if (this.multyMarkers && singleMap) {
      this.multyMarkers.forEach((marker) => {
        this.removeLayers(singleMap, marker);
      });
    }
  }

  async mapCircle(lat, lng, singleMap) {
    this.removeCircle(singleMap);
    this.circle = L.circle([lat, lng]);
    this.mapFeatureGroup(this.circle, singleMap);
  }

  async removeCircle(singleMap) {
    if (this.circle && singleMap) {
      this.removeLayers(singleMap, this.circle);
    }
  }

  async mapMarkerCheck(lat, lng, singleMap, markerName) {
    singleMap && this.removeMarker(singleMap);
    this.mapMarker(lat, lng, singleMap, markerName);
  }
  removeMarker(singleMap) {
    if ((this.marker, singleMap)) {
      this.removeLayers(singleMap, this.marker);
    }
  }
  removeLayers(singleMap, layer) {
    layer && singleMap?.removeLayer(layer);
  }

  mapMarker(lat, lng, singleMap, markerName) {
    this.marker = L.marker([lat, lng]);

    this.setDeatinateMarkers(lat, lng, markerName);

    this.mapFeatureGroup(this.marker, singleMap);
    return this.marker;
  }

  setDeatinateMarkers(lat, lng, markerName) {
    this.destinationMarker(lat, lng);
    this.destinationMarkers.find((marker) => {
      if (marker.name == markerName) {
        this.marker.setIcon(marker.marker);
      }
    });
  }

  mapFeatureGroup(layer, singleMap) {
    L.featureGroup([layer]).addTo(singleMap);
  }

  async mapScale(singleMap) {
    L.control.scale({ position: "bottomleft" }).addTo(singleMap);
  }
}
