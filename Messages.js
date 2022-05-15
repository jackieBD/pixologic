class Messages {
    constructor({ text, onComplete}){
        this.text = text
        this.onComplete = onComplete
        this.element = null
    }

    createElement(){
        this.element = document.createElement("div")
        this.element.classList.add("Message")

        this.element.innerHTML = (`
            <p class = "Message_p"></p>
            <button class = "Message_btn">Next</button>
        `)

        this.revealingText = new RevealingText({
            element: this.element.querySelector(".Message_p"),
            text: this.text

        })

    this.element.querySelector("button").addEventListener("click", ()=>{
        //close message
        this.done()
    })

    this.actionListener = new KeypressListener("Enter", ()=>{
        this.done()
    })
    this.actionListener = new KeypressListener("KeyE", ()=>{
        this.done()
    })

}


    done(){
        if(this.revealingText.isDone){
        this.element.remove()
        this.actionListener.unbind()    
        this.onComplete()}
        else{
            this.revealingText.warpToDone()
        }
    }

    
    init(container){
        this.createElement()
        container.appendChild(this.element)
        this.revealingText.init()

    }
}