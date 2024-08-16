import { App } from "../app"
import { PlacesCategory } from "./PlacesCategory"
import { Routing } from "./Routing"

export class DomInterAction {
    constructor() {
        this.searchInoutElm = document.getElementById('search-input')
        this.sliderUl = document.querySelectorAll('.ul-box')
        this.openMapTypeIcon = document.getElementById('open-mt')
        this.closeMapTypeIcon = document.getElementById('close-mt')
        this.mapTypesBox = document.getElementById('map-types-box')
        this.searchListBox = document.getElementById('search-list-box')
        this.closeSearch = document.getElementById('close-search')
        this.placeCategoryBox = document.getElementById('places-category-ul')
        this.TypeName = document.getElementById('type-name')
        this.mapRoutingBtn = document.getElementById('routing-btn')
        this.mapTypeItemsUl = document.getElementById('map-types-ul')
        this.mapRoutingItemsUl = document.getElementById('map-routing-ul')
        this.startPointInput = document.getElementById('start-point')
        this.endPointInput = document.getElementById('end-point')
        this.routingBox = document.getElementById('routing-box')
        this.routingInputElm = document.getElementById('routing-input')
        this.closeRoutingBtn = document.getElementById('routing-closer')
        this.placeCategoryBox = document.getElementById('places-category-box')
        this.routingSelectorFromMap = document.getElementById('routing-selector-from-map')
        this.routingSelectorFromMapCloser = document.getElementById('routing-map-selector-closer')
        this.searchBox = document.getElementById('search-box')
        this.selectLocMarker = document.getElementById('select-loc-marker')
        this.routingInfo = document.getElementById('routing-info')
        this.closeSelectLoc = document.getElementById('close-select-loc')
        this.startRoutingBtn = document.getElementById('start-routing')
        this.drivingDirectionBox = document.getElementById('driving-direction-box')
        this.drivingInfoBox = document.getElementById('driving-info-box')
        this.ddKmElm = document.getElementById('direction-distance-km')
        this.ddMElm = document.getElementById('direction-distance-m')
        this.drinvingDirection = document.getElementById('driving-direction')
        this.drivingHour = document.getElementById('driving-hour')
        this.drivingMin = document.getElementById('driving-min')
        this.drivingDistance = document.getElementById('driving-distance')
        this.routName = document.getElementById('route-name')
        this.routeHour = document.getElementById('route-hour')
        this.routeMin = document.getElementById('route-min')
        this.routeDistance = document.getElementById('route-distance')
        this.closeDrivingBtn = document.getElementById('close-driving')
        this.dirIconElm = document.getElementById('driving-dir-icon')


        this.hourElm
        this.minElm
        this.disElm
        this.openMapTypes()
        this.closeMapTypesBox()
        this.sliderActions()

        this.openMapRoutingPreparing()
        this.prepareStartPoint()
        this.prepareEndPoint()
        this.closeRouting()
        this.closeDriving()
        setInterval(() => {
            this.getSearchInputVal()
        }, 500);
        this.closeSelectRoutingFromMap()

        this.confirmStartPoint()
        this.confirmEndPoint()

    }

    selectRoutingFromMapSet(text) {

        this.prepareForSelectLoc()
        this.routingSelectorFromMap.addEventListener('click', (event) => {
            this.routingSelectorFromMap.children[0].innerText = 'انتخاب از روی نقشه'

            if (event.target.tagName === 'P') {
                this.selectLocMarker.classList.remove('hidden')
                this.searchBox.classList.add('hidden')
                event.target.innerText = text
                this.routingSelectorFromMapCloser.classList.remove('hidden')

                App.getSelectLocation().selectLocation()

            }
        })

    }
    prepareForSelectLoc() {
        this.routingSelectorFromMap.children[0].innerText = 'انتخاب از روی نقشه'

        if (this.searchBox.classList.contains('hidden')) {
            this.searchBox.classList.remove('hidden')
            this.routingSelectorFromMapCloser.classList.add('hidden')
        }
    }
    confirmStartPoint() {
        this.routingSelectorFromMap.addEventListener('click', (event) => {
            if (event.target.innerText === 'تایید مبدا') {
                this.confirmedPointAction()
                App.getSelectLocation().findLocation('start')

            }
        })
    }
    confirmEndPoint() {
        this.routingSelectorFromMap.addEventListener('click', (event) => {
            if (event.target.innerText === 'تایید مقصد') {
                this.confirmedPointAction()
                App.getSelectLocation().findLocation('end')

            }
        })
    }
    confirmedPointAction() {
        this.routingBox.classList.remove('hidden')
        this.routingSelectorFromMap.classList.add('hidden')
    }
    afterSelectPointsSet() {
        this.selectLocMarker.classList.add('hidden')
        this.searchBox.classList.remove('hidden')
    }

