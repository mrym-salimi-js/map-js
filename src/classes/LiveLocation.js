import { App } from "../app";
export class LiveLocation {
    constructor() {
        this.currentLocFinderElm = document.getElementById('current-loc-finder')
        this.singleMap = App.getSingleMap()
        this.liveLat
        this.liveLng

        setInterval(() => {
            this.liveLocation()
        }, 1000);


        this.currentLocFinder()

    }
    async liveLocation() {
        await navigator.geolocation.getCurrentPosition((position) => {
            this.liveLat = position.coords.latitude;
            this.liveLng = position.coords.longitude;
            App.getMapLayer().mapCircle(this.liveLat, this.liveLng, this.singleMap)
            App.setLiveLatLon(this.liveLat, this.liveLng)
        })
    }
    currentLocFinder() {

        this.currentLocFinderElm.addEventListener('click', () => {
            this.singleMap.flyTo([this.liveLat, this.liveLng], 18)
            App.getMapLayer().mapCircle(this.liveLat, this.liveLng, this.singleMap)
            this.singleMap.setZoom(18)

        })
    }


}
