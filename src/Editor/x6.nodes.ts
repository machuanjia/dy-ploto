/*
 * @Author: D.Y
 * @Date: 2021-01-22 14:56:30
 * @LastEditTime: 2021-01-22 19:48:56
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/views/comps/x6/x6.nodes.ts
 * @Description:
 */
import { Addon, Shape } from '@antv/x6'
import '@antv/x6-react-shape'

import { CellMap } from './components'

const { Stencil } = Addon
const { Rect, Circle } = Shape

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
      title: 'Components',
      target: this.graph,
      search: true,
      collapsable: true,
      stencilGraphWidth: 260,
      stencilGraphHeight: 300,
      groups: [
        {
          name: 'group1',
          title: 'Group(Collapsable)',
        },
        {
          name: 'group2',
          title: 'Group',
          collapsable: false,
        },
      ],
      // @ts-ignore
      getDragNode: (node) => {
        const { type } = node.data
        return CellMap[type](this.graph)
      },
    })
    this.container.appendChild(stencil.container)

    const r = new Rect({
      width: 70,
      height: 40,
      data: {
        type: 'table',
      },
      attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'Table', fill: 'white' },
      },
    })

    const c = new Circle({
      width: 60,
      height: 60,
      data: {
        type: 'table',
      },
      attrs: {
        circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
        text: { text: 'Ellipse', fill: 'white' },
      },
    })
    stencil.load([r], 'group1')
    stencil.load([c], 'group2')
  }
}
