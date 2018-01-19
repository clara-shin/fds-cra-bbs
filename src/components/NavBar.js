import React, {Component} from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';

const Wrap = styled.nav`
  display:flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(20deg,rgb(219,112,147),#daa357);
  padding:20px;
`;

const LogoutButton = styled.button`
  border: 2px solid #fff;
  background: palevioletred;
  color: #fff;
  border-radius: 2px;
  padding:10px 20px;
`;

const InnerLeft = styled.div`
  font-size: 30px;
  color:#fff;
  font-weight:bold;
`;

const NickName = styled.a`
  display:block;
  width:100px;
  height:30px;
  line-height:30px;
    &:visited, &:link {
      text-decoration:none;
    }
    &:hover, &:focus{
      text-decoration:underline;
      color:#f00;
    }
`;
export default class NavBar extends Component {
  HandleLogoutClick = () => {
    firebase.auth().signOut();
  }
  handleNickNameClick = e => {
    this.props.onNickNameClick();
  }
  render() {
    return (
      <Wrap>
        <InnerLeft>BBS</InnerLeft>
        <LogoutButton onClick={this.HandleLogoutClick}>로그아웃</LogoutButton>
        <NickName onClick={this.handleNickNameClick}>{this.props.uid}</NickName>
      </Wrap>
    )
  }
}
