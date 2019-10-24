import React, {Component} from 'react';
import Questionarre from './Components/Test';
import './App.css';

export default class App extends Component {
  render() {
    return (
            <div style={{textAlign:'center'}}>
            <Questionarre></Questionarre>
            </div>
            );
  }
}