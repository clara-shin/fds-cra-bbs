import React, {Component} from 'react';
import NavBar from './NavBar';
//import * as firebase from 'firebase';

export default class Article extends Component {
  render() {
    const {uid, onNickNameClick} = this.props; //분해대입
    return (
      <div>
        <NavBar uid={uid} onNickNameClick={onNickNameClick}/>
        게시글 목록
      </div>
    )
  }
}
