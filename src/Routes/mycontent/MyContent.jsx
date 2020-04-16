import React from 'react';
import { Typography, Divider } from 'antd';
import { PageHeader, Button, Descriptions, message, Comment, List } from 'antd';
import styles from './MyContent.module.scss';
import { Redirect, Link } from 'react-router-dom';
import { collectTopic, deCollectTopic, getDataById } from '../../services/request';
import moment from 'moment'

const { Paragraph } = Typography;
const baseUrl = ' https://cnodejs.org/api/v1';
class MyContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {},
      isCollect: false,
      redirectToLogin: false,
    };
  }

  componentDidMount() {
    const params = {
      topic: this.props.match.params.id,
      accesstoken: localStorage.getItem('cnodeToken'),
    };
    getDataById(params)
      .then(data => {
        this.setState({
          content: data,
          isCollect: !!data.is_collect,
        });
      })
      .catch(error => {
        console.log(error);
        message.error('操作失败');
      });
  }

  handleClick = topicId => {
    const token = localStorage.getItem('cnodeToken');
    if (!token) {
      this.setState({
        redirectToLogin: true,
      });
      return;
    }

    const { isCollect } = this.state;
    const request = isCollect ? deCollectTopic : collectTopic;
    const params = {
      accesstoken: token,
      topic_id: topicId,
    };
    request(params)
      .then(data => {
        message.success('操作成功');
        this.setState({
          isCollect: !isCollect,
        });
      })
      .catch(error => {
        message.error(error);
      });
  };

  render() {
    const { content, isCollect, redirectToLogin } = this.state;
    console.log(this.props);
    if (redirectToLogin) {
      return <Redirect to="/Login" />;
    }
    const data = content.replies || [];
    return (
      <div className={styles.content}>
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="标题"
          subTitle={content.title}
          extra={[
            <Button key="1" onClick={() => this.handleClick(content.id || 0)}>
              {isCollect ? '取消收藏' : '收藏'}
            </Button>,
          ]}
        >
          <Descriptions size="small" column={4}>
            <Descriptions.Item label="Created">
              {content.author && content.author.loginname}
            </Descriptions.Item>
            <Descriptions.Item label="">
              {content.visit_count}次浏览 来自<a>{content.tab}</a>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">{moment(content.create_at).format('YYYY-MM-DD HH:mm')}</Descriptions.Item>
          </Descriptions>
        </PageHeader>
        <Typography>
          <Paragraph>
            <div
              style={{
                padding: 24,
              }}
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </Paragraph>
        </Typography>
        <Divider />

        <List
          className="comment-list"
          header={`${data.length} 回复`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <li>
              <Comment
                author={<Link to={`/user/${item.author.loginname}`}>{item.author.loginname}</Link>}
                avatar={item.author.avatar_url}
                content=<div dangerouslySetInnerHTML={{ __html: item.content }} />
                datetime={moment(item.create_at).format('YYYY-MM-DD HH:mm')}
              />
            </li>
          )}
        />
      </div>
    );
  }
}

export default MyContent;
