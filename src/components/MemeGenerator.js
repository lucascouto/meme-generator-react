import React from 'react'

class MemeGenerator extends React.Component {

    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            this.setState({allMemeImgs: memes})
        })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        let allMemeImgs = this.state.allMemeImgs
        let newRandomImage = allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)]

        this.setState({
            randomImage: newRandomImage.url
        })
        event.preventDefault()
    }

    render() {
        return (
            <>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="topText" 
                        value={this.state.topText} 
                        placeholder="Top Text" 
                        onChange={this.handleChange} 
                    /> 
                    <input 
                        type="text" 
                        name="bottomText" 
                        value={this.state.bottomText}
                        placeholder="Bottom Text" 
                        onChange={this.handleChange} 
                    />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </>
        )
    }
}

export default MemeGenerator