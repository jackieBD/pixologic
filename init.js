function hi(){
    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    })
    overworld.init()
}

hi()