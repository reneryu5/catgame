
class CatLeg {
    constructor (canvas,relX,relY,legType,bongoArm) {
        this.canvas = canvas
        this.relX = relX
        this.relY = relY
        this.legType = legType
        this.bongoArm = bongoArm
    }
    draw(x,y,catState,t,bongosHit) {
        x += this.relX
        y += this.relY
        if (catState == "walking") {
            this.drawMotion(x,y,t,500,10)
        } else if (catState == "dancing") {
            this.drawMotion(x,y,t,250,20)
        } else if (catState == "sleeping") {
            this.drawSleeping(x,y)
        } else if (catState == "bongoCat") {
            this.drawBongos(x,y,catState,bongosHit)
        } else {
            this.drawStanding(x,y)
        }
    }
    drawStanding(x,y) {
        this.canvas.beginPath();this.canvas.moveTo(x-15,y-30);this.canvas.lineTo(x,y);this.canvas.lineTo(x+15,y-30);this.canvas.stroke()
    }
    drawSleeping(x,y) {
        if (this.legType == "front") {
            this.canvas.beginPath();this.canvas.moveTo(x-35,y-50);this.canvas.lineTo(x-65,y-35);this.canvas.lineTo(x-35,y-20);this.canvas.stroke()
        } else if (this.legType == "hind") {
            this.canvas.beginPath();this.canvas.moveTo(x+35,y-50);this.canvas.lineTo(x+65,y-35);this.canvas.lineTo(x+35,y-20);this.canvas.stroke()
        }
    }
    drawBongos(x,y,catState,bongosHit) {
        if (this.legType == "front") {
            if (bongosHit[this.bongoArm]) {
                this.canvas.beginPath();this.canvas.moveTo(x-50,y-50);this.canvas.lineTo(x-80,y-35);this.canvas.lineTo(x-50,y-20);this.canvas.stroke()
            } else {
                this.canvas.beginPath();this.canvas.moveTo(x-65,y-35);this.canvas.lineTo(x-50,y-65);this.canvas.lineTo(x-35,y-35);this.canvas.stroke()
            }
        }
    }
    drawMotion(x,y,t,msPerCycle,stepSize) {
        this.canvas.beginPath();this.canvas.moveTo(x-15,y-30);this.canvas.lineTo(x+Math.sin((t%msPerCycle)/msPerCycle*Math.PI*2)*stepSize,y);this.canvas.lineTo(x+15,y-30);this.canvas.stroke()
    }
}