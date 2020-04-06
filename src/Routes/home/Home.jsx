import React from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Pagination, message } from 'antd';

import styles from './Home.module.scss';
import { getHomeData } from '../../services/request';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicList: [],
      page: 1,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { tab },
      },
    } = this.props;
    const { page } = this.state;
    this.getFetchData(tab, page);
  }

  componentDidUpdate(preProps) {
    const {
      match: {
        params: { tab: preTab },
      },
    } = preProps;
    const {
      match: {
        params: { tab },
      },
    } = this.props;
    if (preTab !== tab) {
      const page = 1;
      this.getFetchData(tab, 1);
      this.setState({
        page: page,
      });
    }
  }

  getFetchData(tab, page, limit = 10) {
    const nowTab = tab || 'all';
    const params = {
      mdrender: false,
      page: page,
      limit: limit,
      tab: nowTab,
    };
    getHomeData(params)
      .then(data =>
        this.setState({
          topicList: data,
        }),
      )
      .catch(() => {
        message.error('获取数据失败');
      });
  }

  onChange = (page, limit = 10) => {
    const {
      match: {
        params: { tab },
      },
    } = this.props;
    this.setState({
      page: page,
    });
    this.getFetchData(tab, page, limit);
  };

  render() {
    const { topicList, page } = this.state;
    return (
      <div className={styles.container}>
        <List
          itemLayout="horizontal"
          className={styles.topicsList}
          dataSource={topicList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.author.avatar_url} />}
                title={<Link to={`/content/${item.id}`}>{item.title}</Link>}
                description=""
              />
            </List.Item>
          )}
        />
        <Pagination
          defaultCurrent={1}
          current={page}
          onChange={this.onChange}
          total={100}
          style={{ padding: '10px 0' }}
        />
      </div>
    );
  }
}

export default Home;
