import axios from "axios";
import { App } from "../app";

export class SelectLocation {
    constructor() {

        this.lat
        this.lng
        this.place

    }
    async selectLocation() {
        App.getSingleMap().on('moveend', () => {

            this.lat = App.getSingleMap().getCenter().lat
            this.lng = App.getSingleMap().getCenter().lng

        })


    }
    async findLocation(point) {

        const { data: response } = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.lat}&lon=${this.lng}`)

       

        App.getSearchAddress().searchType(point, this.lat, this.lng, App.getSingleMap(), response.display_name)

        App.getDomInterAction().afterSelectPointsSet()
    }


}