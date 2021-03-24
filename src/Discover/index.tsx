/*
 * @Author: D.Y
 * @Date: 2021-03-24 11:48:59
 * @LastEditTime: 2021-03-24 19:16:42
 * @LastEditors: D.Y
 * @FilePath: /dy-ploto/src/Discover/index.tsx
 * @Description:
 */
import React,{ Component, Fragment } from "react";
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  PicCenterOutlined,
  FileImageOutlined,
  FilePdfOutlined,
} from '@ant-design/icons'
import { Button, Select, Slider } from "antd";
import { filter,map,isUndefined } from 'lodash'
import { CytoscapeGenerator } from './service'
import styles from './index.module.less'
// import { data } from './data'
import 'tippy.js/dist/tippy.css'
import 'cytoscape-context-menus/cytoscape-context-menus.css'
import 'cytoscape-navigator/cytoscape.js-navigator.css'

type IProdCytoscapeProps = {
  data:unknown[]
}
type IProdCytoscapeState = {
  nodeDetailVisible: boolean
  edgeDetailVisible: boolean
}
const { Option } = Select;
export default class DYDiscover extends Component<IProdCytoscapeProps,IProdCytoscapeState>{
  private cg:any
  private data

  constructor(props:any) {
    super(props)
    this.state = {
      nodeDetailVisible: false,
      edgeDetailVisible: false,
    }
    this.data = JSON.parse(props.data)
  }

  componentDidMount() {
    this.cg = new CytoscapeGenerator('cy',{
      elements:this.data,
      layout: {name: 'circle'},
    })
  }

  componentWillUnmount() {
    this.cg && this.cg.destroy()
  }

  // nodeTap(evt:any) {
  //   console.log('nodeTap')
  // }

  // edgeTap(edge:any) {
  //   console.log('edgeTap')
  // }

  // onAfterChange(value:any) {
  //   console.log(value)
  //   const rs = filter(this.data, (n:any) => {
  //     return n.data.value && n.data.value > 1000
  //   })
  //   const rsIds = map(rs, (n:any) => {
  //     return n.data.id
  //   })
  //   const datas = filter(this.data, (n:any) => {
  //     // node
  //     if (!isUndefined(n.data.value)) {
  //       return n.data.value <= 1000
  //     }
  //     // edge
  //     if (isUndefined(n.data.value)) {
  //       return !rsIds.includes(n.data.source) && !rsIds.includes(n.data.target)
  //     }
  //     return false
  //   })
  //   this.cg.loadData({
  //     datas,
  //     layoutType: CytoscapeGenerator.LAYOUT_DAGRE_LR,
  //     retain: false,
  //   })
  // }

  zoomIn() {
    this.cg.zoomIn()
  }

  zoomOut() {
    this.cg.zoomOut()
  }

  center() {
    this.cg.center()
  }

  exportImg() {
    this.cg.exportPNG('流程挖掘')
  }
  exportPdf() {
    this.cg.exportPDF('流程挖掘')
  }

  handleLayout(value:string) {
    this.cg.layout(value)
  }

  render(){
    return (
      <section className={styles['cytoscape-wrap']}>
        <div className={styles['cytoscape-header']}>
            <div className={styles['cytoscape-actions-buttons']}>
              <ZoomInOutlined className="cytoscape-actions-btn" onClick={()=>{this.zoomIn()}} />
              <ZoomOutOutlined className="cytoscape-actions-btn" onClick={()=>{this.zoomOut()}} />
              <PicCenterOutlined className="cytoscape-actions-btn" onClick={()=>{this.center()}} />
              <FileImageOutlined className="cytoscape-actions-btn" onClick={()=>{this.exportImg()}} />
              <FilePdfOutlined className="cytoscape-actions-btn" onClick={()=>{this.exportPdf()}} />
            </div>
            <div className={styles['cytoscape-actions-slider']}>
              <Slider defaultValue={30}/>
            </div>

            <div className={styles['cytoscape-layout']}>
              <Select defaultValue="circle" style={{ width: 120 }} onChange={(type)=>{this.handleLayout(type)}}>
                <Option value="circle">Circle</Option>
                <Option value="concentric">Concentric</Option>
                <Option value="dagre_lr">Dager_LR</Option>
                <Option value="dagre_tb">Dager_TB</Option>
                <Option value="avsdf">Avsdf</Option>
                <Option value="grid">Grid</Option>
              </Select>
            </div>
        </div>
        <div id="cy" className={styles['cytoscape-body']}></div>
      </section>
    )
  }
}