    closeSelectRoutingFromMap() {
        this.routingSelectorFromMapCloser.addEventListener('click', (event) => {
            if (event.target.tagName === 'svg' || event.target.tagName === 'path') {

                this.routingSelectorFromMap.children[0].innerText = 'انتخاب از روی نقشه'
                this.routingSelectorFromMapCloser.classList.add('hidden')
                this.searchBox.classList.remove('hidden')
                this.selectLocMarker.classList.add('hidden')
            }
        })
    }

    closeRouting() {
        this.closeRoutingBtn.addEventListener('click', () => {
            this.closeRoutingMode()
        })
    }
    closeDriving() {
        this.closeDrivingBtn.addEventListener('click', () => {
            App.getRouting().clearTimerForDrivingMode()
            this.closeRoutingMode()
            this.drivingInfoBox.classList.add('hidden')
            this.drivingDirectionBox.classList.add('hidden')
        })
    }
    closeRoutingMode() {
        this.hideRoutingInput()
        this.startPointInput.value = ''
        this.endPointInput.value = ''
        this.startPointInput.classList.add('placeholder-black')
        this.closeSearch.classList.add('hidden')
        this.routingBox.classList.add('hidden')
        this.placeCategoryBox.classList.remove('hidden')
        this.routingInfo.classList.add('hidden')
        this.mapRoutingBtn.classList.remove('hidden')
        this.searchBox.value = ''
        const singleMap = App.getSingleMap();
        App.getRouting().removePolyLines(singleMap)
        App.getRouting().removeRouting(singleMap)
        App.getRouting().removeDrivingLine(singleMap)
    }

    prepareStartPoint() {
        this.startPointInput.addEventListener('click', (event) => {

            const confirmPoint = 'تایید مبدا'
            const inputDefaultVal = 'آدرس مبدا را وارد کنید'
            const point = 'start'
            this.pointsSelectionAct(confirmPoint, inputDefaultVal, point, event)
        })
    }
    stratPintInputSet(startPoint) {
        this.startPointInput.value = startPoint
        this.afterPointsInputSet()
    }
    prepareEndPoint() {

        this.endPointInput.addEventListener('click', (event) => {
            const confirmPoint = 'تایید مقصد'
            const inputDefaultVal = 'آدرس مقصد را وارد کنید'
            const point = 'end'
            this.pointsSelectionAct(confirmPoint, inputDefaultVal, point, event)
        })
    }
    endPintInputSet(endPoint) {
        this.endPointInput.value = endPoint
        this.afterPointsInputSet()
    }

    pointsSelectionAct(confirmPoint, inputDefaultVal, point, event) {
        App.getMapLayer().removePlaceMultyMarkers(App.getSingleMap())
        this.showRoutingInput()
        this.selectRoutingFromMapSet(confirmPoint)
        this.closeSearch.classList.remove('hidden')
        this.routingInputElm.value = ''
        this.routingInputElm.focus()
        this.routingInputElm.placeholder = inputDefaultVal
        this.routingBox.classList.add('hidden')
        this.routingSelectorFromMap.classList.remove('hidden')
        event.target.classList.remove('placeholder-black')

        this.removePointAdd()
        App.getSearchAddress().getRoutingInput(point)
    }
    afterPointsInputSet() {
        this.searchListBox.classList.add('hidden')
        this.routingBox.classList.remove('hidden')
        this.routingSelectorFromMap.classList.add('hidden')
    }
    showRoutingInput() {
        this.routingInputElm.classList.remove('hidden')
        this.searchInoutElm.classList.add('hidden')
    }
    hideRoutingInput() {
        this.routingInputElm.classList.add('hidden')
        this.searchInoutElm.classList.remove('hidden')
    }

    endPointInputSetForPlaceCat() {
        this.endPointInput.value = 'مقصد انتخابی شما'
    }
    searchInoutSetForPlaceCat(place) {

        this.searchInoutElm.value = place
        this.closeSearch.classList.remove('hidden')
    }

