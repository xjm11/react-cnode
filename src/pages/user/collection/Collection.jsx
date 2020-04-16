import React from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Pagination } from 'antd';
import styles from './Collection.module.scss';
import moment from 'moment';

const tabMap = {
  share: '分享',
  ask: '问答',
};

class Collection extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    console.log('data', data);
    this.state = {
      dataList: [],
      page: 1,
    };
  }

  onChange = (page, limit = 5) => {
    const { data } = this.props;
    this.setState({
      dataList: data.slice((page - 1) * limit, page * limit),
      page: page,
    });
  };

  render() {
    moment.locale('zh-cn');
    const { data } = this.props;
    const { dataList, page } = this.state;
    const dataArr = data && !dataList.length && data.slice(0, 5);
    console.log(dataArr);
    if (dataList && dataList.length === 0 && dataArr && dataArr.length === 0) {
      return <p>暂时没有数据</p>;
    }
    return (
      <div className={styles.container}>
        <List
          itemLayout="horizontal"
          className={styles.topicsList}
          dataSource={dataList.length ? dataList : dataArr}
          renderItem={item => (
            <>
              <div className={styles.summery}  >
                <div className={styles.titleDiv}>
                  <Avatar src={item.author.avatar_url} />
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
          total={data && data.length}
          style={{ padding: '10px 0' }}
          defaultPageSize={5}
        />
      </div>
    );
  }
}

export default Collection;
