import React,{Component} from 'react';
import {CardPanel, Row, Col,Input,Button,Card} from 'react-materialize';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import firebase from 'firebase/app';
import 'firebase/database';
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
    var config = {
      apiKey: "AIzaSyCYTMkLrNxVEcl80fTYM2pmqHwpKZVHImE",
      authDomain: "react-chat-2799d.firebaseapp.com",
      databaseURL: "https://react-chat-2799d.firebaseio.com",
      projectId: "react-chat-2799d",
      storageBucket: "",
      messagingSenderId: "818941127099"
    };
    //referencia al objeto de firebase
    this.app = firebase.initializeApp(config);
    //referencia a la base de datos
    this.database = this.app.database();
    //referencia a la "tabla" post
    this.databseRef = this.database.ref().child('post');
  }

  componentWillMount(){
    this.databseRef.on('child_added', snapshot =>{
      const response = snapshot.val();
      this.updateLocalState(response);
  })}

  updateLocalState = (response) => {
    //copia del estado actual
    const posts = this.state.posts;
    //actualiza la copia del estado
    posts.push(response);
    //actualizar el estado
    this.setState(posts);
  }

  //Esta función concatena los valores y los envía al array
  addPost = (newPostBody, newPostUser) => {
    const newState = Object.assign({},this.state);

    //newState.posts.push({name: this.state.newPostUser, message: this.state.newPostBody});
    //copiar el estado
    const postToSave = {name: this.state.newPostUser, message: this.state.newPostBody}

    //newState.newPostBody= '';
    //this.setState(newState);
    //guarda en firebase nuestros posts
    this.databseRef.push().set(postToSave);
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
