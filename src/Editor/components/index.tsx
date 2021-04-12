/*
 * @Author: D.Y
 * @Date: 2021-01-22 14:56:30
 * @LastEditTime: 2021-04-12 16:02:20
 * @LastEditors: D.Y
 * @FilePath: /dy-ploto/src/Editor/components/index.tsx
 * @Description:
 */
import React from 'react'
import { Addon, Shape } from '@antv/x6'
import X6AskComponent from './x6-ask.component'
import X6MultiInterfaceComponent from './x6-multi-interface.component'

const { HTML } = Shape

const portNormalLayout = {
  in: {
    attrs: {
      circle: {
        r: 6,
        magnet: true,
        stroke: '#31d0c6',
        strokeWidth: 2,
        fill: '#31d0c6',
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
}

const portAbsoluteLayout = {
  in: {
    attrs: {
      circle: {
        r: 6,
        magnet: true,
        stroke: '#31d0c6',
        strokeWidth: 2,
        fill: '#31d0c6',
      },
    },
    position: 'left',
  },
  out: {
    attrs: {
      top:100,
      circle: {
        r: 6,
        magnet: true,
        stroke: '#31d0c6',
        strokeWidth: 2,
        fill: '#fff',
      },
    },
    position: {
      name: 'line',
      args: {
        start: { x: 256, y: 60 },
        end: { x: 256, y: 135 },
      }
    },
  },
}

export const CellTypes = [{
  icon:'',
  type:'ask',
  title:'询问填槽单元',
},{
  icon:'',
  type:'multiInterface',
  title:'多槽接口单元'
}]

const getNodeNormalWrap = (icon:string,title:string) => {
  const wrap = document.createElement('div')
  wrap.style.width = '100%'
  wrap.style.height = '100%'
  wrap.style.background = '#fff'
  wrap.style.display = 'flex'
  wrap.style.borderBottom='1px #eceef0 solid'
  wrap.style.justifyContent = 'center'
  wrap.style.alignItems = 'center'
  wrap.innerHTML = `<i class=${icon}><i><span style="font-weight:bold;font-size:16px">${title}</span>`
  return wrap
}
const getNodeDragWrap = (icon:string,title:string) => {
  const wrap = document.createElement('div')
  wrap.style.width = '100%'
  wrap.style.height = '100%'
  wrap.style.background = '#89d1e2'
  wrap.style.display = 'flex'
  wrap.style.borderBottom='1px #eceef0 solid'
  wrap.style.justifyContent = 'center'
  wrap.style.alignItems = 'center'
  wrap.innerHTML = `<i class=${icon}><i><span style="font-weight:bold;font-size:16px">${title}</span>`
  return wrap
}
export const CellMap = {
  ask:{
    normal:(node:any)=>{
      return new HTML({
        width: 260,
        height: 60,
        data: {
          ...node
        },
        html(){
          return getNodeNormalWrap(node.icon,node.title)
        }
      })
    },
    drag:(node:any)=>{
      return new HTML({
        width: 260,
        height: 60,
        data: {
         ...node
        },
        html(){
          return getNodeDragWrap(node.icon,node.title)
        }
      })
    },
    drop:(graph:any)=>{
      return graph.createNode({
        width: 256,
        height: 150,
        shape: 'react-shape',
        component: <X6AskComponent />,
        ports: {
          groups: portNormalLayout,
          items: [
            {
              id: 'port1',
              group: 'in',
            },
            {
              id: 'port2',
              group: 'out',
            }
          ],
        },
      })
    }
  },
  multiInterface:{
    normal:()=>{
      return new HTML({
        width: 260,
        height: 60,
        data: {
          type: 'multiInterface',
        },
        html(){
          return getNodeNormalWrap('','多槽接口单元')
        }
      })
    },
    drag:(graph:any)=>{
      return new HTML({
        width: 260,
        height: 60,
        data: {
          type: 'multiInterface',
        },
        html(){
          return getNodeDragWrap('','多槽接口单元')
        }
      })
    },
    drop:(graph:any)=>{
      return graph.createNode({
        width: 256,
        height: 170,
        shape: 'react-shape',
        component: <X6MultiInterfaceComponent />,
        ports: {
          groups: portAbsoluteLayout,
          items: [
            {
              id: 'port1',
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
      })
    },
  }
}
