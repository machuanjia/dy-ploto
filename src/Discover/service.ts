/*
 * @Author: D.Y
 * @Date: 2021-03-24 14:02:32
 * @LastEditTime: 2021-03-24 19:59:29
 * @LastEditors: D.Y
 * @FilePath: /dy-ploto/src/Discover/service.ts
 * @Description:
 */
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'
import cola from 'cytoscape-cola'
import avsdf from 'cytoscape-avsdf'
import tippy from 'tippy.js'
import { jsPDF } from 'jspdf'
import edgeBendEditing from 'cytoscape-edge-bend-editing'
import popper from 'cytoscape-popper'
import contextMenus from 'cytoscape-context-menus'
import { isString } from 'lodash'

cytoscape.use( avsdf );
cytoscape.use(cola)
cytoscape.use(dagre)
cytoscape.use(popper)
cytoscape.use(contextMenus)
edgeBendEditing(cytoscape)

type CytoscapeOption = {
  maxZoom?: any,
  minZoom?: any,
  panningEnabled?: boolean,
  userPanningEnabled?: boolean,
  userZoomingEnabled?: boolean,
  wheelSensitivity?: number,
  zoom?: number,
  zoomingEnabled?: boolean,
  elements?:unknown[]
  layout?:unknown
}

export class CytoscapeGenerator {
  private cy:any
  private container
  private NAME_PROP = 'oriname'
  private MAX_AUTOFIT_ZOOM = 1
  private actions = {}
  private options:CytoscapeOption = {
    maxZoom: 1e50,
    minZoom: 1e-50,
    panningEnabled: true,
    userPanningEnabled: true,
    userZoomingEnabled: true,
    wheelSensitivity: 0.1,
    zoom: 1,
    zoomingEnabled: true,
  }

  private style = [
    {
      selector: 'node',
      style: {
        'background-color': 'data(color)',
        'border-color': 'black',
        'border-width': 'data(borderwidth)',
        color: 'data(textcolor)',
        content: 'data(name)',
        'font-size': 'data(textsize)',
        height: 'data(height)',
        padding: 0,
        shape: 'data(shape)',
        'text-border-width': 0,
        'text-max-width': 'data(textwidth)',
        'text-valign': 'center',
        'text-wrap': 'wrap',
        width: 'data(width)',
      },
    },
    {
      selector: 'edge',
      style: {
        color: 'data(color)',
        'control-point-step-size': 20,
        'curve-style': 'bezier',
        'edge-text-rotation': 0,
        'font-size': 10,
        label: 'data(label)',
        'line-color': 'data(color)',
        'line-style': 'data(style)',
        'loop-direction': -41,
        'loop-sweep': 181,
        opacity: 1,
        'source-arrow-color': 'data(color)',
        'target-arrow-color': 'data(color)',
        'target-arrow-shape': 'triangle',
        'arrow-scale': 4,
        'text-background-color': '#ffffff',
        'text-background-opacity': 0,
        'text-background-padding': 5,
        'text-background-shape': 'roundrectangle',
        'text-margin-y': -16,
        'text-wrap': 'wrap',
        width: 'mapData(strength, 0, 100, 1, 6)',
      },
    },
    {
      selector: 'edge:selected',
      style: {
        'border-color': '#ffa500',
        'border-width': '2px',
        width: 10,
        color: '#ffa500',
        'line-color': '#ffa500',
        'line-style': 'solid',
        'target-arrow-color': '#ffa500',
      },
    },
    {
      selector: 'node:selected',
      style: {
        'border-color': '#ffa500',
        'border-width': '2px',
        'background-color': '#ffa500',
        'line-color': '#ffa500',
        'line-style': 'solid',
        'target-arrow-color': '#ffa500',
      },
    },
  ]

  private layouters = {
    'circle': ()=>{
      this.cy
      .elements()
      .layout({
        name: 'circle',
      })
      .run()
    },
    'concentric':()=>{
      this.cy
      .elements()
      .layout({
        name: 'concentric',
        concentric: ( node:any )=>{
          return node.degree();
        },
        levelWidth: function( nodes:any ){
          return 2;
        }
      })
      .run()
    },
    'dagre_lr': () => {
      this.cy
        .elements()
        .layout({
          avoidOverlap: !0,
          edgeSep: 50,
          name: 'dagre',
          nodeSep: 110,
          randomize: false,
          rankDir: 'LR',
          ranker: 'network-simplex',
        })
        .run()
    },
    'dagre_tb': (randomize:any) => {
      this.cy
        .style()
        .selector('edge')
        .style({
          'text-background-opacity': 1,
          'text-margin-y': 0,
        })
        .update()

      this.cy
        .elements()
        .layout({
          avoidOverlap: !0,
          edgeSep: 50,
          name: 'dagre',
          nodeSep: 110,
          randomize,
          rankDir: 'TB',
          ranker: 'tight-tree',
        })
        .run()
    },
    'avsdf':()=>{
      this.cy
        .elements()
        .layout({
          name: 'avsdf',
					nodeSeparation: 120
        })
        .run()
    },
    'grid': () => {
      this.cy
        .elements()
        .layout({
          name: 'grid',
        })
        .run()
    },
  }

  private currentLayout = 0
  private isCtrlPressed = false
  private isAltPressed = false
  private currentNodeTooltip:any
  private currentZoomLevel = 1
  private currentPanPosition:any
  private isTraceMode = false
  private removed:any

