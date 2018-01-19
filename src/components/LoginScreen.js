import React, {Component} from 'react';
import * as firebase from 'firebase';

export default class Login extends Component {
  HandleLoginClick = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result.user)
  }
  render() {
    return (
      <button onClick={this.HandleLoginClick}>구글로 로그인</button>
    )
  };

}
