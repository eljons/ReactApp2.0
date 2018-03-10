import React,{Component} from 'react';
import {CardPanel, Row, Col,Input,Button,Card} from 'react-materialize';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import Post from'./Post/component/Post';


class App extends Component{
  constructor(props){
    super(props);
    this.state={
      posts:[],
      newPostBody:'',
      newPostUser:''
    }
  }
  //Esta función concatena los valores y los envía al array
  addPost=()=>{
    const newState = Object.assign({},this.state);

    newState.posts.push({name: this.state.newPostUser, message: this.state.newPostBody});

    newState.newPostBody= '';
    this.setState(newState);
  }
  //Esta función gestiona el valor del input mensaje
  handlePostEditorInputChange = (e)=>{
    this.setState({newPostBody: e.target.value
    });
  }
  //Esta función gestiona el valor del input usuario
  handlePostUserNameChange = (e)=>{
    this.setState({newPostUser: e.target.value
    });
  }
  //siempre van antes del render y después del constructor
  render(){
    return(
      <Row className="mainContainer">
        <h4>Chat React</h4>
        <Col s={12}>
            <CardPanel s={12} className="lighten-4 black-text messageBox">
              {this.state.posts.map((item,idx) => {
                return(<Post key={idx} userName={item.name} postBody={item.message} />)
              })}
            </CardPanel>
            <Input onChange={this.handlePostUserNameChange} placeholder="Mr. Stranger" s={12} label="Tu nombre" />
            <Input onChange={this.handlePostEditorInputChange} placeholder="Hello World" s={12} label="Escribe tu mensaje" />
            <Button onClick={this.addPost} waves='light' node='a'>Enviar</Button>
        </Col>
      </Row>
    )
  }
}

export default App;
