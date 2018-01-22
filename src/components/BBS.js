import React, {Component} from 'react';
import * as firebase from 'firebase';
import Login from './LoginScreen';
import ArticleListScreen from './ArticleListScreen';
import AccountScreen from './AccountScreen';

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
    firebase.auth().onAuthStateChanged( async user => {  //function 키워드를 화살표함수로 변경, this.setState .. this 때문
      if (user) {
        const snapshot = await firebase.database().ref(`users/${user.uid}/nickName`).once('value');
        // User is signed in.
        this.setState({
            page: 'list',
            uid: user.uid,
            nickName: snapshot.val()
        });

        this.fetchArticles();

      } else {
        this.setState({
            page: 'login'
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

  //firebase에 저장요청
  saveNickName = async nickName => {
    const {uid} =  this.state;
    await firebase.database().ref(`users/${uid}/nickName`).set(nickName);
    this.setState({
      nickName: nickName,
      page: 'list'
    });
  }
  fetchArticles = async () => {
    //
    const nickNameSnapshot = await firebase.database().ref(`users/7uaAewMGqJPvfbo9KQ1XnrxfLFm1/nickName`).once('value');
    const nickName = nickNameSnapshot.val();

    //
    const snapshot = await firebase.database().ref('articles').once('value');
    const articlesObj = snapshot.val();
    if(articlesObj == null){
      this.setState({
        articles:null
      });
    }else{
      const articles = Object.entries(articlesObj).map(([articleId,articleItem]) => {
        return {
          ...articleItem,
          articleId
        }
      });
      const uidSet = new Set(articles.map(({uid}) => uid));
      const uidObj = {};
      const ps = Array.from(uidSet).map(async uid => {
        const snapshot = await firebase.database().ref(`users/${uid}/nickName`).once('value');
        const nickName = snapshot.val();
        return [uid, nickName];
      })
      const pairArr = await Promise.all(ps)
      for(const [uid, nickName] of pairArr) { //분해대입
        uidObj[uid] = nickName;
      }

      // for(const uid of uidArr){
      //   const nickNameSnapshot = await firebase.database().ref(`users/${uid}/nickName`).once('value');
      //   const nickName = nickNameSnapshot.val();
      //   uidObj[uid] = nickName;
      // }
      articles.forEach(article => {
        article.author = uidObj[article.uid];
      });
      this.setState({
        articles
      });
    }
  }
  render() {
    const {nickName, uid, articles} = this.state;
    return (
      <div>
        {
          this.state.page === 'login'
            ? <Login />
            : this.state.page === 'list'
            ? <ArticleListScreen
                onNickNameClick={this.pageToAccount}
                nickName={nickName || uid}
                articleArr={articles} />
            : this.state.page === 'account'
            ? <AccountScreen
                onNickNameClick={this.pageToAccount}
                nickName={nickName || uid}
                onNickNameSubmit={this.saveNickName} />
            : null
        }
      </div>
    )
  }
}
