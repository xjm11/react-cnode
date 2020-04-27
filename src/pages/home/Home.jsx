import React from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Pagination, message, Spin } from 'antd';

import styles from './Home.module.scss';
import { getHomeData } from '../../services/request';
import moment from 'moment';
import { checkUndfind } from '../../utils/checkUndefind';

const tabMap = {
  share: '分享',
  ask: '问答',
  job: '招聘',
};
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicList: [],
      page: 1,
      isSpin: false,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { tab },
      },
    } = this.props;
    const { page } = this.state;
    this.setState({
      isSpin: true,
    });
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
      this.setState({
        isSpin: true,
      });
      this.getFetchData(tab, 1);
      this.setState({
        page: page,
      });
    }
  }

  getFetchData(tab, page, limit = 20) {
    const nowTab = tab || 'all';
    const params = {
      mdrender: false,
      page: page,
      limit: limit,
      tab: nowTab,
    };
    getHomeData(params)
      .then((data) =>
        this.setState({
          topicList: data,
          isSpin: false,
        }),
      )
      .catch(() => {
        message.error('获取数据失败');
      });
  }

  onChange = (page) => {
    const {
      match: {
        params: { tab },
      },
    } = this.props;
    this.setState({
      page: page,
    });
    this.getFetchData(tab, page);
  };

  render() {
    moment.locale('zh-cn');
    const { topicList, page, isSpin } = this.state;
    return isSpin ? (
      <div className={styles.spin}>
        <Spin size="large" />
      </div>
    ) : (
      <div className={styles.container}>
        {' '}
        <List
          itemLayout="horizontal"
          className={styles.topicsList}
          dataSource={topicList}
          renderItem={(item) => (
            <>
              <div className={styles.summery}>
                <div className={styles.titleDiv}>
                  <Link to={`/user/${checkUndfind(item.author.loginname)}`}>
                    <Avatar src={checkUndfind(item.author.avatar_url)} />
                  </Link>
                  <span className={styles.count}>{`${item.reply_count}/${item.visit_count}`}</span>{' '}
                  <span className={item.top ? styles.top : styles.tab}>
                    {item.top ? '置顶' : tabMap[item.tab]}
                  </span>{' '}
                  <Link to={`/my_content/${item.id}`}>{item.title}</Link>
                </div>
                <span className={styles.dateDispaly}>
                  {' '}
                  {moment(item.last_reply_at).startOf('hour').fromNow()}
                </span>
              </div>
            </>
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
