import React from 'react';
import { withPropsAPI } from 'gg-editor';
import { SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';

class FlowSave extends React.Component {
  handleClick = () => {
    const { propsAPI } = this.props;
    console.log(propsAPI.save());
  };

  render() {
    return (
      <Button type="primary" size="small" icon={<SaveOutlined />} onClick={this.handleClick}>
        保存
      </Button>
    );
  }
}

export default withPropsAPI(FlowSave);
