import React from 'react';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import { Layout as AntLayout, Menu, message } from 'antd';
import styles from '../home/conpoments/Menu.module.scss';
import { RoutesRender } from '../../router'
import { actions } from './Layout.redux';
import { connect } from 'react-redux';
import UserLogin from '../UserLogin'

const { Header } = AntLayout;
class Layout extends React.Component {

  handelClick = () => {
    const { hiddenExit } = this.props;
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cnodeToken');
    message.success('退出成功');
    hiddenExit();
  };

  render() {
    const token = localStorage.getItem('cnodeToken');
    const { routes, isExitVisible } = this.props;
    return (
      <AntLayout>
        <Header style={{ zIndex: 1, width: '100%' }} className={styles.box}>
          <div className="logo">
            <Link to="/">
              <img
                src="https://static2.cnodejs.org/public/images/cnodejs_light.svg"
                alt=""
                style={{ width: 120, height: 34 }}
              />
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/">首页</Link>
            </Menu.Item>
            {!token && (
              <Menu.Item key="2">
                <Link to="/login">登录</Link>
              </Menu.Item>
            )}
            {token && (
              <Menu.Item key="3">
                <Link to="/User">JIMEI</Link>
                {/*<UserLogin>*/}
                {/*  {() => <Link to="/User">JINMEI</Link>}*/}
                {/*</UserLogin>*/}
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
        <Switch>
          {RoutesRender(routes)}
        </Switch>
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
