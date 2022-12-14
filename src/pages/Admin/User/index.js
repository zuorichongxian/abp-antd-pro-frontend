import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { DownOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  Card,
  Col,
  Row,
  Button,
  Divider,
  Table,
  Tag,
  Menu,
  Modal,
  DatePicker,
  Input,
  Select,
  Dropdown,
  Tooltip,
  message,
  InputNumber,
  TreeSelect,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DropOption from '@/components/DropOption';
import styles from './index.less';
import moment from 'moment';

const FormItem = Form.Item;

@Form.create()
@connect(({ loading, user, permission, role }) => ({
  user,
  permission,
  role,
  listLoading: loading.effects['user/getUsers'],
}))
class UserList extends PureComponent {
  state = {
    formValues: {
      Filter: '',
      Permission: '',
      Role: '',
      OnlyLockedUsers: false,
      MaxResultCount: 6,
      SkipCount: 0,
    },
    expandForm: false,
  };

  componentDidMount() {
    this.getUsers();

    const { dispatch } = this.props;
    dispatch({
      type: 'permission/getAllPermissions',
    });

    dispatch({
      type: 'role/getRoles',
      permission: null,
    });
  }

  getUsers() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/getUsers',
      payload: this.state.formValues,
    });
  }

  handleTableChange = (pagination) => {
    const { formValues } = this.state;
    formValues.SkipCount = (pagination.current - 1) * formValues.MaxResultCount;
    this.setState({ formValues: formValues }, this.getAuditLogs());
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { formValues } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      formValues.Permission = fieldsValue.Permission;
      formValues.Filter = fieldsValue.Filter;
      formValues.Role = fieldsValue.Role;
      formValues.MaxResultCount = formValues.MaxResultCount;
      formValues.SkipCount = formValues.SkipCount;
      this.setState({ formValues: formValues }, this.getUsers());
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState(
      {
        formValues: {
          MaxResultCount: 6,
          SkipCount: 0,
        },
      },
      this.getUsers(),
    );
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={16} sm={24}>
            <FormItem label="??????">
              {getFieldDecorator('Filter')(<Input placeholder="?????????" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                ??????
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                ??????
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                ?????? <DownOutlined />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  jsonDataTree(data, parent) {
    var itemArr = [];
    for (var i = 0; i < data.length; i++) {
      var node = data[i];
      if (node.parentName == parent) {
        var newNodes = {
          key: node.name,
          value: node.name,
          title: node.displayName,
          children: this.jsonDataTree(data, node.name),
        };
        itemArr.push(newNodes);
      }
    }
    return itemArr;
  }

  roleDataTree(data, parent) {
    var itemArr = [];
    for (var i = 0; i < data.length; i++) {
      var node = data[i];
      if (node.parentName == parent) {
        var newNodes = {
          key: node.name,
          value: node.id,
          title: node.displayName,
          children: this.roleDataTree(data, node.name),
        };
        itemArr.push(newNodes);
      }
    }
    return itemArr;
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
      permission: { allPermissions },
      role: { data },
    } = this.props;

    const allPermissionsData = this.jsonDataTree(allPermissions, null);
    const roleData = this.roleDataTree(data.items, null);

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <FormItem label="??????">
              {getFieldDecorator('Filter')(<Input placeholder="?????????" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="??????">
              {getFieldDecorator('Permission', { initialValue: this.state.formValues.Permission })(
                <TreeSelect
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={allPermissionsData}
                  placeholder="???????????????"
                  treeDefaultExpandAll
                />,
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="??????">
              {getFieldDecorator('Role', { initialValue: this.state.formValues.Role })(
                <TreeSelect
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={roleData}
                  placeholder="???????????????"
                  treeDefaultExpandAll
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              ??????
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              ??????
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              ?????? <UpOutlined />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  handleMenuClick(record, e) {
    if (e.key === '0') {
      message.info(e.item.props.children);
    } else if (e.key === '1') {
      message.info(e.item.props.children);
    } else if (e.key === '2') {
      message.info(e.item.props.children);
    } else if (e.key === '3') {
      message.info(e.item.props.children);
    } else if (e.key === '4') {
      message.info(e.item.props.children);
    }
    console.log(record);
  }

  render() {
    const columns = [
      { title: '??????', dataIndex: 'name', key: 'name' },
      { title: '?????????', dataIndex: 'userName', key: 'userName' },
      {
        title: '??????',
        dataIndex: 'roles',
        key: 'roles',
        render: (value, row, index) => {
          let roleNames = '';
          for (let j = 0; j < value.length; j++) {
            if (roleNames.length) {
              roleNames = roleNames + ', ';
            }
            roleNames = roleNames + value[j].roleName;
          }
          return roleNames;
        },
      },
      { title: '????????????', dataIndex: 'emailAddress', key: 'emailAddress' },
      {
        title: '??????????????????',
        dataIndex: 'isEmailConfirmed',
        key: 'isEmailConfirmed',
        render: (value, row, index) => {
          if (value) return <Tag color="#2db7f5">???</Tag>;
          else return <Tag color="#f50">???</Tag>;
        },
      },
      {
        title: '??????',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (value, row, index) => {
          if (value) return <Tag color="#2db7f5">???</Tag>;
          else return <Tag color="#f50">???</Tag>;
        },
      },
      {
        title: '??????????????????',
        dataIndex: 'lastLoginTime',
        key: 'lastLoginTime',
        render: (value, row, index) => {
          return moment(value).format('YYYY-MM-D h:mm:ss');
        },
      },
      {
        title: '????????????',
        dataIndex: 'creationTime',
        key: 'creationTime',
        render: (value, row, index) => {
          return moment(value).format('YYYY-MM-D h:mm:ss');
        },
      },
      {
        title: '??????',
        key: 'action',
        render: (value, row, index) => {
          return (
            <DropOption
              onMenuClick={(e) => this.handleMenuClick(row, e)}
              menuOptions={[
                { key: '0', name: `????????????????????????` },
                { key: '1', name: `??????` },
                { key: '2', name: `??????` },
                { key: '3', name: `??????` },
                { key: '4', name: `??????` },
              ]}
            />
          );
        },
      },
    ];

    const {
      listLoading,
      user: { data },
      permission: { allPermissions },
    } = this.props;

    return (
      <PageHeaderWrapper title="????????????">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => this.handleModalVisible(true)}
              >
                ??????{' '}
              </Button>
            </div>
            <Table
              rowKey={(record) => record.id}
              size={'middle'}
              columns={columns}
              pagination={{
                pageSize: 10,
                total: data == undefined ? 0 : data.totalCount,
                defaultCurrent: 1,
              }}
              loading={data == undefined ? true : false}
              dataSource={data == undefined ? [] : data.items}
              onChange={this.handleTableChange}
              loading={listLoading}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserList;
