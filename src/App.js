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
      loggedUser:'',
      loggedIn: false
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
    posts.reverse();
    this.setState(posts);
  }

  //Esta función concatena los valores y los envía al array
  addPost = (newPostBody, loggedUser) => {
    //const newState = Object.assign({},this.state);

    //newState.posts.push({name: this.state.loggedUser, message: this.state.newPostBody});
    //copiar el estado
    const postToSave = {name: this.state.loggedUser, message: this.state.newPostBody}

    //newState.newPostBody= '';
    //this.setState(newState);
    //guarda en firebase nuestros posts
    this.databseRef.push().set(postToSave);
    this.setState({ newPostBody:''})
  }
  //Esta función gestiona el valor del input mensaje
  handlePostEditorInputChange = (e)=>{
    this.setState({newPostBody: e.target.value
    });
  }
  //Esta función gestiona el valor del input usuario
  handlePostUserNameChange = (e)=>{
    this.setState({loggedUser: e.target.value
    });
  }
  //login functions
  handleLogin = () => {
    this.setState({ loggedIn: true});
  }
  handleLogout = () => {
    this.setState({ loggedIn: false, loggedUser: '', newPostBody:''})
  }
  //siempre van antes del render y después del constructor
  render(){
    return(
      <Row className="mainContainer">
        <h4>Chat React</h4>
        <Col s={12}>
            <CardPanel className="lighten-4 black-text messageBox">
              {this.state.posts.map((item,idx) => {
                return(<Post key={idx} userName={item.name} postBody={item.message} />)
              })}
            </CardPanel>

            <CardPanel className="lighten-4 black-text loginBox" data-isVisible={this.state.loggedIn}>
              <h5>Haz login para comenzar a chatear!</h5>
              <Input onChange={this.handlePostUserNameChange} s={12} label="Tu nombre" placeholder="Mr. Stranger" value={this.state.loggedUser} />
              <Button onClick={this.handleLogin} waves='light' node='a' large={true}> Entrar </Button>
            </CardPanel>

            <CardPanel className="lighten-4 black-text messageInput" data-isVisible={this.state.loggedIn}>
              <h5> Hola {this.state.loggedUser}!! </h5>
              <Input onChange={this.handlePostEditorInputChange} label="Escribe tu mensaje" placeholder="Say something" s={12} value={this.state.newPostBody} />
              <Button className="sendBtn" onClick={this.addPost} waves='light' node='a' large={true}> Enviar </Button>
              <Button onClick={this.handleLogout} waves='light' node='a' large={true}> logout </Button>
            </CardPanel>


        </Col>
      </Row>
    )
  }
}

export default App;
