/*
 * @Author: D.Y
 * @Date: 2021-01-22 14:56:30
 * @LastEditTime: 2021-04-12 16:00:45
 * @LastEditors: D.Y
 * @FilePath: /dy-ploto/src/Editor/x6.nodes.ts
 * @Description:
 */
import { Addon, Shape } from '@antv/x6'
import '@antv/x6-react-shape'
import { CellMap, CellTypes } from './components'

const { Stencil } = Addon
export class X6Nodes {
  private graph
  private container
  constructor(ops: { graph; container: string }) {
    this.container = document.getElementById(ops.container)
    this.graph = ops.graph
    this.init()
  }

  init() {
    const stencil = new Stencil({
      title: '节点类型',
      target: this.graph,
      search: true,
      stencilGraphWidth: 260,
      stencilGraphHeight: 500,
      layoutOptions:{
        columns:1,
        dx:70,
        rowHeight:60,
      },
      getDragNode: (node) => {
        const { type,icon, title } = node.data
        // @ts-ignore
        return CellMap[type]['drag']({type,icon, title})
      },
      getDropNode: (node) => {
        const { type } = node.data
        // @ts-ignore
        return CellMap[type]['drop'](this.graph)
      },
    })
    // @ts-ignore
    this.container.appendChild(stencil.container)
    const nodes:any = []
    CellTypes.map((n)=>{
      // @ts-ignore
      nodes.push(CellMap[n.type]['normal'](n))
    })
    stencil.load(nodes)
  }
}
