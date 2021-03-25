/*
 * @Author: D.Y
 * @Date: 2021-01-04 17:01:06
 * @LastEditTime: 2021-01-22 19:48:47
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/views/comps/x6/x6.map.ts
 * @Description:
 */

import { NodeView } from '@antv/x6'

export class SimpleNodeView extends NodeView {
  protected renderMarkup() {
    return this.renderJSONMarkup({
      tagName: 'rect',
      selector: 'body',
    })
  }

  update() {
    super.update({
      body: {
        refWidth: '100%',
        refHeight: '100%',
        fill: '#31d0c6',
      },
    })
  }
}
