
import { CurrentLocation } from "./classes/CurrentLocation";
import { DomInterAction } from "./classes/DomInterAction";
import { Loader } from "./classes/Loader";
import { MapLayers } from "./classes/MapLayers";
import { Routing } from "./classes/Routing";
import { SearchAddress } from "./classes/SearchAddress";
import { SelectLocation } from "./classes/SelectLocation";


export class App {
    constructor() {
        this.currentLocFinderElm = document.getElementById('current-loc-finder')


    }
    static init() {
        this.singleMap
        this.liveLat
        this.liveLon

        this.currentLocation = new CurrentLocation()
        this.mapLayer = new MapLayers()
        this.donInterAction = new DomInterAction()
        this.searchAddress = new SearchAddress()
        this.routing = new Routing()
        this.selectLocation = new SelectLocation()
       
    }

    static setSingleMap(singleMap) {
        this.singleMap = singleMap
    }
    static getSingleMap() {
        return this.singleMap
    }
    static setLiveLatLon(lat, lon) {
        this.liveLat = lat
        this.liveLon = lon
    }
    static getLiveLatLon() {
        return [this.liveLat, this.liveLon]
    }
    static getCurrentLocation() {
        return this.currentLocation
    }
    static getDomInterAction() {
        return this.donInterAction
    }
    static getSearchAddress() {
        return this.searchAddress
    }
    static getMapLayer() {
        return this.mapLayer;
    }
    static getRouting() {
        return this.routing
    }
    static getSelectLocation() {
        return this.selectLocation
    }


}
App.init()