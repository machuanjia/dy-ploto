/*
 * @Author: D.Y
 * @Date: 2021-03-25 09:38:10
 * @LastEditTime: 2021-04-12 16:14:48
 * @LastEditors: D.Y
 * @FilePath: /dy-ploto/src/Editor/index.tsx
 * @Description:
 */

import React,{ Component } from "react";
import X6ToolbarComponent from './x6.toolbar'
import styles from './index.module.less';
import '@antv/x6-react-components/es/menu/style/index.css'
import '@antv/x6-react-components/es/toolbar/style/index.css'
import '@antv/x6-react-shape'

import { X6Editor } from './x6.editor'
import { X6Nodes } from './x6.nodes'

export default class DYEditor extends Component{
  private xe:any
  private xt:any
  constructor(props:any) {
    super(props)
    this.state = {
      xe: null,
    }
  }
  componentDidMount() {
    this.xe = new X6Editor({
      container: 'xe',
      miniMap: 'mm',
    })
    this.xt = new X6Nodes({
      graph: this.xe.graph,
      container: 'nodes',
    })
    this.setState({
      xe: this.xe,
    })
  }
  render(){
    const { xe } = this.state
    return (
      <div className={styles['x6-editor']}>
      <div className={styles['x6-editor-header']}>
        <X6ToolbarComponent xe={xe}/>
      </div>
      <div className={styles['x6-editor-body']}>
        <div id="nodes" className={styles['x6-editor-body-tools']}></div>
        <div id="xe" className={styles['x6-editor-body-content']}></div>
        <div id="mm" className={styles['x6-editor-body-minimap']}></div>
      </div>
    </div>
    )
  }
}
