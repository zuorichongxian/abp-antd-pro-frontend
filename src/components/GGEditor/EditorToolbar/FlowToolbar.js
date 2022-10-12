import React from 'react';

import {
  CopyOutlined,
  DeleteOutlined,
  DragOutlined,
  FileTextOutlined,
  InstagramOutlined,
  RedoOutlined,
  SelectOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  UndoOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';

import { Tooltip, Divider } from 'antd';
import { Toolbar, Command } from 'gg-editor';
import styles from './index.less';

class FlowToolbar extends React.Component {
  render() {
    const fontSize = '20px';
    return (
      <Toolbar className={styles.toolbar}>
        <Command name="undo">
          <Tooltip title="撤销" placement="bottom" overlayClassName={styles.tooltip}>
            <UndoOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Command name="redo">
          <Tooltip title="重做" placement="bottom" overlayClassName={styles.tooltip}>
            <RedoOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Divider type="vertical" />
        <Command name="copy">
          <Tooltip title="复制" placement="bottom" overlayClassName={styles.tooltip}>
            <CopyOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Command name="paste">
          <Tooltip title="粘贴" placement="bottom" overlayClassName={styles.tooltip}>
            <FileTextOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Command name="delete">
          <Tooltip title="删除" placement="bottom" overlayClassName={styles.tooltip}>
            <DeleteOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Divider type="vertical" />
        <Command name="zoomIn">
          <Tooltip title="放大" placement="bottom" overlayClassName={styles.tooltip}>
            <ZoomInOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Command name="zoomOut">
          <Tooltip title="缩小" placement="bottom" overlayClassName={styles.tooltip}>
            <ZoomOutOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Command name="autoZoom">
          <Tooltip title="适应画布" placement="bottom" overlayClassName={styles.tooltip}>
            <InstagramOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Command name="resetZoom">
          <Tooltip title="实际尺寸" placement="bottom" overlayClassName={styles.tooltip}>
            <DragOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Divider type="vertical" />
        <Command name="toBack">
          <Tooltip title="层级后置" placement="bottom" overlayClassName={styles.tooltip}>
            <StepBackwardOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Command name="toFront">
          <Tooltip title="层级前置" placement="bottom" overlayClassName={styles.tooltip}>
            <StepForwardOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Divider type="vertical" />
        <Command name="multiSelect">
          <Tooltip title="多选" placement="bottom" overlayClassName={styles.tooltip}>
            <SelectOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Command name="addGroup">
          <Tooltip title="成组" placement="bottom" overlayClassName={styles.tooltip}>
            <UsergroupAddOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
        <Command name="unGroup">
          <Tooltip title="解组" placement="bottom" overlayClassName={styles.tooltip}>
            <UsergroupDeleteOutlined style={{ fontSize: fontSize }} />
          </Tooltip>
        </Command>
      </Toolbar>
    );
  }
}

export default FlowToolbar;
