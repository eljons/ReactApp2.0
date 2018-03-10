import React from 'react';
import {Card} from 'react-materialize';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const Post = (props) =>(
  <Card className='teal lighten-4 black-text'>
    <p><b>{props.userName}</b></p>
    <span>{props.postBody}</span>
  </Card>
)

export default Post;
