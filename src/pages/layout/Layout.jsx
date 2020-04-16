import React from 'react';
import { BrowserRouter as Router, Link, Redirect, Switch } from 'react-router-dom';
import { Layout as AntLayout, Menu, message } from 'antd';
import styles from './Layout.module.scss';
import { RoutesRender } from '../../router';
import { actions } from './Layout.redux';
import { connect } from 'react-redux';
import MySider from './sider/MySider';
import Login from '../login/Login';

const { Header, Footer } = AntLayout;
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirectToLogin: false,
    };
  }

  handelClick = () => {
    const { hiddenExit } = this.props;
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cnodeToken');
    message.success('退出成功');
    hiddenExit();
  };

  render() {
    console.log(this.props);
    const token = localStorage.getItem('cnodeToken');
    const { routes, isExitVisible } = this.props;
    const { isRedirectToLogin } = this.state;
    if(isRedirectToLogin) {
     return  <Redirect to="/Login" />
    }

    return (
      <AntLayout>
        <Header style={{ zIndex: 1, width: '100%' }} className={styles.box}>
          <div className="logo">
            <Link to="/">
              <img
                src="https://static2.cnodejs.org/public/images/cnodejs_light.svg"
                alt=""
                style={{ width: 120 }}
              />
            </Link>
          </div>
          <Menu theme="dark" mode="horizontal" className={styles.menu}>
            <Menu.Item key="1">
              <Link to="/">首页</Link>
            </Menu.Item>
            {!token && (
              <Menu.Item key="2">
                <Link to="/login">登录</Link>
              </Menu.Item>
            )}

            {isExitVisible && token && (
              <Menu.Item key="4">
                {' '}
                <div onClick={this.handelClick}>退出</div>
              </Menu.Item>
            )}
          </Menu>
        </Header>

          <div className={styles.LayCenter}>
            <div className={styles.layContent}>
              <Switch>{RoutesRender(routes)}</Switch>
            </div>
            <div className={styles.laySider}>
              <MySider {...this.props}/>
            </div>
          </div>
        }
        <Footer style={{ textAlign: 'center' }}>Xuu Design ©2020 Created by XuuJ</Footer>
      </AntLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isExitVisible: state.banner.isExitVisible,
  };
};

export default connect(mapStateToProps, actions)(Layout);
