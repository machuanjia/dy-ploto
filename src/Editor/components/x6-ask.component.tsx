/*
 * @Author: D.Y
 * @Date: 2021-04-12 13:58:42
 * @LastEditTime: 2021-04-12 15:55:08
 * @LastEditors: D.Y
 * @FilePath: /dy-ploto/src/Editor/components/x6-ask.component.tsx
 * @Description:
 */
import React, { Component } from 'react'

import type { ReactShape } from '@antv/x6-react-shape'
import { FormOutlined,CopyOutlined,CloseOutlined } from '@ant-design/icons'

import styles from './x6-node.module.less'
import { Button } from 'antd'

export default class X6AskComponent extends Component<{ node?: ReactShape }> {
  shouldComponentUpdate() {
    const { node } = this.props
    if (node) {
      if (node.hasChanged('data')) {
        return true
      }
    }
    return false
  }

  render() {
    return (
      <div className={styles['x6-node']}>
        <div className={styles['x6-node-header']}>
          <span className={styles['x6-node-header-title']}>询问填槽单元</span>
          <div className={styles['x6-node-header-actions']}>
            <FormOutlined className={styles['action']}/>
            <CopyOutlined className={styles['action']}/>
          </div>
        </div>
        <div className={styles['x6-node-body']}>
          <div className={styles['x6-node-body-desc']}>暂无对话消息，点击单元添加</div>
        </div>
        <div className={styles['x6-node-footer']}>
          <Button block type="dashed">新增跳转条件</Button>
        </div>
      </div>
    )
  }
}
