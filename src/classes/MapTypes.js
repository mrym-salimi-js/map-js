import L from "leaflet";
import { App } from "../app";
import { SelectLocation } from "./SelectLocation";

export class MapTypes {
    constructor() {

        this.mapTypesBoxElm = document.getElementById('map-type-items')
        this.singleMap = App.getSingleMap()
        this.allMapTypes

        this.defaultMapType = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}', {
            maxZoom: 30,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        })

        this.selectMapType()
    }
    selectMapType() {
        this.mapTypesBoxElm.addEventListener('click', (event) => {
            if (event.target.tagName === 'IMG') {
                this.allMaptype(event.target.parentElement.getAttribute('data-type'))
            }
        })
    }
    async allMaptype(type) {

        const terrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}', {
            maxZoom: 30,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        })

        const mapnik = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })

        const street = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 30,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        });
        const satellite = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 30,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        })
        const dark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 30,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        })

        this.allMapTypes = [
            { 'type': terrain, 'name': 'Terrain' },
            { 'type': mapnik, 'name': 'Mapnik' },
            { 'type': street, 'name': 'Street' },
            { 'type': satellite, 'name': 'Satellite' },
            { 'type': dark, 'name': 'TransportDark' },
        ]
        this.findMapType(type)
    }

    findMapType(type) {
        this.allMapTypes.find((mapType) => {

            if (mapType.name == type) {
                this.singleMap.removeLayer(this.defaultMapType)
                mapType.type.addTo(this.singleMap)
            }
        })

    }

    async mapType() {

        this.defaultMapType.addTo(this.singleMap);

        await new SelectLocation().selectLocation()
    }
}