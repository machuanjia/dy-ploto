/*
 * @Author: D.Y
 * @Date: 2021-04-12 13:58:42
 * @LastEditTime: 2021-04-12 14:31:23
 * @LastEditors: D.Y
 * @FilePath: /dy-ploto/src/Editor/components/x6-multi-interface.component.tsx
 * @Description:
 */
import React, { Component } from 'react'

import type { ReactShape } from '@antv/x6-react-shape'
import { FormOutlined,CopyOutlined,CloseOutlined } from '@ant-design/icons'

import styles from './x6-node.module.less'
import { Button } from 'antd'

export default class X6MultiInterfaceComponent extends Component<{ node?: ReactShape }> {
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
          <span className={styles['x6-node-header-title']}>多槽接口单元</span>
          <div className={styles['x6-node-header-actions']}>
            <FormOutlined className={styles['action']}/>
            <CopyOutlined className={styles['action']}/>
          </div>
        </div>
        <div className={styles['x6-node-body']}>
          <div className={styles['x6-node-body-item']}>接口返回数据时</div>
          <div className={styles['x6-node-body-item']}>接口无返回时</div>
          <div className={styles['x6-node-body-item']}>接口异常时</div>
        </div>
      </div>
    )
  }
}
