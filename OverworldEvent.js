class OverworldEvent{
    constructor({map, event}){
        this.map = map
        this.event = event
    }


    stand(resolve){
        const who = this.map.gameObjects[this.event.who]
        who.startBehavior({
            map: this.map
        }, {
                type: "stand",
                direction: this.event.direction,
                time: this.event.time
            })

        // set up a handler to complete when correct person is done walking and resolve
        const completeHandler = e =>{
            if (e.detail.whoId === this.event.who){
                document.removeEventListener("PersonStandComplete", completeHandler)
                resolve()

            }

        }

        document.addEventListener("PersonStandComplete", completeHandler)


    }

    walk(resolve){
        const who = this.map.gameObjects[this.event.who]
        who.startBehavior({
            map: this.map
        }, {
                type: "walk",
                direction: this.event.direction,
                retry: true
            })

        //set up a handler to complete when correct person is done walking and resolve
        const completeHandler = e =>{
            if (e.detail.whoId === this.event.who){
                document.removeEventListener("PersonWalkingComplete", completeHandler)
                resolve()

            }

        }

        document.addEventListener("PersonWalkingComplete", completeHandler)
        
    }

    messages(resolve){
        if(this.event.facePlayer){
            const obj = this.map.gameObjects[this.event.facePlayer]
            obj.direction = utilities.oppositeDirection(this.map.gameObjects["healer3"].direction)
        }


        const message = new Messages({
            text: this.event.text,
            onComplete: ()=>resolve()

        })

        message.init(document.querySelector(".game-container"))
    }

    changeMap(resolve){
        const sceneTrans = new SceneTrans()
        sceneTrans.init(document.querySelector(".game-container"), ()=>{
        }
        )
        this.map.overworld.startMap(window.OverworldMaps[this.event.map])
        resolve()
        sceneTrans.fadeOut
    }

    init(){
        return new Promise(resolve=>{
            this[this.event.type](resolve)
        })
    }


}