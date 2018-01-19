import React, {Component} from 'react';
import * as firebase from 'firebase';
import Login from './LoginScreen';
import Article from './ArticleListScreen';
import Account from './AccountScreen';

export default class BBS extends Component {
  state = {
    page: 'login'
  }
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyBxoQ5HyaJbaYCJ2u_5HRLrtm6EKN8saXU",
      authDomain: "fds-cra-bbs-59240.firebaseapp.com",
      databaseURL: "https://fds-cra-bbs-59240.firebaseio.com",
      projectId: "fds-cra-bbs-59240",
      storageBucket: "fds-cra-bbs-59240.appspot.com",
      messagingSenderId: "189822287220"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged( user => {  //function 키워드를 화살표함수로 변경, this.setState .. this 때문
      if (user) {
        // User is signed in.
        this.setState(prevState => { //이전상태 참조하는 '함수'형 코드
          return {
            page: 'list',
            uid: user.uid
          }
        });
      } else {
        this.setState(prevState => {
          return {
            page: 'login'
          }
        });
      }
    });
  }

  pageToAccount = () => {
    this.setState(prevState => {
      return {
        page: 'account'
      }
    })
  }
  render() {
    return (
      <div>
        {
          this.state.page === 'login'
            ? <Login />
            : this.state.page === 'list'
            ? <Article onNickNameClick={this.pageToAccount}uid={this.state.uid}/>
            : this.state.page === 'account'
            ? <Account />
            : null
        }
      </div>
    )
  }
}
