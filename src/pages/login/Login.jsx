import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import model from '../layout/Layout.redux';
import { loginWithToken } from '../../services/request';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToIndex: false,
    };
  }

  componentDidMount() {
    // To disable submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    const { visibleExit } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      loginWithToken({ accesstoken: values.token })
        .then((response) => {
          localStorage.setItem('cnodeToken', values.token);
          localStorage.setItem('userInfo', JSON.stringify(response));
          message.success('登录成功');
          this.setState({
            redirectToIndex: true,
          });
          visibleExit();

          const { history } = this.props;
          history.push('/', this.state);
        })
        .catch((error) => {
          message.error('登录失败');
        });
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const usernameError = isFieldTouched('token') && getFieldError('token');
    return (
      <Form
        layout="inline"
        onSubmit={this.handleSubmit}
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '100px',
          'background-color': 'white',
        }}
      >
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('token', {
            rules: [{ required: true, message: 'Please input your token!' }],
          })(
            <Input
              prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入token"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const { isExitVisible } = state[model.namespace].isExitVisible;
  return {
    isExitVisible: isExitVisible,
  };
};

export default connect(mapStateToProps, { ...model.actions })(Form.create()(HorizontalLoginForm));
