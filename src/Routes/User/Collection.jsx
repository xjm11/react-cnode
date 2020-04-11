import React from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Pagination } from 'antd';
import styles from './Collection.module.scss';
import moment from 'moment';
import produce from 'immer';

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
    const { data } = this.props;
    const { dataList, page } = this.state;
    const dataArr = data && !dataList.length && data.slice(0, 5);
    return (
      <div className={styles.container}>
        <List
          itemLayout="horizontal"
          className={styles.topicsList}
          dataSource={dataList.length ? dataList : dataArr}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.author && item.author.avatar_url} />}
                description={``}
                title={
                  <div className={styles.titleDiv}>
                    <span className={item.top ? styles.top : styles.tab}>
                      {item.top ? '置顶' : tabMap[item.tab]}
                    </span>{' '}
                    {/*{item.title}*/}
                    <Link to={`/content/${item.id}`}>{item.title}</Link>
                  </div>
                }
              />
              <div>
                {moment(item.last_reply_at)
                  .startOf('hour')
                  .fromNow()}
              </div>
            </List.Item>
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
