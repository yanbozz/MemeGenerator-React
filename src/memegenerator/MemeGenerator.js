import React, {Component} from "react"

class MemeGenerator extends Component {
  constructor() {
    super()
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    }
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const {memes}  = response.data
        this.setState({ allMemeImgs: memes })

      })
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    //get a random number(index in tha array)
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
    //get the meme from that index
    const randMemeImg = this.state.allMemeImgs[randNum].url
    //set 'randomImg' to the '.url' of the random item I grabbed
    this.setState({
      randomImg: randMemeImg
    })
  }

  render() {
    return(
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            placeholder="Top text"
            value={this.state.topText}
            onChange={this.handleChange}
            />
          <input
            type="text"
            name="bottomText"
            placeholder="Bottom text"
            value={this.state.bottomText}
            onChange={this.handleChange}
            />

          <button>Gen</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt=""/>
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}

export default MemeGenerator
