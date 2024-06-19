/**
 * Summary.
 * Written for a COM1008 (Web & Internet Technology) assignment.
 * @author Joshua O'Sullivan
*/
class Environment {
    constructor() {
        this.canvasElement = document.getElementById("canvas")
        this.canvas = this.canvasElement.getContext("2d")

        this.state = {time:"day",rainingFish:false}

        //Objects in the environment
        this.cat = new Cat(this.canvas,Math.round(this.canvasElement.width/2-60),Math.round(this.canvasElement.height/2))
        this.fishies = []

        //fishRainTimeout will contain a timeout that makes it rain fish. A reference to it is kept so when the cat is awoken, if it is not already raining fish, it can be cancelled.
        this.fishRainTimeout = null

        //Adding event listeners
        this.canvasElement.addEventListener("mousedown",
            function(event){
                this.clickHandler(event)
            }.bind(this)
        )
        document.addEventListener("keydown",
            function(event){
                if (event.key == "ArrowLeft") {
                    env.cat.hitBongos("agudo")
                } else if (event.key == "ArrowRight") {
                    env.cat.hitBongos("grave")
                }
            }
        )
    }

    //--------------------Click Handling--------------------
    clickHandler(event) {
        var x = event.x - this.canvas.canvas.offsetLeft + window.pageXOffset
        var y = event.y - this.canvas.canvas.offsetTop + window.pageYOffset

        var previousCatStance = this.cat.state.stance
        this.cat.clickHandler(x,y,this.state.time)
    
        if (this.cat.state.stance == "walking" && previousCatStance != "walking") { //If the cat has just started walking
            //A fish is created where the user clicked...
            this.fishies.push(new Fish(this.canvas,x,y,
                20, //Fish size
                Math.random(), //Initial rotation
                0, //Rotation rate (in rotations/second)
                0, //Fall rate (in pixels/second)
                "click"))
            //...and that fish will be deleted after 300 milliseconds.
            setTimeout(
                function() {
                    this.fishies.shift()
                }.bind(this), 300
            )
        } else if (this.cat.state.stance == "sleeping") { //If the cat is sleeping
            //The time is set to night
            this.state.time = "night"
            if (previousCatStance != "sleeping") { //And if the cat has only just started sleeping...
                //...then after 5 seconds, if the cat is still asleep, it starts raining fish.
                this.fishRainTimeout = setTimeout(
                    function() {
                        if (this.cat.state.stance == "sleeping") {
                            this.state.rainingFish = true
                        }
                    }.bind(this), 5000
                )
            }
        } else if (previousCatStance == "sleeping" && this.cat.state.stance != "sleeping") { //If the cat has just stopped sleeping
            this.state.time = "day"
            this.state.rainingFish = false
            //All the fishies are deleted and the fish rain is cancelled.
            this.fishies = []
            clearTimeout(this.fishRainTimeout)
        }
    }
    
    reset() {
        this.state.time = "day"
        this.state.rainingFish = false
    
        this.fishies = []

        clearTimeout(this.fishRainTimeout)

        this.cat.state.stance = "standing"
        this.cat.purr.pause()

        this.cat.bongos.state = "banished"

        document.getElementById("bongoToggle").value = "SUMMON BONGOS";
        document.getElementById("bongoToggle").disabled = false;
        document.getElementById("bongoAgudoButton").disabled = true;
        document.getElementById("bongoGraveButton").disabled = true;


        //If the cat is not already at the centre of the canvas, it is moved there.
        if (this.cat.x !== Math.round(this.canvasElement.width/2-60) && this.cat.y != Math.round(this.canvasElement.height/2)) {
            this.cat.moveTo(Math.round(this.canvasElement.width/2-60),Math.round(this.canvasElement.height/2))
        }
    }

    //--------------------Motion--------------------
    tick() {
        if (this.state.rainingFish) {
            if (Math.random()>0.5) { //When it's raining fish, there's a 50% chance every tick that a new fish will be created.
                this.fishies.push(new Fish(this.canvas,
                    Math.random()*this.canvasElement.width, //Initial X position
                    50-Math.random()*100, //Initial Y position
                    2+18*Math.random(), //Size
                    Math.random(), //Rotation
                    Math.random()-0.5, //Rotation rate (in rotations/second)
                    50+Math.random()*100, //Fall rate (in pixels/second)
                    "rain"))
            }
            for (var i = 0; i < this.fishies.length; i++) {
                //If the fish's y position is more than 50 pixels below the visible area of the canvas, it's deleted.
                if (this.fishies[i].y > this.canvasElement.height+50) {
                    this.fishies.splice(i,1)
                }
            }
        }
        for (var fish of this.fishies) {
            fish.tick()
        }
        this.draw()
    }

    //--------------------Drawing--------------------
    draw() {
        //Clearing the canvas
        this.canvas.clearRect(0,0,this.canvasElement.width,this.canvasElement.height)
        //If the state is night time, then the canvas is filled with a black background.
        if (this.state.time != "day") {
            this.canvas.fillStyle = "#000"
            this.canvas.fillRect(0,0,this.canvasElement.width,this.canvasElement.height)
        }
        for (var fish of this.fishies) {
            fish.draw()
        }
        this.cat.draw(this.state.time)
    }
}