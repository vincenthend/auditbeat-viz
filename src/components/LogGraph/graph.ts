import { ModelConfig, registerEdge, registerNode, ShapeOptions } from '@antv/g6'

export enum EdgeType {
  GHOST = 'GHOST',
  ARROW = 'ARROW',
  SYSCALL = 'SYSCALL',
}

export const CUSTOM_EDGES: Record<EdgeType, [ShapeOptions] | [ShapeOptions, string]> = {
  [EdgeType.GHOST]: [
    {
      draw(cfg: ModelConfig, group) {
        const { startPoint, endPoint } = cfg
        const path = [
          ['M', startPoint.x, startPoint.y],
          ['L', startPoint.x, endPoint.y],
        ]
        return group.addShape('path', {
          attrs: {
            lineWidth: 0,
            opacity: 0,
            path,
          },
          capture: false,
          name: 'path-shape',
        })
      },
    },
    'line',
  ],
}

export enum NodeType {
  GHOST = 'GHOST',
  PROCESS = 'PROCESS',
}

export const CUSTOM_NODES: Record<NodeType, [ShapeOptions] | [ShapeOptions, string]> = {
  [NodeType.GHOST]: [
    {
      draw(cfg, group) {
        return group.addShape('circle', {
          attrs: {
            x: cfg.x,
            y: cfg.y,
            r: 50,
            // lineWidth: 2,
            // strokeOpacity: 1,
            // stroke: '#e15759',
          },
          capture: false,
        })
      },
    },
    'single-node',
  ],
  [NodeType.PROCESS]: [
    {
      draw(cfg, group) {
        const shape = group.addShape('circle', {
          attrs: {
            lineWidth: 2,
            strokeOpacity: 1,
            stroke: '#e15759',
            x: 0,
            y: 0,
            r: 12,
            fill: !cfg.selected ? 'transparent' : '#e15759',
            cursor: 'pointer',
          },
        })

        group.addShape('text', {
          attrs: {
            x: 0, // center
            y: 20,
            textAlign: 'center',
            textBaseline: 'middle',
            text: cfg.label,
            fill: '#666',
          },
          name: 'text-shape',
          draggable: true,
        })

        return shape
      },
      setState(name, value, item) {
        const group = item.getContainer()
        const children = group.get('children') // Find the first graphics shape of the node. It is determined by the order of being added

        for (const shape of children) {
          if (value) {
            switch (name) {
              case 'active':
                shape.attr('opacity', 1)
                break
              case 'inactive':
                shape.attr('opacity', 0.1)
                break
            }
          } else {
            shape.attr('opacity', 1)
          }
        }
      },
    },
  ],
}

Object.entries(CUSTOM_EDGES).forEach(([name, config]) => {
  const [edgeConfig, edgeExtend] = config
  registerEdge(name, edgeConfig, edgeExtend)
})

Object.entries(CUSTOM_NODES).forEach(([name, config]) => {
  const [nodeConfig, nodeExtend] = config
  registerNode(name, nodeConfig, nodeExtend)
})
