import React, {Component} from 'react';
import styled from 'styled-components';
import {Table} from 'semantic-ui-react';
import NavBar from './NavBar';
import * as moment from 'moment';
//import * as firebase from 'firebase';

// const mockData = [
//   {
//     articleId: '-LB1', //push했을 때 자동생성되는 식별자
//     author: '신혜진',
//     title: '게시글 제목',
//     createdAt: '2018-01-20'
//   },
//   {
//     articleId: '-LB2',
//     author: '신혜진',
//     title: '게시글 제목2',
//     createdAt: '2018-01-20'
//   }
// ];
const ArticleItemRow = styled(Table.Row)`
  &:hover {
    background:#daa357;
    cursor:pointer;
    color:#fff;
  }
`;
export default class ArticleListScreen extends Component {
  render() {
    const {
      nickName,
      onNickNameClick,
      articleArr,
      onArticleClick
    } = this.props; //분해대입
    return (
      <div>
        <NavBar nickName={nickName} onNickNameClick={onNickNameClick}/>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell>작성일</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              Array.isArray(articleArr) && articleArr.length > 0
                ? articleArr.map(({articleId, title, author, createdAt}) => (
                  <ArticleItemRow key={articleId} onClick={e => onArticleClick(articleId)}>
                    <Table.Cell>{author}</Table.Cell>
                    <Table.Cell>{title}</Table.Cell>
                    <Table.Cell>{moment(createdAt).locale('ko').fromNow()}</Table.Cell>
                  </ArticleItemRow>
                ))
                : '게시글이 없습니다.'
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}
