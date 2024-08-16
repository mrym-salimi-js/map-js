import axios from "axios"
import { App } from "../app"

export class SearchAddress {
    constructor() {
        this.searchInoutElm = document.getElementById('search-input')
        this.searchItemsTemplate = document.getElementById('search-items-template')
        this.searchItemsUl = document.getElementById('search-items-ul')
        this.searchListBox = document.getElementById('search-list-box')
        this.routingInputElm = document.getElementById('routing-input')

        this.startPointLat
        this.startPointLon
        this.endPointLat
        this.endPointLon
        this.point
        this.setTime = null
        this.redMarker = 'redMarker'

        this.inputVal
        this.getSerachInputVal()

    }
    async routingInput(add, point) {
        this.searchInoutElm = add
        this.point = point

    }
    debounce(callback) {
        clearTimeout(this.setTime)
        this.setTimer(callback)
    }
    setTimer(callback) {
        this.setTime = setTimeout(() => {
            callback()
        }, 500);
    }
    getRoutingInput(point) {
        this.point = point
        this.routingInputElm.addEventListener('keyup', () => {
            this.debounce(this.doSearch.bind(this))
            this.inputVal = this.routingInputElm.value

        })

    }
    async getSerachInputVal(point) {
        this.point = point
        this.searchInoutElm.addEventListener('keyup', () => {
            this.debounce(this.doSearch.bind(this))
            this.inputVal = this.searchInoutElm.value
            App.getDomInterAction().showSearchCloser()


        })
        App.getDomInterAction().removePointAdd()

    }
    async doSearch() {

        const { data: response } = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.inputVal)}&format=json`)

        await this.renderSearchItems(response)
    }

    async renderSearchItems(response) {

        this.searchItemsUl.innerHTML = ''

        response.forEach((res) => {

            const searchItemTemp = document.importNode(this.searchItemsTemplate.content, true)

            searchItemTemp.getElementById('place-name').innerText = res.name
            searchItemTemp.getElementById('place-display').innerText = res.display_name

            searchItemTemp.getElementById('place-name').setAttribute('lat', `${res.lat}`)
            searchItemTemp.getElementById('place-name').setAttribute('lon', `${res.lon}`)
            searchItemTemp.getElementById('place-name').setAttribute('display', `${res.display_name}`)
            searchItemTemp.getElementById('place-display').setAttribute('lat', `${res.lat}`)
            searchItemTemp.getElementById('place-display').setAttribute('lon', `${res.lon}`)
            searchItemTemp.getElementById('place-display').setAttribute('display', `${res.display_name}`)

            this.selectSearchLoc(searchItemTemp)

            this.searchItemsUl.append(searchItemTemp)

            App.getDomInterAction().showSearchItems()
        })
    }

    selectSearchLoc(item) {

        item.getElementById('search-item').addEventListener('click', (event) => {
            if (event.target.tagName === 'P') {

                const lat = event.target.getAttribute('lat')
                const lon = event.target.getAttribute('lon')
                const singleMap = App.getSingleMap()
                const addDisplay = event.target.getAttribute('display')
                this.searchType(this.point, lat, lon, singleMap, addDisplay)
                App.getDomInterAction().hideSearchItems()
            }


        })

    }

    searchType(point, lat, lon, singleMap, addDisplay) {

        if (!point) {
            singleMap.flyTo([lat, lon], 14)
            App.getMapLayer().mapMarkerCheck(lat, lon, singleMap, this.redMarker)
        } else {

            this.setStartPoint(lat, lon, point)
            this.setEndPoint(lat, lon, point)
            App.getRouting().getAddressPoints(addDisplay, point)
        }
    }
    async setStartPoint(lat, lon, point) {
        if (point == 'start') {
            this.startPointLat = lat
            this.startPointLon = lon
        }
    }
    async setEndPoint(lat, lon, point) {
        if (point == 'end') {

            this.endPointLat = lat
            this.endPointLon = lon
            App.getRouting().routingCheck(this.startPointLat, this.startPointLon, this.endPointLat, this.endPointLon)
            this.point = null
        }
    }
}