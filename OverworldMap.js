class OverworldMap {
    constructor(config){
        this.overworld = null
        this.gameObjects = config.gameObjects

        this.cutSceneSpaces = config.cutSceneSpaces || {}


        this.walls = config.walls || {}


        this.lowerImage = new Image()
        this.lowerImage.src = config.lowerSrc

        this.upperImage = new Image()
        this.upperImage.src = config.upperSrc

        this.isCutscenePlaying = false
    }

    drawLowerImage(ctx, cameraPerson){
        ctx.drawImage(this.lowerImage, 
            utilities.withGrid(-3)- cameraPerson.x,
            utilities.withGrid(-4)- cameraPerson.y)
    }

    drawUpperImage(ctx, cameraPerson){
        ctx.drawImage(this.upperImage,    
        utilities.withGrid(-3)- cameraPerson.x,
        utilities.withGrid(-4)- cameraPerson.y)}

    isSpaceTaken(currentX, currentY, direction){
        const {x, y} = utilities.nextPosition(currentX, currentY, direction)
        return this.walls[`${x},${y}`] || false
    }

    mountObjects(){
        Object.keys(this.gameObjects).forEach(key =>{
            // TODO: determine if this object should mount

            let object = this.gameObjects[key]

            object.id = key

            object.mount(this)
        })
    }

    async startCutscene(events){
        this.isCutscenePlaying = true

        //start a loop of async events
                for (let i=0; i<events.length; i++){
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this
            })
            //await each one
            await eventHandler.init()

        }

        this.isCutscenePlaying = false

        //make NPCs do idle behavior
        Object.values(this.gameObjects).forEach(object=> object.doBehaviorEvent(this))
    }

    checkForActionCutscene(){
        const healer = this.gameObjects["healer3"]
        const nextCoords = utilities.nextPosition(healer.x, healer.y, healer.direction)
        const match = Object.values(this.gameObjects).find(object=>{
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        })
        if (!this.isCutscenePlaying && match && match.talking.length){
            this.startCutscene(match.talking[0].events)
        }
    }

    checkForFootstepCutscene(){
        const healer = this.gameObjects["healer3"]
        const match = this.cutSceneSpaces[ `${healer.x},${healer.y}` ]
        if (!this.isCutscenePlaying && match){
            this.startCutscene(match[0].events)
        }
    }


    addWall(x, y){
        this.walls[`${x},${y}`] = true
    }

    removeWall(x, y){
        delete this.walls[`${x},${y}`] 

    }
    moveWall(wasX, wasY, direction){
        this.removeWall(wasX, wasY)
        const {x,y} = utilities.nextPosition(wasX, wasY, direction)
        this.addWall(x, y)
    }


}


