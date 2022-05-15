const utilities = {
    withGrid(n) {
        return n*24
        },

    asGridCoord(x, y){
        return `${x*24},${y*24}`
    },



    nextPosition(initialX, initialY, direction){
        let x = initialX
        let y = initialY
        const size=24
        if (direction === "left"){
            x-= size}
        else if (direction === "right"){
                x+= size
            }
        else if (direction === "up"){
                y-= size
        }
        else if (direction === "down"){
            y+= size
        }
        return {x, y}
    },

    oppositeDirection(direction){
        if(direction === "left"){return "right"}
        if(direction === "right"){return "left"}
        if(direction === "up"){return "down"}
        if(direction === "down"){return "up"}

    },

    emitEvent(name, detail){
        const event = new CustomEvent(name, {
            detail
        })
        document.dispatchEvent(event)}




}
