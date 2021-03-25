import { Graph } from '@antv/x6'

import { SimpleNodeView } from './x6.map'

export class X6Editor {
  private graph
  private options: any = {
    container: null,
    width: 800,
    height: 600,
    grid: true, // 网格
    background: false, // 背景
    clipboard: true, // 剪切板
    history: true, // 撤销、重做
    selecting: {
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
    }, // 点选、框选
    snapline: true, // 对齐线
    scroller: true, // 滚动
    resizing: {
      // 节点缩放
      enabled: true,
    },
    rotating: {
      // 节点旋转
      enabled: true,
    },
    connecting: {
      // 是否连线
      snap: true,
      allowBlank: true,
      allowMulti: true,
      allowLoop: true,
      allowNode: true,
      allowEdge: true,
      allowPort: true,
      router: 'manhattan',
    },
  }

  constructor(ops: { container: string; miniMap: string }) {
    this.options = { ...this.options, ...ops }
    const container = document.getElementById(this.options.container)
    if (this.options.miniMap) {
      const miniMap = document.getElementById(this.options.miniMap)
      this.options.minimap = {
        enabled: true,
        container: miniMap,
        width: 150,
        height: 150,
        padding: 10,
        graphOptions: {
          async: true,
          getCellView(cell) {
            if (cell.isNode()) {
              return SimpleNodeView
            }
            return null
          },
          // createCellView(cell) {
          //   if (cell.isEdge()) {
          //     return null;
          //   }
          //   return null;
          // },
        },
      }
      delete this.options.miniMap
    }
    this.options.container = container
    this.options.width = container.clientWidth
    this.options.height = container.clientHeight
    this.init()
  }

  init() {
    this.graph = new Graph(this.options)
    this.setTools()
  }

  setTools() {
    this.graph.on('cell:mouseenter', ({ cell }) => {
      if (cell.isNode()) {
        cell.addTools([
          {
            name: 'boundary',
            args: {
              attrs: {
                fill: '#7c68fc',
                stroke: '#333',
                'stroke-width': 1,
                'fill-opacity': 0.2,
              },
            },
          },
          {
            name: 'button-remove',
            args: {
              x: 0,
              y: 0,
              offset: { x: 10, y: 10 },
            },
          },
        ])
      } else {
        cell.addTools(['vertices', 'segments'])
      }
    })
    this.graph.on('cell:mouseleave', ({ cell }) => {
      cell.removeTools()
    })
  }

  loadData(data) {
    this.graph.fromJSON(data)
  }
  getData() {
    return this.graph.toJSON()
  }

  zoomIn() {
    this.graph.zoomTo(this.graph.zoom() + 0.1)
  }

  zoomOut() {
    this.graph.zoomTo(this.graph.zoom() - 0.1)
  }

  undo() {
    this.graph.history.undo()
  }

  redo() {
    this.graph.history.redo()
  }
}
