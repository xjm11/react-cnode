import React from 'react';
import { Layout as AntLayout } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Switch } from 'react-router';
import styles from './Menu.module.scss';
import { RoutesRender } from '../../../router'

const { Content, Footer } = AntLayout;
const layoutMenuOptions = [
  { path: 'all', name: '全部' },
  { path: 'good', name: '精华' },
  { path: 'ask', name: '提问' },
  { path: 'job', name: '招聘' },
  { path: 'share', name: '分享' },
];
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      location: { pathname },
      routes,
    } = this.props;
    return (
      <AntLayout>
        <Content className={styles.between}>
          <ul className={styles.menu}>
            {layoutMenuOptions.map(item => {
              return (
                <li key={item.path} className={pathname === `/topics/${item.path}`
                  ? styles.selected : styles.nonselected}>
                  <Link to={`/topics/${item.path}`}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
          <Switch>
            {RoutesRender(routes)}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </AntLayout>
    );
  }
}

export default Menu;