window.OverworldMaps = {
    Street: {
        lowerSrc: "./assets/street1.png",
        upperSrc: "./assets/street1B.png",
        gameObjects:{

            //trash cans??? 

            //people
            healer3: new Person ({
                isPlayerControlled: true, 
                x: utilities.withGrid(15),
                y: utilities.withGrid(31),
                src: "./assets/healer3.png", 



            }),

            healer1: new Person ({


                x: utilities.withGrid(12),
                y: utilities.withGrid(10),
                behaviorLoop: [
                    { type: "stand", direction: "down"},],

                talking: [
                    {
                        events: [
                            {facePlayer: "healer1", type: "messages", 
                            text: "something about like how its bad to not tell the truth its very deep im very smart ok"},
                            {type: "messages", text: "im tired"}                        ],

                    }],
                    
            }),
            
            healer2: new Person ({
                x: utilities.withGrid(20),
                y: utilities.withGrid(21),                
                src: "./assets/healer2.png", 
                behaviorLoop: [
                    { type: "stand", direction: "down"},],

                talking: [
                    {
                        events: [
                            {facePlayer: "healer2", type: "messages", 
                            text: "just,,,, wash your hands of it,,,"},
                            {type: "messages", text: "im tired"}                        ],

                    }]

            }),
            teensy1: new Person ({
                x: utilities.withGrid(6),
                y: utilities.withGrid(18),
                src: "./assets/teensy1.png",
                behaviorLoop: [
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "stand", direction: "down", time: 3000},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "stand", direction: "down", time: 7000},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "stand", direction: "up", time: 4500},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "stand", direction: "up", time: 6000},

                
                ],


                talking: [
                    {
                        events: [
                            {facePlayer: "teensy1", type: "messages", 
                            text: "want to trade presents?"},
                                ],

                    }],
                    
            }),
            teensy2: new Person ({
                x: utilities.withGrid(42),
                y: utilities.withGrid(9),
                src: "./assets/teensy2.png",
                behaviorLoop: [
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "stand", direction: "down", time: 3000},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "walk", direction: "down"},
                    { type: "stand", direction: "down", time: 7000},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "stand", direction: "up", time: 4500},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "walk", direction: "up"},
                    { type: "stand", direction: "up", time: 6000},


                
                ],


                talking: [
                    {
                        events: [
                            {facePlayer: "teensy2", type: "messages", 
                            text: "want to trade presents?"},
                                ],

                    }],
                    
            }),
            teensy3: new Person ({
                x: utilities.withGrid(11),
                y: utilities.withGrid(0),
                src: "./assets/teensy3.png",
                behaviorLoop: [
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "right"},
                    { type: "stand", direction: "right", time: 6100},                    
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "right"},
                    { type: "walk", direction: "right"},
                    { type: "stand", direction: "right", time: 4000},
                    { type: "walk", direction: "left"},
                    { type: "walk", direction: "left"},
                    { type: "walk", direction: "left"},
                    { type: "walk", direction: "left"},
                    { type: "walk", direction: "left"},
                    { type: "walk", direction: "left"},
                    { type: "stand", direction: "left", time: 5400},
                    { type: "walk", direction: "left"},
                    { type: "walk", direction: "left"},
                    { type: "walk", direction: "left"},
                    { type: "walk", direction: "left"},
                    { type: "walk", direction: "left"},
                    { type: "walk", direction: "left"},

                    { type: "walk", direction: "left"},
                    { type: "walk", direction: "left"},
                    { type: "stand", direction: "left", time: 6600},


                
                ],


                talking: [
                    {
                        events: [
                            {facePlayer: "teensy3", type: "messages", 
                            text: "want to trade presents?"},
                                ],

                    }],
                    
            }),


            ///TRASHCANSS!!!!!

            trashcan1: new Person ({
                x: utilities.withGrid(38),
                y: utilities.withGrid(29),
                src: "./assets/trashcan.png",
                behaviorLoop: [
                    { type: "stand", direction: "down"},],

                talking: [
                    {
                        events: [
                            {type: "messages", text: "empty"}                        
                        ],

                    }],
                    
            }),
            trashcan2: new Person ({
                x: utilities.withGrid(40),
                y: utilities.withGrid(-2),
                src: "./assets/trashcan.png",
                behaviorLoop: [
                    { type: "stand", direction: "down"},],

                talking: [
                    {
                        events: [
                            {type: "messages", text: "empty"}                        
                        ],

                    }],
                    
            }),
            trashcan3: new Person ({
                x: utilities.withGrid(39),
                y: utilities.withGrid(-2),
                src: "./assets/trashcan.png",
                behaviorLoop: [
                    { type: "stand", direction: "down"},],

                talking: [
                    {
                        events: [
                            {type: "messages", text: "empty"}                        
                        ],

                    }],
                    
            }),

            trashcan4: new Person ({
                x: utilities.withGrid(27),
                y: utilities.withGrid(7),
                src: "./assets/trashcan.png",
                behaviorLoop: [
                    { type: "stand", direction: "down"},],

                talking: [
                    {
                        events: [
                            {type: "messages", text: "empty"}                        
                        ],

                    }],
                    
            }),

        
            trashcan5: new Person ({
                x: utilities.withGrid(12),
                y: utilities.withGrid(24),
                src: "./assets/trashcan.png",
                behaviorLoop: [
                    { type: "stand", direction: "down"},],

                talking: [
                    {
                        events: [
                            {type: "messages", text: "empty"}                        
                        ],

                    }],
                    
            }),

            trashcan6: new Person ({
                x: utilities.withGrid(13),
                y: utilities.withGrid(24),
                src: "./assets/trashcan.png",
                behaviorLoop: [
                    { type: "stand", direction: "down"},],

                talking: [
                    {
                        events: [
                            {type: "messages", text: "empty"}                        
                        ],

                    }],
                    
            }),

        },        
        
        cutSceneSpaces: {
            
            [utilities.asGridCoord(3, 21)] : [{
                events: [
                    {type: "messages", text: "This area is infected."},
                ]
            }],

            [utilities.asGridCoord(47, 10)] : [{
                events: [
                    {type: "messages", text: "This area is infected."},
                ]
            }],

            [utilities.asGridCoord(6, 34)] : [{
                events: [
                    {type: "messages", text: "This area is infected."},
                ]
            }],

            [utilities.asGridCoord(42, 34)] : [{
                events: [
                    {type: "messages", text: "This area is infected."},
                ]
            }]


        },


            walls: {
                //walls need work lmaofoa    

                // BUILDING ONE
                [utilities.asGridCoord(12, 6)] : true,
                [utilities.asGridCoord(13, 6)] : true,
                [utilities.asGridCoord(14, 6)] : true,
                [utilities.asGridCoord(15, 6)] : true,
                [utilities.asGridCoord(16, 6)] : true,
                [utilities.asGridCoord(17, 6)] : true,
                [utilities.asGridCoord(18, 6)] : true,
                [utilities.asGridCoord(19, 6)] : true,

                [utilities.asGridCoord(12, 7)] : true,
                [utilities.asGridCoord(13, 7)] : true,
                [utilities.asGridCoord(14, 7)] : true,
                [utilities.asGridCoord(15, 7)] : true,
                [utilities.asGridCoord(16, 7)] : true,
                [utilities.asGridCoord(17, 7)] : true,
                [utilities.asGridCoord(18, 7)] : true,
                [utilities.asGridCoord(19, 7)] : true,
    
                [utilities.asGridCoord(12, 8)] : true,
                [utilities.asGridCoord(13, 8)] : true,
                [utilities.asGridCoord(14, 8)] : true,
                [utilities.asGridCoord(15, 8)] : true,
                [utilities.asGridCoord(16, 8)] : true,
                [utilities.asGridCoord(17, 8)] : true,
                [utilities.asGridCoord(18, 8)] : true,
                [utilities.asGridCoord(19, 8)] : true,

                // BUILDING TWO
                [utilities.asGridCoord(22, 6)] : true,
                [utilities.asGridCoord(23, 6)] : true,
                [utilities.asGridCoord(24, 6)] : true,
                [utilities.asGridCoord(25, 6)] : true,

                [utilities.asGridCoord(22, 7)] : true,
                [utilities.asGridCoord(23, 7)] : true,
                [utilities.asGridCoord(24, 7)] : true,
                [utilities.asGridCoord(25, 7)] : true,
    
                [utilities.asGridCoord(22, 8)] : true,
                [utilities.asGridCoord(23, 8)] : true,
                [utilities.asGridCoord(24, 8)] : true,
                [utilities.asGridCoord(25, 8)] : true,

                //BUILDING THREE
                [utilities.asGridCoord(30, 6)] : true,
                [utilities.asGridCoord(31, 6)] : true,
                [utilities.asGridCoord(32, 6)] : true,
                [utilities.asGridCoord(33, 6)] : true,
                [utilities.asGridCoord(34, 6)] : true,
            
                [utilities.asGridCoord(30, 7)] : true,
                [utilities.asGridCoord(31, 7)] : true,
                [utilities.asGridCoord(32, 7)] : true,
                [utilities.asGridCoord(33, 7)] : true,
                [utilities.asGridCoord(34, 7)] : true,
            
                [utilities.asGridCoord(30, 8)] : true,
                [utilities.asGridCoord(31, 8)] : true,
                [utilities.asGridCoord(32, 8)] : true,
                [utilities.asGridCoord(33, 8)] : true,
                [utilities.asGridCoord(34, 8)] : true,

                //BUILDING 4
                [utilities.asGridCoord(10, 17)] : true,
                [utilities.asGridCoord(11, 17)] : true,
                [utilities.asGridCoord(12, 17)] : true,
                [utilities.asGridCoord(13, 17)] : true,
                [utilities.asGridCoord(14, 17)] : true,
                [utilities.asGridCoord(15, 17)] : true,
                [utilities.asGridCoord(16, 17)] : true,
                [utilities.asGridCoord(17, 17)] : true,

                [utilities.asGridCoord(10, 18)] : true,
                [utilities.asGridCoord(11, 18)] : true,
                [utilities.asGridCoord(12, 18)] : true,
                [utilities.asGridCoord(13, 18)] : true,
                [utilities.asGridCoord(14, 18)] : true,
                [utilities.asGridCoord(15, 18)] : true,
                [utilities.asGridCoord(16, 18)] : true,
                [utilities.asGridCoord(17, 18)] : true,

                [utilities.asGridCoord(10, 19)] : true,
                [utilities.asGridCoord(11, 19)] : true,
                [utilities.asGridCoord(12, 19)] : true,
                [utilities.asGridCoord(13, 19)] : true,
                [utilities.asGridCoord(14, 19)] : true,
                [utilities.asGridCoord(15, 19)] : true,
                [utilities.asGridCoord(16, 19)] : true,
                [utilities.asGridCoord(17, 19)] : true,

                //BUILDING 5
                [utilities.asGridCoord(21, 17)] : true,
                [utilities.asGridCoord(22, 17)] : true,
                [utilities.asGridCoord(23, 17)] : true,
                [utilities.asGridCoord(24, 17)] : true,
                [utilities.asGridCoord(25, 17)] : true,

                [utilities.asGridCoord(21, 18)] : true,
                [utilities.asGridCoord(22, 18)] : true,
                [utilities.asGridCoord(23, 18)] : true,
                [utilities.asGridCoord(24, 18)] : true,
                [utilities.asGridCoord(25, 18)] : true,

                [utilities.asGridCoord(21, 19)] : true,
                [utilities.asGridCoord(22, 19)] : true,
                [utilities.asGridCoord(23, 19)] : true,
                [utilities.asGridCoord(24, 19)] : true,
                [utilities.asGridCoord(25, 19)] : true,

                //BUILDING 6
                [utilities.asGridCoord(30, 18)] : true,
                [utilities.asGridCoord(31, 18)] : true,
                [utilities.asGridCoord(32, 18)] : true,
                [utilities.asGridCoord(33, 18)] : true,
                [utilities.asGridCoord(34, 18)] : true,
                [utilities.asGridCoord(35, 18)] : true,
                [utilities.asGridCoord(36, 18)] : true,
                [utilities.asGridCoord(37, 18)] : true,

                [utilities.asGridCoord(30, 17)] : true,
                [utilities.asGridCoord(31, 17)] : true,
                [utilities.asGridCoord(32, 17)] : true,
                [utilities.asGridCoord(33, 17)] : true,
                [utilities.asGridCoord(34, 17)] : true,
                [utilities.asGridCoord(35, 17)] : true,
                [utilities.asGridCoord(36, 17)] : true,
                [utilities.asGridCoord(37, 17)] : true,

                [utilities.asGridCoord(30, 19)] : true,
                [utilities.asGridCoord(31, 19)] : true,
                [utilities.asGridCoord(32, 19)] : true,
                [utilities.asGridCoord(33, 19)] : true,
                [utilities.asGridCoord(34, 19)] : true,
                [utilities.asGridCoord(35, 19)] : true,
                [utilities.asGridCoord(36, 19)] : true,
                [utilities.asGridCoord(37, 19)] : true,

                //BUILDING 7
                [utilities.asGridCoord(10, 27)] : true,
                [utilities.asGridCoord(11, 27)] : true,
                [utilities.asGridCoord(12, 27)] : true,
                [utilities.asGridCoord(13, 27)] : true,
                [utilities.asGridCoord(14, 27)] : true,
                [utilities.asGridCoord(15, 27)] : true,
                [utilities.asGridCoord(16, 27)] : true,
                [utilities.asGridCoord(17, 27)] : true,
                
                [utilities.asGridCoord(10, 28)] : true,
                [utilities.asGridCoord(11, 28)] : true,
                [utilities.asGridCoord(12, 28)] : true,
                [utilities.asGridCoord(13, 28)] : true,
                [utilities.asGridCoord(14, 28)] : true,
                [utilities.asGridCoord(15, 28)] : true,
                [utilities.asGridCoord(16, 28)] : true,
                [utilities.asGridCoord(17, 28)] : true,
                
                [utilities.asGridCoord(10, 29)] : true,
                [utilities.asGridCoord(11, 29)] : true,
                [utilities.asGridCoord(12, 29)] : true,
                [utilities.asGridCoord(13, 29)] : true,
                [utilities.asGridCoord(14, 29)] : true,
                [utilities.asGridCoord(15, 29)] : true,
                [utilities.asGridCoord(16, 29)] : true,
                [utilities.asGridCoord(17, 29)] : true,

                //BUILDING EIGHT
                [utilities.asGridCoord(21, 27)] : true,
                [utilities.asGridCoord(22, 27)] : true,
                [utilities.asGridCoord(23, 27)] : true,
                [utilities.asGridCoord(24, 27)] : true,

                [utilities.asGridCoord(21, 28)] : true,
                [utilities.asGridCoord(22, 28)] : true,
                [utilities.asGridCoord(23, 28)] : true,
                [utilities.asGridCoord(24, 28)] : true,

                [utilities.asGridCoord(21, 29)] : true,
                [utilities.asGridCoord(22, 29)] : true,
                [utilities.asGridCoord(23, 29)] : true,
                [utilities.asGridCoord(24, 29)] : true,

                //BUILDING NINE
                [utilities.asGridCoord(29, 27)] : true,
                [utilities.asGridCoord(30, 27)] : true,
                [utilities.asGridCoord(31, 27)] : true,
                [utilities.asGridCoord(32, 27)] : true,
                [utilities.asGridCoord(33, 27)] : true,
                [utilities.asGridCoord(34, 27)] : true,
                [utilities.asGridCoord(35, 27)] : true,
                [utilities.asGridCoord(36, 27)] : true,

                [utilities.asGridCoord(29, 28)] : true,
                [utilities.asGridCoord(30, 28)] : true,
                [utilities.asGridCoord(31, 28)] : true,
                [utilities.asGridCoord(32, 28)] : true,
                [utilities.asGridCoord(33, 28)] : true,
                [utilities.asGridCoord(34, 28)] : true,
                [utilities.asGridCoord(35, 28)] : true,
                [utilities.asGridCoord(36, 28)] : true,

                [utilities.asGridCoord(29, 29)] : true,
                [utilities.asGridCoord(30, 29)] : true,
                [utilities.asGridCoord(31, 29)] : true,
                [utilities.asGridCoord(32, 29)] : true,
                [utilities.asGridCoord(33, 29)] : true,
                [utilities.asGridCoord(34, 29)] : true,
                [utilities.asGridCoord(35, 29)] : true,
                [utilities.asGridCoord(36, 29)] : true,


                //EDGES
                [utilities.asGridCoord(3, -4)] : true,
                [utilities.asGridCoord(3, -3)] : true,
                [utilities.asGridCoord(3, -2)] : true,
                [utilities.asGridCoord(3, -1)] : true,
                [utilities.asGridCoord(3, 0)] : true,
                [utilities.asGridCoord(3, 1)] : true,
                [utilities.asGridCoord(3, 2)] : true,
                [utilities.asGridCoord(3, 3)] : true,
                [utilities.asGridCoord(3, 4)] : true,
                [utilities.asGridCoord(3, 5)] : true,
                [utilities.asGridCoord(3, 6)] : true,
                [utilities.asGridCoord(3, 7)] : true,
                [utilities.asGridCoord(3, 8)] : true,
                [utilities.asGridCoord(3, 9)] : true,
                [utilities.asGridCoord(3, 10)] : true,
                [utilities.asGridCoord(3, 11)] : true,
                [utilities.asGridCoord(3, 12)] : true,
                [utilities.asGridCoord(3, 13)] : true,
                [utilities.asGridCoord(3, 14)] : true,
                [utilities.asGridCoord(3, 15)] : true,
                [utilities.asGridCoord(3, 16)] : true,
                [utilities.asGridCoord(3, 17)] : true,
                [utilities.asGridCoord(3, 18)] : true,
                [utilities.asGridCoord(3, 19)] : true,
                [utilities.asGridCoord(3, 20)] : true,
                //BRIDGE
                [utilities.asGridCoord(2, 21)] : true,
                [utilities.asGridCoord(3, 22)] : true,
                [utilities.asGridCoord(3, 23)] : true,
                [utilities.asGridCoord(3, 24)] : true,
                [utilities.asGridCoord(3, 25)] : true,
                [utilities.asGridCoord(3, 26)] : true,
                [utilities.asGridCoord(3, 27)] : true,
                [utilities.asGridCoord(3, 28)] : true,
                [utilities.asGridCoord(3, 29)] : true,
                [utilities.asGridCoord(3, 30)] : true,
                [utilities.asGridCoord(3, 31)] : true,
                [utilities.asGridCoord(3, 32)] : true,
                [utilities.asGridCoord(3, 33)] : true,
                [utilities.asGridCoord(3, 34)] : true,

                [utilities.asGridCoord(47, -4)] : true,
                [utilities.asGridCoord(47, -3)] : true,
                [utilities.asGridCoord(47, -2)] : true,
                [utilities.asGridCoord(47, -1)] : true,
                [utilities.asGridCoord(47, 0)] : true,
                [utilities.asGridCoord(47, 1)] : true,
                [utilities.asGridCoord(47, 2)] : true,
                [utilities.asGridCoord(47, 3)] : true,
                [utilities.asGridCoord(47, 4)] : true,
                [utilities.asGridCoord(47, 5)] : true,
                [utilities.asGridCoord(47, 6)] : true,
                [utilities.asGridCoord(47, 7)] : true,
                [utilities.asGridCoord(47, 8)] : true,
                [utilities.asGridCoord(47, 9)] : true,
                //BRIDGE
                [utilities.asGridCoord(48, 10)] : true,
                [utilities.asGridCoord(47, 11)] : true,
                [utilities.asGridCoord(47, 12)] : true,
                [utilities.asGridCoord(47, 13)] : true,
                [utilities.asGridCoord(47, 14)] : true,
                [utilities.asGridCoord(47, 15)] : true,
                [utilities.asGridCoord(47, 16)] : true,
                [utilities.asGridCoord(47, 17)] : true,
                [utilities.asGridCoord(47, 18)] : true,
                [utilities.asGridCoord(47, 19)] : true,
                [utilities.asGridCoord(47, 20)] : true,
                [utilities.asGridCoord(47, 21)] : true,
                [utilities.asGridCoord(47, 22)] : true,
                [utilities.asGridCoord(47, 23)] : true,
                [utilities.asGridCoord(47, 24)] : true,
                [utilities.asGridCoord(47, 25)] : true,
                [utilities.asGridCoord(47, 26)] : true,
                [utilities.asGridCoord(47, 27)] : true,
                [utilities.asGridCoord(47, 28)] : true,
                [utilities.asGridCoord(47, 29)] : true,
                [utilities.asGridCoord(47, 30)] : true,
                [utilities.asGridCoord(47, 31)] : true,
                [utilities.asGridCoord(47, 32)] : true,
                [utilities.asGridCoord(47, 33)] : true,
                [utilities.asGridCoord(47, 34)] : true,

                //RIVER CORNER
                [utilities.asGridCoord(4, -2)] : true,
                [utilities.asGridCoord(5, -3)] : true,

                [utilities.asGridCoord(3, -4)] : true,
                [utilities.asGridCoord(4, -4)] : true,
                [utilities.asGridCoord(5, -4)] : true,
                [utilities.asGridCoord(6, -4)] : true,
                [utilities.asGridCoord(7, -4)] : true,
                [utilities.asGridCoord(8, -4)] : true,
                [utilities.asGridCoord(9, -4)] : true,
                [utilities.asGridCoord(10, -4)] : true,
                [utilities.asGridCoord(11, -4)] : true,
                [utilities.asGridCoord(12, -4)] : true,
                [utilities.asGridCoord(13, -4)] : true,
                [utilities.asGridCoord(14, -4)] : true,
                [utilities.asGridCoord(15, -4)] : true,
                [utilities.asGridCoord(16, -4)] : true,
                [utilities.asGridCoord(17, -4)] : true,
                [utilities.asGridCoord(18, -4)] : true,
                [utilities.asGridCoord(19, -4)] : true,
                [utilities.asGridCoord(20, -4)] : true,
                [utilities.asGridCoord(21, -4)] : true,
                [utilities.asGridCoord(22, -4)] : true,
                [utilities.asGridCoord(23, -4)] : true,
                [utilities.asGridCoord(24, -4)] : true,
                [utilities.asGridCoord(25, -4)] : true,
                [utilities.asGridCoord(26, -4)] : true,
                [utilities.asGridCoord(27, -4)] : true,
                [utilities.asGridCoord(28, -4)] : true,
                [utilities.asGridCoord(29, -4)] : true,
                [utilities.asGridCoord(30, -4)] : true,
                [utilities.asGridCoord(31, -4)] : true,
                [utilities.asGridCoord(32, -4)] : true,
                [utilities.asGridCoord(33, -4)] : true,
                [utilities.asGridCoord(34, -4)] : true,
                [utilities.asGridCoord(35, -4)] : true,
                [utilities.asGridCoord(36, -4)] : true,
                [utilities.asGridCoord(37, -4)] : true,
                [utilities.asGridCoord(38, -4)] : true,
                [utilities.asGridCoord(39, -4)] : true,
                [utilities.asGridCoord(40, -4)] : true,
                [utilities.asGridCoord(41, -4)] : true,
                [utilities.asGridCoord(42, -4)] : true,
                [utilities.asGridCoord(43, -4)] : true,
                [utilities.asGridCoord(44, -4)] : true,
                [utilities.asGridCoord(45, -4)] : true,
                [utilities.asGridCoord(46, -4)] : true,
                [utilities.asGridCoord(47, -4)] : true,
                [utilities.asGridCoord(48, -4)] : true,
                [utilities.asGridCoord(49, -4)] : true,

                //RIVER CORNER
                [utilities.asGridCoord(45, -3)] : true,
                [utilities.asGridCoord(46, -2)] : true,
                [utilities.asGridCoord(46, -1)] : true,
                [utilities.asGridCoord(46, 0)] : true,


                [utilities.asGridCoord(0, 34)] : true,
                [utilities.asGridCoord(1, 34)] : true,
                [utilities.asGridCoord(2, 34)] : true,
                [utilities.asGridCoord(3, 34)] : true,
                [utilities.asGridCoord(4, 34)] : true,
                [utilities.asGridCoord(5, 34)] : true,
                //BRIDGE
                [utilities.asGridCoord(6, 35)] : true,
                [utilities.asGridCoord(7, 34)] : true,
                [utilities.asGridCoord(8, 34)] : true,
                [utilities.asGridCoord(9, 34)] : true,
                [utilities.asGridCoord(10, 34)] : true,
                [utilities.asGridCoord(11, 34)] : true,
                [utilities.asGridCoord(12, 34)] : true,
                [utilities.asGridCoord(13, 34)] : true,
                [utilities.asGridCoord(14, 34)] : true,
                [utilities.asGridCoord(15, 34)] : true,
                [utilities.asGridCoord(16, 34)] : true,
                [utilities.asGridCoord(17, 34)] : true,
                [utilities.asGridCoord(18, 34)] : true,
                [utilities.asGridCoord(19, 34)] : true,
                [utilities.asGridCoord(20, 34)] : true,
                [utilities.asGridCoord(21, 34)] : true,
                [utilities.asGridCoord(22, 34)] : true,
                [utilities.asGridCoord(23, 34)] : true,
                [utilities.asGridCoord(24, 34)] : true,
                [utilities.asGridCoord(25, 34)] : true,
                [utilities.asGridCoord(26, 34)] : true,
                [utilities.asGridCoord(27, 34)] : true,
                [utilities.asGridCoord(28, 34)] : true,
                [utilities.asGridCoord(29, 34)] : true,
                [utilities.asGridCoord(30, 34)] : true,
                [utilities.asGridCoord(31, 34)] : true,
                [utilities.asGridCoord(32, 34)] : true,
                [utilities.asGridCoord(33, 34)] : true,
                [utilities.asGridCoord(34, 34)] : true,
                [utilities.asGridCoord(35, 34)] : true,
                [utilities.asGridCoord(36, 34)] : true,
                [utilities.asGridCoord(37, 34)] : true,
                [utilities.asGridCoord(38, 34)] : true,
                [utilities.asGridCoord(39, 34)] : true,
                [utilities.asGridCoord(40, 34)] : true,
                [utilities.asGridCoord(41, 34)] : true,
                //BRIDGE
                [utilities.asGridCoord(42, 35)] : true,
                [utilities.asGridCoord(43, 34)] : true,
                [utilities.asGridCoord(44, 34)] : true,
                [utilities.asGridCoord(45, 34)] : true,
                [utilities.asGridCoord(46, 34)] : true,
                [utilities.asGridCoord(47, 34)] : true,
                [utilities.asGridCoord(48, 34)] : true,
                [utilities.asGridCoord(49, 34)] : true, 
        }
    },
    DemoRoom: {
        lowerSrc: "./assets/demoroom.png",
        // upperSrc: "",
        gameObjects: {
            healer3: new Person ({
                isPlayerControlled: true, 
                x: utilities.withGrid(2),
                y: utilities.withGrid(2),
                src: "./assets/healer3.png"

            }),

            healer1: new Person ({
                x: utilities.withGrid(5),
                y: utilities.withGrid(6),
            }),
            healer2: new Person ({
                x: utilities.withGrid(13),
                y: utilities.withGrid(9),                
                src: "./assets/healer2.png"

            })
        },
        walls: {
            //walls need work lmaofoa 
            [utilities.asGridCoord(13, 9)] : true,
            [utilities.asGridCoord(2, 2)] : true


        }
    },

    Outside: {
        lowerSrc: "./assets/outside2.png",
        // upperSrc: "",
        gameObjects: {
            healer1: new Person({
                x: utilities.withGrid(12),
                y: utilities.withGrid(8),
                behaviorLoop: [
                    { type: "stand", direction: "left", time: 820},
                    { type: "stand", direction: "up", time: 340},
                    { type: "stand", direction: "right", time: 700},
                    { type: "stand", direction: "down", time: 2400},
            ],
                talking: [
                    {
                        events: [
                            {facePlayer: "healer1", type: "messages", 
                            text: "something about like how its like bad to not do good things its very deep im very smart ok"},
                            {type: "messages", text: "im tired"}                        ],

                    }
                ]
        }),
            healer2: new Person ({
                x: utilities.withGrid(28),
                y: utilities.withGrid(11),
                src: "./assets/healer2.png",
                // behaviorLoop: [
                //     { type: "walk", direction: "left"},
                //     {type: "stand", direction: "left", time: 800},
                //     { type: "walk", direction: "up"},
                //     {type: "walk", direction: "right"},
                //     {type: "walk", direction: "down"}

                // ]

            }),
            healer3: new Person ({
                isPlayerControlled: true, 
                x: utilities.withGrid(18),
                y: utilities.withGrid(10),
                src: "./assets/healer3.png"

            })

        },
        walls: {
            //walls need work lmaofoa 
            [utilities.asGridCoord(4, -1)] : true,
            [utilities.asGridCoord(3, -1)] : true,
            [utilities.asGridCoord(2, -1)] : true,
            [utilities.asGridCoord(1, -1)] : true,
            [utilities.asGridCoord(0, -1)] : true,

            [utilities.asGridCoord(-1, -1)] : true,
            [utilities.asGridCoord(-1, 0)] : true,
            [utilities.asGridCoord(-1, 1)] : true,
            [utilities.asGridCoord(-1, 2)] : true,
            [utilities.asGridCoord(-1, 3)] : true,
            [utilities.asGridCoord(-1, 4)] : true,
            [utilities.asGridCoord(-1, 5)] : true,
            [utilities.asGridCoord(-1, 6)] : true,
            [utilities.asGridCoord(-1, 7)] : true,
            [utilities.asGridCoord(-1, 8)] : true,
            [utilities.asGridCoord(-1, 9)] : true,
            [utilities.asGridCoord(-1, 10)] : true,
            [utilities.asGridCoord(-1, 11)] : true,
            [utilities.asGridCoord(-1, 12)] : true,
            [utilities.asGridCoord(-1, 13)] : true,
            [utilities.asGridCoord(-1, 14)] : true,
            [utilities.asGridCoord(-1, 15)] : true,
            [utilities.asGridCoord(-1, 16)] : true,
            [utilities.asGridCoord(-1, 17)] : true,
            [utilities.asGridCoord(-1, 18)] : true,
            [utilities.asGridCoord(-1, 19)] : true,
            [utilities.asGridCoord(0, 20)] : true,
            [utilities.asGridCoord(1, 20)] : true,
            [utilities.asGridCoord(2, 20)] : true,

            [utilities.asGridCoord(5, 20)] : true,
            [utilities.asGridCoord(6, 20)] : true,

            //building
            [utilities.asGridCoord(27, 10)] : true,
            [utilities.asGridCoord(23, 10)] : true,
            [utilities.asGridCoord(24, 10)] : true,
            [utilities.asGridCoord(25, 10)] : true,
            [utilities.asGridCoord(26, 10)] : true,
            [utilities.asGridCoord(28, 10)] : true,
            [utilities.asGridCoord(29, 10)] : true,
            [utilities.asGridCoord(30, 10)] : true,

        },
        cutSceneSpaces: {

            [utilities.asGridCoord(26,11)] : [{
                events: [
                    {who: "healer2", type: "stand", direction: "left"},
                    {who: "healer3", type: "stand", direction: "right"},
                    {type: "messages", text: "what are you doing clara"},
                    {who: "healer2", type: "stand", direction: "down"},

                ]
            }],
            [utilities.asGridCoord(4, 21)] : [{
                events: [
                    {type: "changeMap", map: "DemoRoom"}

                ]
            }]


        }



    },
}