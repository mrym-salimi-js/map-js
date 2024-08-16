export class Loader {
    static showLoder() {
        this.mapElm = document.getElementById('map')
        this.mapElm.style.filter = 'blur(6px)'
    }
    static hidLoader() {
        this.mapElm = document.getElementById('map')
        this.mapElm.style.filter = 'blur(0px)'
    }
}