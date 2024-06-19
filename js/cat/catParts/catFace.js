
class CatFace {
    constructor (canvas,relX,relY) {
        this.canvas = canvas
        this.relX = relX
        this.relY = relY
    }
    draw(x,y,catState) {
        x += this.relX
        y += this.relY
        //Nose
        this.canvas.beginPath();this.canvas.moveTo(x-10,y);this.canvas.lineTo(x+10,y);this.canvas.lineTo(x,y+10);this.canvas.lineTo(x-10,y);this.canvas.fill()
        //Mouth line
        this.canvas.beginPath();this.canvas.moveTo(x,y+10);this.canvas.lineTo(x,y+20);this.canvas.stroke()
        //Mouth curves
        this.canvas.beginPath();this.canvas.arc(x-10,y+20,10,0,Math.PI*5/4);this.canvas.stroke()
        this.canvas.beginPath();this.canvas.arc(x+10,y+20,10,0-Math.PI*1/4,Math.PI);this.canvas.stroke()
        //Eyes
        if (catState != "sleeping") {
            this.canvas.beginPath();this.canvas.arc(x-20,y-10,15,Math.PI*10/8,Math.PI*14/8);this.canvas.stroke()
            this.canvas.beginPath();this.canvas.arc(x+20,y-10,15,Math.PI*10/8,Math.PI*14/8);this.canvas.stroke()
        } else {
            this.canvas.beginPath();this.canvas.arc(x-20,y-30,15,Math.PI*2/8,Math.PI*6/8);this.canvas.stroke()
            this.canvas.beginPath();this.canvas.arc(x+20,y-30,15,Math.PI*2/8,Math.PI*6/8);this.canvas.stroke()
        }
    }
}