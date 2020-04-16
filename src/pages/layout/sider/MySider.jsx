import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, message } from 'antd';
import styles from '../Layout.module.scss';

class MySider extends React.Component {
  onRedirect = () => {
    console.log(12);
    console.log(this.props);
    this.props.onRedirect(true);
  };

  render() {
    let userInfo = '';
    try {
      userInfo = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));
    } catch (error) {
      message.error('error');
    }
    return (
      <>
        {userInfo ? (
          <div className={styles.section}>
            <div className={styles.title}>个人信息</div>
            <Link to={`/User/${userInfo ? userInfo.loginname : ''}`}>
              <div className={styles.introduction}>
                <Avatar src={userInfo ? userInfo.avatar_url : ''} />{' '}
                {userInfo ? userInfo.loginname : ''}
                <div>积分: {userInfo ? 5 : ''}</div>
                <div>“ 这家伙很懒，什么个性签名都没有留下。 ”</div>
              </div>
            </Link>
          </div>
        ) : (
          <div>
            <div className={styles.section}>
            <div className={styles.title}>CNode：Node.js专业中文社区</div>
            <div className={styles.tip}>
              <div className={styles.btn} onClick={this.onRedirect}>
                请登录
              </div>
            </div>
          </div>
          </div>
        )}
        <div className={styles.section}>
          <div className={styles.title}>无人回复的话题(假链接)</div>
          <div  className={styles.otherTip}>
              <div >
                typeorm 怎么将结果字段进行映射
              </div>
            <div >
                ShowMeBug 项目（程序员面试神器）
              </div>

            <div >
                ShowMeBug 项目（程序员面试神器）
              </div>
            <div >
                ShowMeBug 项目（程序员面试神器）
              </div>
            <div >
              ShowMeBug 项目（程序员面试神器）
            </div>
            <div >
              ShowMeBug 项目（程序员面试神器）
            </div>
            <div >
              ShowMeBug 项目（程序员面试神器）
            </div>
            <div >
              ShowMeBug 项目（程序员面试神器）
            </div>
            <div >
              ShowMeBug 项目（程序员面试神器）
            </div>
            <div >
              ShowMeBug 项目（程序员面试神器）
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>商业合作</div>
          <div className={styles.otherTip}>
            <div >
              typeorm 怎么将结果字段进行映射
            </div>
            <div >
                ShowMeBug 项目（程序员面试神器）
              </div>
            <div>
                ShowMeBug 项目（程序员面试神器）
              </div>
            <div >
              ShowMeBug 项目（程序员面试神器）
            </div>
            <div >
              ShowMeBug 项目（程序员面试神器）
            </div>
            <div >
              ShowMeBug 项目（程序员面试神器）
            </div>
            <div >
              ShowMeBug 项目（程序员面试神器）
            </div>
            <div>
                ShowMeBug 项目（程序员面试神器）
              </div>
          </div>
        </div>
      </>
    );
  }
}

export default MySider;
