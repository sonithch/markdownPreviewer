import React, { Component } from 'react';
import marked from 'marked';

class App extends Component {

  constructor(){
    super();
    this.state = {
      markdown: "# header\n## sub-header\n[A link to github](https://www.github.com)\n\nInline `code` has `back-ticks around` it.\n```\nCodeblocks have \nthree backticks on both sides\n```\n\n> Blockquotes are very handy in email to emulate reply text.\n> This line is part of the same quote.\n\n Image: \n![alt text](https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png 'Logo Title Text 1')\n\n*Italic* **BoldText**\n1. First ordered list item\n2. Another item",
      isHidden: true
    };
  }

  updateText(event){
    this.setState({
      markdown: event.target.value
    })
  }

  updateFormat(event){
    if(this.state.isHidden === true)
      this.setState({isHidden:false})
    else
      this.setState({isHidden:true})
  }

  render() {
    return (
      <div className="container text-center">
        <h1>Markdown Previewer</h1>
        <hr />
        <div className="row">
          <div className="col-sm-6">
            <h3>Editor</h3>
            <textarea id="editor" value={this.state.markdown} onChange={this.updateText.bind(this)}/>
          </div>
          <div className="col-sm-6">
            <h6>
              <select onChange={this.updateFormat.bind(this)}>
                <option value="html">HTML</option>
                <option value="preview">Preview</option>
              </select>
            </h6>
            <div id="preview">
              {this.state.isHidden && <Html markdown={this.state.markdown}/>}
              {!this.state.isHidden && <Preview markdown={this.state.markdown}/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//one way of writing function in reactjs
function Html(props){
  return <div>{marked(props.markdown)}</div>
}

//another way of writing function in reactjs
const Preview = (props) =>(
  <div dangerouslySetInnerHTML = {{__html: marked(props.markdown)}}/>
)

export default App;