    removePointAdd() {
        this.closeSearch.addEventListener('click', () => {

            this.hideRoutingInput()
            this.searchInoutElm.placeholder = 'جستجوی مکان مورد نظر ...'
            this.searchInoutElm.value = ''
            this.startPointInput.classList.add('placeholder-black')
            this.closeSearch.classList.add('hidden')
            this.mapRoutingBtn.classList.remove('hidden')
            this.placeCategoryBox.classList.remove('hidden')
            this.routingSelectorFromMap.classList.add('hidden')
            this.hideSearchItems()
            App.getMapLayer().removePlaceMultyMarkers(App.getSingleMap())
            App.getMapLayer().removeMarker(App.getSingleMap())

        })

    }
    showSearchCloser() {
        this.closeSearch.classList.remove('hidden')
    }

    showSearchItems() {
        this.placeCategoryBox.classList.add('hidden')
        this.searchListBox.classList.remove('hidden')
    }

    getSearchInputVal() {
        if (!this.searchInoutElm.value && !this.routingInputElm.value) {
            this.hideSearchItems()

        }
    }

    hideSearchItems() {
        this.searchListBox.classList.add('hidden')
    }

    openMapTypes() {
        this.openMapTypeIcon.addEventListener('click', () => {

            this.mapTypesBox.classList.remove('hidden')

        })
    }
    openMapRoutingPreparing() {
        this.mapRoutingBtn.addEventListener('click', () => {
            this.openMapRouting()
        })
    }
    openMapRouting() {
        this.mapRoutingBtn.classList.add('hidden')
        this.placeCategoryBox.classList.add('hidden')
        this.routingBox.classList.remove('hidden')
    }
    routeInfoSet(route, hour, min, distance) {
        this.routingInfo.classList.remove('hidden')
        this.routName.innerText = route.name
        this.hourElm = this.routeHour
        this.minElm = this.routeMin
        this.disElm = this.routeDistance
        this.routingDisTime(hour, min, distance)
    }
    prepareForStrartDriving(dirDisKm, dirDisM, dir, dirIcon, hour, min, dis) {

        this.routingInfo.classList.add('hidden')
        this.routingBox.classList.add('hidden')
        this.drivingDirectionBox.classList.remove('hidden')
        this.drivingInfoBox.classList.remove('hidden')

        this.startDraving(dirDisKm, dirDisM, dir, dirIcon, hour, min, dis)
    }
    async startDraving(dirDisKm, dirDisM, dir, dirIcon, hour, min, dis) {
        this.drivingDD(dirDisKm, dirDisM, dir, dirIcon)
        this.hourElm = this.drivingHour
        this.minElm = this.drivingMin
        this.disElm = this.drivingDistance
        await this.routingDisTime(hour, min, dis)
    }
    async routingDisTime(hour, min, dis) {

        if (hour > 0) {
            this.hourElm.innerText = `${hour} ساعت`
        }
        if (min > 0) {
            this.minElm.innerText = `${min} دقیقه`
        }
        if (dis[1] > 0) {
            this.disElm.innerText = `${dis[1]} کیلومتر`
        } else {
            this.disElm.innerText = `${dis[0]} متر`
        }
    }

    drivingDD(dirDisKm, dirDisM, dir, dirIcon) {

        if (dirDisKm > 0) {
            this.ddKmElm.innerText = `${dirDisKm} کیلومتر`
        }
        if (dirDisM > 0) {
            this.ddMElm.innerText = `${dirDisM} متر`
        }
        this.dirIconElm.setAttribute('src', `${dirIcon}`)
        this.drinvingDirection.innerText = dir
    }
    closeMapTypesBox() {
        this.closeMapTypeIcon.addEventListener('click', () => {
            this.mapTypesBox.classList.add('hidden')
        })
    }
    sliderActions() {

        let pressed = false
        let startX = 0
        let scrollLeft;

        this.sliderUl.forEach((ulElm) => {
            ulElm.addEventListener('mousedown', (event) => {
                pressed = true;
                if (startX > 0) { return }

                startX = event.pageX - ulElm.offsetLeft;
                scrollLeft = ulElm.scrollLeft;
            })

            ulElm.addEventListener('mouseleave', () => {
                pressed = false
            })

            window.addEventListener('mouseup', () => {
                pressed = false
            })

            ulElm.addEventListener('mousemove', (event) => {
                if (!pressed) { return }

                const x = event.pageX - ulElm.offsetLeft;
                const walk = x - startX;
                ulElm.scrollLeft = scrollLeft - walk;
            })
        })


    }
}