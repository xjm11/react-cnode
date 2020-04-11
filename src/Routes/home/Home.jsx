import React from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Pagination, message } from 'antd';

import styles from './Home.module.scss';
import { getHomeData } from '../../services/request';
import moment from 'moment';

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

  onChange = page => {
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
    const { topicList, page } = this.state;
    return (
      <div className={styles.container}>
        <List
          itemLayout="horizontal"
          className={styles.topicsList}
          dataSource={topicList}
          renderItem={item => (
            //   (
            //   <List.Item>
            //     <List.Item.Meta
            //       avatar={<Avatar src={item.author.avatar_url} />}
            //       description={``}
            //       title={
            //         <div className={styles.titleDiv}>
            //           <span
            //             className={styles.count}
            //           >{`${item.reply_count}/${item.visit_count}`}</span>{' '}
            //           <span className={item.top ? styles.top : styles.tab}>
            //             {item.top ? '置顶' : tabMap[item.tab]}
            //           </span>{' '}
            //           <Link to={`/my_content/${item.id}`}>{item.title}</Link>
            //         </div>
            //       }
            //     />
            //     <div>
            //       {moment(item.last_reply_at)
            //         .startOf('hour')
            //         .fromNow()}
            //     </div>
            //   </List.Item>
            // )
            <>
              <div className={styles.summery}>
                <div className={styles.titleDiv}>
                  <Avatar src={item.author.avatar_url} />
                  <span
                    className={styles.count}
                  >{`${item.reply_count}/${item.visit_count}`}</span>{' '}
                  <span className={item.top ? styles.top : styles.tab}>
                    {item.top ? '置顶' : tabMap[item.tab]}
                  </span>{' '}
                  <Link to={`/my_content/${item.id}`}>{item.title}</Link>
                </div>
                <span className={styles.dateDispaly}>
                  {' '}
                  {moment(item.last_reply_at)
                    .startOf('hour')
                    .fromNow()}
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
