import L from "leaflet";
import { App } from "../app";
import { LiveLocation } from "./LiveLocation";
import { MapTypes } from "./MapTypes";
import { PlacesCategory } from "./PlacesCategory";
export class SingleMap {
    constructor() {
        this.singleMap

    }

    async map(lat, lng) {


        this.singleMap = L.map('map', { zoomControl: false }).setView([lat, lng], 16)


        App.setSingleMap(this.singleMap)

        await new MapTypes().mapType()
        await App.getMapLayer().mapScale(this.singleMap)

        new LiveLocation()
        new PlacesCategory(lat, lng, this.singleMap)


    }

}