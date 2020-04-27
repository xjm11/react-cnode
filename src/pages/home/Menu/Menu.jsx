import React from 'react';
import { Layout as AntLayout } from 'antd';
import { Link, Switch } from 'react-router-dom';
import styles from './Menu.module.scss';
import { RoutesRender } from '../../../router';
import classNames from 'classnames';

const { Content } = AntLayout;
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
            {layoutMenuOptions.map((item) => {
              const isSelect = pathname === `/topics/${item.path}`;
              const liClass = classNames({
                selected: isSelect,
                nonselected: !isSelect,
              });
              return (
                <li key={item.path} className={styles[liClass]}>
                  <Link to={`/topics/${item.path}`}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
          <Switch>{RoutesRender(routes)}</Switch>
        </Content>
      </AntLayout>
    );
  }
}

export default Menu;
