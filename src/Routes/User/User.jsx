import React from 'react';
import { message } from 'antd';
import { getUserInfo } from '../../services/request';
import Collection from './collection/Collection';
import styles from './User.module.scss';

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
      <div style={{ backgroundColor: 'white', padding: '0 16px' }}>
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
        <span className={styles.subTitle}>收藏的主题</span>
        <Collection data={userInfo.recent_topics} />
        <span className={styles.subTitle}>最近参与的话题</span>
        <Collection data={userInfo.recent_replies} />
      </div>
    );
  }
}

export default User;
