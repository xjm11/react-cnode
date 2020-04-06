import React from 'react';
import { message } from 'antd'
import { get } from '../services/httpRequst';
import { getUserInfo } from '../services/request'


class User extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      return;
    }

    getUserInfo()
      .then((data) => {
        console.log('usr', data);
        this.setState({
          userInfo: data,
        });
      })
      .catch(() =>{
        message.error('操作失败');
    });
  }

  render() {
    const { userInfo } = this.state;
    return (
      <div style={{ backgroundColor: 'rgb(0,0,0,0.25)', paddingLeft: '10px' }}>
        <div>
          <h3>个人信息</h3>
          <img
            src={userInfo.avatar_url}
            alt=""
            style={{ width: '48px', height: '48px', verticalAlign: 'middle' }}
          />
          <span style={{ verticalAlign: 'middle' }}>{userInfo.loginname}</span>
        </div>
        <br />
        收藏的主题
        {userInfo.recent_replies &&
          userInfo.recent_replies.map(item => {
            return <div>123</div>;
          })}
        <br />
        我的回答
        {userInfo.recent_replies &&
          userInfo.recent_replies.map(item => {
            return <div>123</div>;
          })}
      </div>
    );
  }
}

export default User;
