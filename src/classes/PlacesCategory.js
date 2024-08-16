import axios from "axios"
import { App } from "../app"
import { Loader } from "./Loader"

export class PlacesCategory {
    constructor(liveLat, liveLng, singleMap) {
        this.singleMap = singleMap
        this.liveLat = liveLat
        this.liveLng = liveLng

        this.multyMarker = []

        this.placesCategoryUlElm = document.getElementById('places-category-ul')


        this.placCategoryUrlSet()
    }

    placCategoryUrlSet() {
        this.placesCategoryUlElm.addEventListener('click', (event) => {

            if (event.target.tagName === 'IMG' || event.target.tagName === 'P') {
                const placeType = event.target.parentElement.getAttribute('data-place-type')
                const placeName = event.target.parentElement.getAttribute('data-place-name')
                const faPlaceName = event.target.parentElement.children[1].innerText

                this.findPlaces(placeType, placeName, faPlaceName)
            }

            if (event.target.tagName === 'LI') {
                const placeType = event.target.getAttribute('data-place-type')
                const placeName = event.target.getAttribute('data-place-name')
                const faPlaceName = event.target.innerText
                this.findPlaces(placeType, placeName, faPlaceName)
            }
        })
    }
    async findPlaces(placeType, placeName, faPlaceName) {
        Loader.showLoder()

        App.getMapLayer().removePlaceMultyMarkers(this.singleMap)

        await this.fetchPlace(placeType, placeName,)


        App.getMapLayer().getPlaceMultyMarkers(this.multyMarker)
        App.getDomInterAction().searchInoutSetForPlaceCat(faPlaceName)

        Loader.hidLoader()

        this.getPlaceAddress()
    }
    async fetchPlace(placeType, placeName,) {

        const around = 10000
        const getPlace = await axios.get(`https://overpass-api.de/api/interpreter?data=[out:json];node(around:${around},${this.liveLat},${this.liveLng})[${placeType}=${placeName}];out;`)
        const places = getPlace.data.elements

        this.createMultyMarkersArry(places, placeName)
    }

    createMultyMarkersArry(places, placeName) {
        places.forEach((place) => {
            this.multyMarker.push(App.getMapLayer().mapMarker(place.lat, place.lon, this.singleMap, placeName))
        })
    }

    getPlaceAddress() {
        this.multyMarker.forEach((placeMarker) => {

            placeMarker.on('click', (event) => {

                App.getRouting().routingCheck('', '', event.latlng.lat, event.latlng.lng)
                App.getMapLayer().removePlaceMultyMarkers(this.singleMap)
                App.getDomInterAction().openMapRouting()
                App.getDomInterAction().endPointInputSetForPlaceCat()


            })
        })
    }

}