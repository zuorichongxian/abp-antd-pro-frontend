import React from 'react';
import { BarsOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Button, Menu } from 'antd';

const DropOptionButton = ({
  onMenuClick,
  menuOptions = [],
  buttonText,
  buttonStyle,
  dropdownProps,
}) => {
  const menu = menuOptions.map((item) => <Menu.Item key={item.key}>{item.name}</Menu.Item>);
  return (
    <Dropdown overlay={<Menu onClick={onMenuClick}>{menu}</Menu>} {...dropdownProps}>
      <Button style={{ ...buttonStyle }}>
        {buttonText ? buttonText : <BarsOutlined style={{ marginRight: 2 }} />}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropOptionButton;
