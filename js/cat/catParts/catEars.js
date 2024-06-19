
class CatEars {
    constructor (canvas,relX,relY) {
        this.canvas = canvas
        this.relX = relX
        this.relY = relY
    }
    draw(x,y,catState,t) {
        x += this.relX
        y += this.relY
        if (catState != "dancing") {
            this.drawStatic(x,y)
        } else {
            this.drawMotion(x,y,t,250,20)
        }
    }
    drawStatic(x,y) {
        this.canvas.beginPath();this.canvas.moveTo(x-15,y);this.canvas.lineTo(x-35,y-30);this.canvas.lineTo(x-45,y+10);this.canvas.stroke()
        this.canvas.beginPath();this.canvas.moveTo(x+15,y);this.canvas.lineTo(x+35,y-30);this.canvas.lineTo(x+45,y+10);this.canvas.stroke()
    }
    drawMotion(x,y,t,msPerCycle,stepSize) {
        this.canvas.beginPath();this.canvas.moveTo(x-15,y);this.canvas.lineTo(x-35+Math.sin((t%msPerCycle)/msPerCycle*Math.PI*2)*stepSize,y-30);this.canvas.lineTo(x-45,y+10);this.canvas.stroke()
        this.canvas.beginPath();this.canvas.moveTo(x+15,y);this.canvas.lineTo(x+35+Math.sin((t%msPerCycle)/msPerCycle*Math.PI*2)*stepSize,y-30);this.canvas.lineTo(x+45,y+10);this.canvas.stroke()
    }
}