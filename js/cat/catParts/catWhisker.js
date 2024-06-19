
class CarWhisker {
    constructor (canvas,relX,relY,side) {
        this.canvas = canvas
        this.relX = relX
        this.relY = relY
        this.side = side
    }
    draw(x,y,catState,t) {
        x += this.relX
        y += this.relY
        var msPerCycle = 500
        if (catState == "sleeping") {
            msPerCycle = 1000
        } else if (catState == "dancing") {
            msPerCycle = 250
        }
        this.canvas.beginPath();
        this.canvas.moveTo(x,y)
        for (var xOffset = 0; xOffset < 20; xOffset++) {
            var yOffset = Math.sin(Math.PI*2*(1+((xOffset%10)/10)-((t%msPerCycle)/msPerCycle)))*2
            if (this.side=="right") {
                this.canvas.lineTo(x+xOffset,y+yOffset)
            } else if (this.side=="left") {
                this.canvas.lineTo(x-xOffset,y+yOffset)
            }
        }
        this.canvas.stroke()
    }
}