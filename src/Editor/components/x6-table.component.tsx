/*
 * @Author: D.Y
 * @Date: 2021-01-22 14:56:30
 * @LastEditTime: 2021-01-22 19:46:38
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/views/comps/x6/components/x6-table.component.tsx
 * @Description:
 */
import React, { Component } from 'react'

import type { ReactShape } from '@antv/x6-react-shape'

import styles from './x6-table.module.less'

export default class X6TableComponent extends Component<{ node?: ReactShape }> {
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
      <div className={styles['x6-table']}>
        <div className={styles['x6-table-item']}>test1</div>
        <div className={styles['x6-table-item']}>test2</div>
        <div className={styles['x6-table-item']}>test3</div>
      </div>
    )
  }
}
