import React from 'react';
import { message } from 'antd';
import { getUserInfo } from '../../services/request';
import Collection from './Collection';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { user },
      },
    } = this.props;

    if (!user) {
      return;
    }
    getUserInfo(user)
      .then(data => {
        this.setState({
          userInfo: data,
        });
      })
      .catch(() => {
        message.error('操作失败');
      });
  }

  render() {
    const { userInfo } = this.state;
    return (
      <div style={{ backgroundColor: 'rgb(0,0,0,0.25)', padding: '0 100px' }}>
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
        <Collection data={userInfo.recent_topics} />
        最近参与的话题
        <Collection data={userInfo.recent_replies} />
      </div>
    );
  }
}

export default User;
