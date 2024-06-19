
class Bongos {
    constructor (canvas,relX,relY) {
        this.canvas = canvas
        this.relX = relX
        this.relY = relY
        this.state = "banished"
        this.bongosImage = new Image
        this.bongosImage.src = "img/bongos.png"
    }
    draw(x,y,t) {
        x += this.relX
        y += this.relY
        if (this.state == "loading") {
            var bongoLoadTime = 1000 //The time it takes to "load" the bongo (the bongo to sweep in from the left), in milliseconds.
            if (t < bongoLoadTime) {
                x -= (x+300)*(1-(t/bongoLoadTime))
            } else {
                this.state = "summoned"
            }
        }
        //Drawing table
        this.canvas.beginPath();this.canvas.moveTo(x-40,y-5);this.canvas.lineTo(x+240,y+40);this.canvas.stroke()
        //Drawing bongos
        this.canvas.drawImage(this.bongosImage,x,y,this.bongosImage.width*0.15,this.bongosImage.height*0.15)
    }
}