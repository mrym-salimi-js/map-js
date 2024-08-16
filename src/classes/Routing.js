import L, { LatLng, polyline } from "leaflet";
import { App } from "../app";
import { IconSrc } from "./IconsSrc";
import { Loader } from "./Loader";
export class Routing {
    constructor() {

        this.routingInfoTemplate = document.getElementById('routing-info-template')
        this.routingInfoUl = document.getElementById('routing-info-ul')

        this.route
        this.totalTime
        this.hour
        this.min
        this.totalDistance
        this.polyLines = []
        this.line
        this.selectedLineForStart
        this.drivingLine



        this.drivingDirecrions
        this.setTimerDriving

    }


    getAddressPoints(displayPoins, point) {

        if (point === 'start') {
            App.getDomInterAction().stratPintInputSet(displayPoins)

        } else {
            App.getDomInterAction().endPintInputSet(displayPoins)

        }
    }


    async routingCheck(spLat, spLon, epLat, epLon, driving) {
       
        Loader.showLoder()

        const singleMap = App.getSingleMap()

        if (!spLat || !spLon) {
            spLat = App.getLiveLatLon()[0]
            spLon = App.getLiveLatLon()[1]
        }

        this.removeRouting(singleMap)

        await this.routing(spLat, spLon, epLat, epLon, singleMap, driving)
    }
    removeRouting(singleMap) {

        if (this.route) {
            singleMap.removeControl(this.route)
            this.route = ''
        }
    }
    removePolyLines(singleMap) {
        if (this.polyLines[0]) {
            this.polyLines.forEach((line) => {
                singleMap.removeLayer(line)
            })
        }
    }

    removeDrivingLine(singleMap) {
        if (this.drivingLine) {
            singleMap.removeLayer(this.drivingLine)
        }
    }

    async routing(spLat, spLon, epLat, epLon, singleMap, driving) {


        this.route = L.Routing.control({

            waypoints: [
                L.latLng(spLat, spLon),
                L.latLng(epLat, epLon)
            ],
            createMarker: (i, waypoint, n) => {
                if (i === 0 && driving == undefined) {
                    return L.marker(waypoint.latLng, {
                        icon: App.getMapLayer().blueMarker(spLat, spLon)
                    });
                }
                if (i === 0 && driving != undefined) {

                    return L.marker(waypoint.latLng, {
                        icon: App.getMapLayer().arrowMarker(spLat, spLon)
                    });
                }
                if (i === n - 1) {

                    return L.marker(waypoint.latLng, {
                        icon: App.getMapLayer().orangeMarker(epLat, epLon)
                    });
                }
            },
            lineOptions: {
                styles: [{ opacity: 0, weight: 0 }]
            },
            routeWhileDragging: true,

        }).addTo(singleMap)


        this.drivingCkeck(driving)

    }


    drivingCkeck(driving) {
        if (driving == undefined) {
            this.getRoutingInfo()
        } else {
            this.drivingSet(driving)
        }

        Loader.hidLoader()

    }
    drivingSet(driving) {
        this.route.on('routesfound', (event) => {

            this.removeDrivingLine(App.getSingleMap())

            this.drivingLine = L.polyline(event.routes[driving].coordinates, { color: 'rgb(43, 103, 255)', opacity: 0.6, weight: 7 }).addTo(App.getSingleMap())


        })


    }
    getRoutingInfo() {

        this.route.on('routesfound', (event) => {

            const routes = event.routes

            routes.forEach((route, index) => {

                this.createPolyLine(route, index)
                this.selectLinesActions(routes, index)
            })
            this.routeRender(routes[0])
        })

    }

    createPolyLine(route, index) {

        this.line = L.polyline(route.coordinates, { color: 'gray', opacity: 0.6, weight: 7 }).addTo(App.getSingleMap())

        App.getSingleMap().fitBounds(this.line.getBounds())

        this.defaultBlueLine(index)
    }

