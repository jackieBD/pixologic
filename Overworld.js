class Overworld {
    constructor(config){
        this.element = config.element 
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
        this.map = null

    }
    startGameLoop() {
        const step = () => {
          //Clear off the canvas
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   
          // Establish Camera
        const cameraPerson = this.map.gameObjects.healer3

        Object.values(this.map.gameObjects).forEach(object => {
            object.update({
              arrow: this.directionInput.direction,
              map: this.map,
            })
          })


          //Draw Lower layer
          this.map.drawLowerImage(this.ctx, cameraPerson);
    
          //Draw Game Objects
          Object.values(this.map.gameObjects).sort((a,b)=>{
            return a.y-b.y
          }).forEach(object => {
            object.sprite.draw(this.ctx, cameraPerson);
          })
          this.map.drawUpperImage(this.ctx, cameraPerson);

    
          requestAnimationFrame(() => {
            step();   
          })
        }
        step();
     }

     bindActionInput(){
       new KeypressListener("Enter", ()=>{
         //is there a person here  to talk to?
         this.map.checkForActionCutscene()
         
       })
       new KeypressListener("KeyE", ()=>{
        //is there a person here  to talk to?
        this.map.checkForActionCutscene()
        
      })

      }
    
     bindHeroPositionCheck(){
       document.addEventListener("PersonWalkingComplete", e=>{
         if (e.detail.whoId === "healer3"){
          this.map.checkForFootstepCutscene()
        }
       })
     }

     startMap(mapConfig){
      this.map = new OverworldMap(mapConfig)
      this.map.overworld = this
      this.map.mountObjects()


     }


    init(){
      this.startMap(window.OverworldMaps.Street)

      this.bindActionInput()
      this.bindHeroPositionCheck()

        this.directionInput = new DirectionInput()
        this.directionInput.init()
        // this.directionInput.direction

        this.startGameLoop()

        // this.map.startCutscene(
        //   [
        //     {who: "healer3", type: "walk", direction: "down"},
        //     {type: "changeMap", map: "DemoRoom"}
            
          // {who: "healer3", type: "walk", direction: "down"},
          // {who: "healer3", type: "walk", direction: "down"},
          // {who: "healer1", type: "walk", direction: "down"},
          // {who: "healer1", type: "walk", direction: "down"},
          // {who: "healer1", type: "walk", direction: "left"},
          // {who: "healer3", type: "stand", direction: "right"},
          // {type: "messages", text: "we hate each other lmaof"},
          // {who: "healer1", type: "walk", direction: "up"},
          // {who: "healer1", type: "walk", direction: "up"},
          // {who: "healer1", type: "walk", direction: "up"},

        // ]
        // )


    
    }
}