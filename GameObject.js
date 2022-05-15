class GameObject {
    constructor (config) {
        this.id = null
        this.isMounted = false 
        this.x = config.x || 0
        this.y = config.y || 0
        this.direction = config.direction || "down"
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "./assets/healer1.png",
        })
        this.behaviorLoop = config.behaviorLoop || []
        this.behaviorLoopIndex = 0

        this.talking = config.talking || []

    }

    mount(map){
        this.isMounted = true
        map.addWall(this.x, this.y)

        //if we have a behavior start after a delay
        setTimeout(()=>{
            this.doBehaviorEvent(map)
        }, 10)

    }
    update() {

    }

    async doBehaviorEvent(map){

        //stop here if theres a cut scene or no behavior loop

        if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding){
            return
        }


        //settig up event 
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]
        eventConfig.who = this.id

        //create an event instance out of our next event config
        const eventHandler = new OverworldEvent({map, event: eventConfig})
        await eventHandler.init()
        //time gap with await

        this.behaviorLoopIndex +=1
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0
        }

        //do it again
        this.doBehaviorEvent(map)
    }
}

