import { SingleMap } from "./SingleMap"

export class CurrentLocation {
    constructor() {
       this.currentLocation()
    }
    async currentLocation() {
        await navigator.geolocation.getCurrentPosition((position) => {
            
            const lat = position.coords.latitude
            const lon =  position.coords.longitude
           
            new SingleMap().map(lat,lon)
          
           
        })
    }
   
}