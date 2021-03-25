/*
 * @Author: D.Y
 * @Date: 2021-01-22 14:56:30
 * @LastEditTime: 2021-01-22 19:46:20
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/views/comps/x6/components/index.tsx
 * @Description:
 */
import React from 'react'

import X6TableComponent from './x6-table.component'

export const CellMap = {
  table: (graph) => {
    return graph.createNode({
      width: 120,
      height: 127,
      ports: {
        groups: {
          in: {
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
            position: 'left',
          },
          out: {
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
            position: 'right',
          },
        },
        items: [
          {
            id: 'port1',
            group: 'in',
          },
          {
            id: 'port2',
            group: 'in',
          },
          {
            id: 'port3',
            group: 'in',
          },
          {
            id: 'port4',
            group: 'out',
          },
          {
            id: 'port5',
            group: 'out',
          },
          {
            id: 'port6',
            group: 'out',
          },
        ],
      },
      shape: 'react-shape',
      component: <X6TableComponent />,
    })
  },
}