    defaultBlueLine(index) {
        if (index == 0) {
            this.line.setStyle({ color: 'rgb(43, 103, 255)' })
            this.selectedLineForStart = this.line
        }

        this.polyLines.push(this.line)
    }

    selectLinesActions(routes, index) {

        this.line.on('click', (event) => {

            this.polyLines.forEach((lineElm) => {
                lineElm.setStyle({ color: 'gray' })
            })

            event.target.setStyle({ color: 'rgb(43, 103, 255)' })

            this.selectedLineForStart = event.target
            this.routeRender(routes[index])
        })
    }

    startDrivingLinesSet() {
        this.removePolyLines(App.getSingleMap())
        this.selectedLineForStart.setStyle({ color: 'rgb(43, 103, 255)', opacity: 0.6 })
    }

    async routeRender(route) {

        this.setTime(route.summary.totalTime)
        this.totalDistance = this.setDistance(route.summary.totalDistance)

        App.getDomInterAction().routeInfoSet(route, this.hour, this.min, this.totalDistance)

        await this.setStartDriving(route)

    }

    async setStartDriving(route) {

        document.getElementById('start-routing').addEventListener('click', () => {
            Loader.showLoder()
            this.startDrivingLinesSet()
            this.drivingDirecrionsArray()

            this.setTimerForDrivingMode(route)

        })
    }

    setDrivingInfo(route) {
        this.setTime(route.summary.totalTime)
        const drivingDistance = this.setDistance(route.instructions[0].distance)
        const ddKm = drivingDistance[1]
        const ddM = drivingDistance[0]

        let direction
        let dirIcon

        this.drivingDirecrions.find((dir) => {
            if (dir.enDir == route.instructions[0].modifier) {
                direction = dir.faDir
                dirIcon = dir.dirIcon
            }
        })

        App.getDomInterAction().prepareForStrartDriving(ddKm, ddM, direction, dirIcon, this.hour, this.min, this.totalDistance)
    }


    async setTimerForDrivingMode(route) {

        const epLat = route.waypoints[1].latLng.lat
        const epLon = route.waypoints[1].latLng.lng
       
        this.setTimerDriving = setInterval(() => {
         
            this.setDrivingInfo(route)
            const spLat = App.getLiveLatLon()[0]
            const spLon = App.getLiveLatLon()[1]
            this.routingCheck(spLat, spLon, epLat, epLon, route.routesIndex)
            App.getSingleMap().flyTo([spLat, spLon], 18)


        }, 3000);

    }
    setDistance(distance) {
        const drivingDistance = ((distance) / 1000).toFixed(2)
        const km = Math.floor(drivingDistance)
        const m = Math.floor((drivingDistance - km) * 100)

        return [m, km]
    }
    setTime(time) {
        this.totalTime = ((time) / 3600).toFixed(2)
        this.hour = Math.floor(this.totalTime)
        this.min = Math.floor((this.totalTime - this.hour) * 100)
    }
    clearTimerForDrivingMode() {
        clearInterval(this.setTimerDriving)
    }
    drivingDirecrionsArray() {
        const directionIcons = new IconSrc().directionIcons()

        this.drivingDirecrions = [
            { enDir: 'Right', faDir: 'به سمت راست', dirIcon: directionIcons['upRight'] },
            { enDir: 'Left', faDir: 'به سمت چپ', dirIcon: directionIcons['upLeft'] },
            { enDir: 'Straight', faDir: 'مستقیم', dirIcon: directionIcons['straight'] },
            { enDir: 'SlightRight', faDir: 'به سمت راست', dirIcon: directionIcons['upRight'] },
            { enDir: 'SlightLeft', faDir: ' به سمت چپ', dirIcon: directionIcons['upLeft'] },
            { enDir: 'Uturn', faDir: 'دور برگردان', dirIcon: directionIcons['uTurn'] },
            { enDir: 'SharpRight', faDir: 'به سمت راست', dirIcon: directionIcons['upRight'] },
            { enDir: 'SharpLeft', faDir: 'به سمت چپ', dirIcon: directionIcons['upLeft'] },
        ]
    }
}