  constructor(containerId:string, options:CytoscapeOption, actions={}) {
    this.container = document.getElementById(containerId)
    this.options = Object.assign(this.options, {
      container: this.container,
      style: this.style,
    },options)
    this.init()
  }

  init() {
    this.cy = cytoscape(this.options as any)
    this.cy.fit()
    this.bindActions()
  }

  loadData({data = [], layoutType='circle'}) {
    const zoom = this.currentZoomLevel
    const pan = this.currentPanPosition

    this.isTraceMode = false
    this.destroy()
    this.init()
    this.cy.add(data)
    this.layout(layoutType)

  }

  bindActions(){
    // @ts-ignore
    const { edgeTap,nodeTap,cxtEdge, cxtNode} = this.actions
    // 边框点击
    this.cy.on('tap', 'edge', (source:any) => {
      edgeTap && edgeTap(source)
    })
    // 节点点击
    this.cy.on('tap', 'node', (source:any) => {
      nodeTap && nodeTap(source)
    })
    // 边框右键
    this.cy.on('cxttap', 'edge', (source:any) => {
      if (!this.isTraceMode) {
        cxtEdge && cxtEdge(source)
      }
    })
    // 节点右键
    this.cy.on('cxttap', 'node', (source:any) => {
      console.log(source)
      if (!this.isTraceMode) {
        cxtNode && cxtNode(source)
      }
    })
    // 平移动
    this.cy.on('pan', (event:any) => {
      console.log(event)
      if (!this.isTraceMode) {
        this.currentPanPosition = this.cy.pan()
      }
    })
    // 缩放
    this.cy.on('zoom', (event:any) => {
      if (!this.isTraceMode) {
        this.currentZoomLevel = this.cy.zoom()
      }
    })

    // 选中
    this.cy.on('select', (evt:any) => {
      const ele = evt.target
      const elements = this.cy.$('#728105')
      elements.style({
        'border-color': '#ffa500',
        'border-width': '2px',
        'background-color': '#ffa500',
        'line-color': '#ffa500',
        'line-style': 'solid',
        'target-arrow-color': '#ffa500',
      })
    })
  }

  destroy() {
    this.cy.destroy()
  }

  layout(layoutType:string) {
    // @ts-ignore
    this.layouters[layoutType] && this.layouters[layoutType]()
  }

  fit() {
    this.cy.fit()
    if (this.cy.zoom() > this.MAX_AUTOFIT_ZOOM) {
      this.cy.zoom(this.MAX_AUTOFIT_ZOOM)
      this.cy.center()
    }
  }

  zoomIn() {
    this.cy.zoom(this.cy.zoom() + 0.1)
    this.cy.center()
  }

  zoomOut() {
    this.cy.zoom(this.cy.zoom() - 0.1)
    this.cy.center()
  }

  center(layoutType:any) {
    console.log(layoutType)
    this.fit()
  }

  resize() {
    this.cy.resize()
    this.fit()
  }

  private SIGN_HEIGHT = 100
  private MARGIN = 100

  loadImage(src:any) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.addEventListener('load', () => resolve(img))
      img.addEventListener('error', (err) => reject(err))
      img.src = src
    })
  }

  rasterizeForPrint() {
    return Promise.all([
      this.loadImage(
        `data:image/png;base64,${this.cy.png({
          full: true,
          output: 'base64',
          scale: 1.0,
          quality: 1.0,
        })}`,
      ),
    ]).then(([graph]) => {
      const canvas = document.createElement('canvas')
      const context:any = canvas.getContext('2d')
      const signHeight = this.SIGN_HEIGHT
      // @ts-ignore
      canvas.width = graph.width + 2 * this.MARGIN
      // @ts-ignore
      canvas.height = graph.height + signHeight + 2 * this.MARGIN
      context.fillStyle = 'white'
      context.fillRect(0, 0, canvas.width, canvas.height)
      // @ts-ignore
      context.drawImage(graph, this.MARGIN, signHeight + this.MARGIN)
      return canvas
    })
  }

  exportPDF(filename:any) {
    this.rasterizeForPrint().then((canvas) => {
      const pdf = new jsPDF('l', 'px', [canvas.width, canvas.height], false)
      this.loadImage(canvas.toDataURL()).then((raster) => {
        // @ts-ignore
        pdf.addImage(raster, 'PNG', 0, 0, canvas.width, canvas.height, NaN, 'FAST')
        pdf.save(`${filename}.pdf`, { returnPromise: true })
      })
    })
  }

  exportPNG(filename:any) {
    this.rasterizeForPrint().then((canvas) => {
      const a = document.createElement('a')
      canvas.toBlob((blob) => {
        a.href = URL.createObjectURL(blob)
        a.download = `${filename}.png`
        a.click()
      })
    })
  }

  makeTippy(node:any, text:any) {
    // return tippy(node.popperRef(), {
    //   content() {
    //     const div = document.createElement('div')
    //     div.innerHTML = text
    //     return div
    //   },
    //   trigger: 'manual',
    //   arrow: true,
    //   placement: 'bottom',
    //   hideOnClick: true,
    //   //@ts-ignore
    //   multiple: false,
    //   sticky: true,
    //   appendTo: document.body,
    // })
  }
}
