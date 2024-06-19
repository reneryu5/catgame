
class CatTail {
    constructor (canvas,relX,relY) {
        this.canvas = canvas
        this.relX = relX
        this.relY = relY
    }
    draw(x,y,catState,t) {
        x += this.relX
        y += this.relY
        var resolution = 50
        var msPerCycle = 750
        if (catState == "sleeping") {
            msPerCycle = 2000
        } else if (catState == "dancing") {
            msPerCycle = 500
        }
        this.canvas.beginPath()
        var yOffset = ((4 + 2*Math.PI + (-4 * (2*Math.PI + 2*Math.PI) + (2*Math.PI*2*Math.PI - 2*2*Math.PI*Math.PI)*Math.sin(2*Math.PI+2*Math.PI*(t%msPerCycle)/msPerCycle)) / (2*Math.PI)) / (2*Math.PI)) * 30
        this.canvas.moveTo(x-resolution,y+yOffset)
        for (var xOffset = resolution-1; xOffset > 0; xOffset--) {
            var X = (xOffset/resolution)*2*Math.PI
            yOffset = ((4 + X + (-4 * (X + 2*Math.PI) + (X*X - 2*X*Math.PI)*Math.sin(X+2*Math.PI*(t%msPerCycle)/msPerCycle)) / (2*Math.PI)) / (2*Math.PI)) * 30
            this.canvas.lineTo(x-xOffset,yOffset+y)
        }
        for (var xOffset = 0; xOffset < resolution; xOffset++) {
            var X = (xOffset/resolution)*2*Math.PI
            yOffset = ((-4 + X + (4 * (X + 2*Math.PI) + (X*X - 2*X*Math.PI)*Math.sin(X+2*Math.PI*(t%msPerCycle)/msPerCycle)) / (2*Math.PI)) / (2*Math.PI)) * 30
            this.canvas.lineTo(x-xOffset,yOffset+y)
        }
        this.canvas.stroke()
    }
}