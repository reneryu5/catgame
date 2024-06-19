/**
 * Summary.
 * Written for a COM1008 (Web & Internet Technology) assignment.
 * @author Joshua O'Sullivan
*/
class Cat {
    constructor (canvas,x,y) {
        this.canvas = canvas
        this.x = x
        this.y = y

        this.state = {stance:"standing",bongosHit:{"agudo":false,"grave":false},purring:false}
        this.motionStartTime = 0 //motionStartTime holds the starting time of the current motion.

        this.face = new CatFace(canvas,0,0)
        this.ears = new CatEars(canvas,0,-45)
        this.tail = new CatTail(canvas,210,-20)
        this.whiskers = [new CarWhisker(canvas,-30,-2.5,"left"),new CarWhisker(canvas,-30,5,"left"),new CarWhisker(canvas,-30,12.5,"left"),new CarWhisker(canvas,30,-2.5,"right"),new CarWhisker(canvas,30,5,"right"),new CarWhisker(canvas,30,12.5,"right")]
        this.legs = [new CatLeg(canvas,-5,100,"front","agudo"), new CatLeg(canvas,35,100,"front","grave"), new CatLeg(canvas,95,100,"hind",null), new CatLeg(canvas,135,100,"hind",null)]
        this.bongos = new Bongos(canvas,-130,60)

        this.purr = new Audio
        this.purr.src = "snd/purr.mp3"
        this.purr.loop = true
    }

    //--------------------Click Handling--------------------
    clickHandler(x,y) {
        if (this.x-50 < x && x < this.x+50 && this.y-50 < y && y < this.y+50) { //If the cat is clicked on the face...
            if (this.state.stance == "standing") { //...and it's standing, then it dances.
                this.setMotionStartTime()
                this.state.stance = "dancing"

                //Bongos cannot be summoned while dancing.
                document.getElementById("bongoToggle").disabled = true

                //A timeout is set to return the cat's state to standing.
                setTimeout(
                    function() {
                        if (this.state.stance == "dancing") {
                            this.state.stance = "standing"
                            document.getElementById("bongoToggle").disabled = false
                        } 
                    }.bind(this), 750
                )
            } else if (this.state.stance == "sleeping") { //...or if it's sleeping, then it stands up and stops purring.
                this.state.stance = "standing"
                this.purr.pause()

                //Now the cat has awoken, bongos can once again be summoned.
                document.getElementById("bongoToggle").disabled = false
            }
        } else if (this.x-50 < x && x < this.x+180 && this.y+60 < y && y < this.y+110) { //If the cat is clicked on its legs...
            if (this.state.stance == "standing") { //...and it is standing, it goes to sleep and starts purring.
                this.state.stance = "sleeping"
                this.purr.play()

                //Bongos cannot be summoned while sleeping.
                document.getElementById("bongoToggle").disabled = true
            }
        } else if (["walking","dancing","sleeping","bongoCat"].indexOf(this.state.stance) == -1){ // If the cat isn't already in motion...
            this.setMotionStartTime()
            this.moveTo(x,y) //...it walks to the click point.
        }
    }

    setMotionStartTime() {
        var date = new Date()
        var t = date.getTime()
        this.motionStartTime = t
    }

    toggleBongos() {
        this.setMotionStartTime()
        if (this.bongos.state == "banished") { //If the bongos are not currently summoned
            this.state.stance = "bongoCat"
            this.bongos.state = "loading"

            var chime = new Audio
            chime.src = "snd/xylophone-sweep.mp3"
            chime.play()

            document.getElementById("bongoToggle").disabled = true;

        } else if (this.bongos.state == "summoned") { //If the bongos are currently summoned
            this.state.stance = "standing"
            this.bongos.state = "banished"

            document.getElementById("bongoToggle").value = "SUMMON BONGOS";
            document.getElementById("bongoAgudoButton").disabled = true;
            document.getElementById("bongoGraveButton").disabled = true;
        }    
    }

    //--------------------Motion--------------------
    hitBongos(bongosHit) {
        if (this.bongos.state == "summoned") {
            var bongoNoise = new Audio
            if (bongosHit == "grave") {
                bongoNoise.src = "snd/Bongo_Grave.mp3"
                this.state.bongosHit["grave"] = true
                setTimeout(function(){this.state.bongosHit["grave"]=false}.bind(this),100)
            } else {
                bongoNoise.src = "snd/Bongo_Agudo.mp3"
                this.state.bongosHit["agudo"] = true
                setTimeout(function(){this.state.bongosHit["agudo"]=false}.bind(this),100)
            }
            bongoNoise.play()
        }
    }

    moveTo(x,y) {
        this.state.stance = "walking"
        document.getElementById("bongoToggle").disabled = true //Bongos cannot be summoned while walking.

        var motionTime = 500 //The time it takes for the cat to walk to the new position (in milliseconds)
        var intervals = 30*motionTime/1000 //The amount of "steps" in the movement to the new position, calcualted to be equivalent to 30 steps/second.

        var xDifference = x-this.x
        var yDifference = y-this.y

        //A recursive function that moves the cat to its new position smoothly
        var move = function(xDifference,yDifference,intervalNo) {
            if (intervalNo <= intervals) {
                //The changes in x an y is scaled so that they reach their peaks at the middle of the motion.
                this.x += (-6*intervalNo*xDifference*(intervalNo-intervals))/(intervals*intervals*intervals)
                this.y += (-6*intervalNo*yDifference*(intervalNo-intervals))/(intervals*intervals*intervals)

                setTimeout(function(){move(xDifference,yDifference,intervalNo+1)},motionTime/intervals)

            } else {
                //In the last recursive call, the x and y coordinates of the cat are set to the exact original target coordinates to avoid rounding errors.
                this.x = x
                this.y = y

                this.state.stance = "standing"
                document.getElementById("bongoToggle").disabled = false
            }
        }.bind(this)
        move(xDifference,yDifference,0)
    }

    //--------------------Drawing--------------------
    draw(state) {
        //If the environment state is day, the cat is drawn in black.
        if (state == "day") {
            this.canvas.strokeStyle = "#000"
            this.canvas.fillStyle = "#000"
        } else { //Otherwise the cat is drawn in white.
            this.canvas.strokeStyle = "#fff"
            this.canvas.fillStyle = "#fff"
        }
    
        var date = new Date()
        var t = date.getTime()
        t = t-this.motionStartTime

        this.face.draw(this.x,this.y,this.state.stance)
        this.ears.draw(this.x,this.y,this.state.stance,t)

        for (var whisker of this.whiskers) {
            whisker.draw(this.x,this.y,this.state.stance,t)
        }

        //The cat's tail is only drawn if the cat is not in the bongoCat stance, and if the cat is in the bongoCat stance the bongos are drawn.
        if (this.state.stance != "bongoCat") {
            this.tail.draw(this.x,this.y,this.state.stance,t)
        } else {
            this.bongos.draw(this.x,this.y,t)
            if (this.bongos.state == "summoned") {
                document.getElementById("bongoAgudoButton").disabled = false;
                document.getElementById("bongoGraveButton").disabled = false;
                document.getElementById("bongoToggle").disabled = false;
                document.getElementById("bongoToggle").value = "BANISH BONGOS";
            }
        }

        for (var leg of this.legs) {
            leg.draw(this.x,this.y,this.state.stance,t,this.state.bongosHit)
        }
    }
}