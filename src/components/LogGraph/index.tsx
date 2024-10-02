import { EdgeConfig, Graph, IG6GraphEvent, NodeConfig } from '@antv/g6'
import React from 'react'

import { NodeType } from './graph'
import { Log } from '../../types/log'
import { collectProcess, getSyscallLabel, getSyscallSrcTarget } from './utils'

interface Props {
  logs: Log[]
}

function refreshDraggedNodePosition(e: IG6GraphEvent) {
  const model = e.item.get('model')
  model.fx = e.x
  model.fy = e.y
  model.x = e.x
  model.y = e.y
}

const BASE_NODE_ID = '_BASE'
const BASE_NODE = {
  id: BASE_NODE_ID,
  type: NodeType.GHOST,
}

function LogGraph(props: Props) {
  const { logs } = props
  const ref = React.useRef<HTMLDivElement>()
  const [graph, setGraph] = React.useState<Graph>()

  React.useLayoutEffect(() => {
    const graph = new Graph({
      container: ref.current,
      width: ref.current?.scrollWidth || 475,
      height: ref.current?.scrollHeight || 500,
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSpacing: 50,
      },
      defaultNode: {
        size: 30,
        type: NodeType.PROCESS,
      },
      nodeStateStyles: {
        active: {
          opacity: 1,
        },
        inactive: {
          opacity: 0.2,
        },
      },
      edgeStateStyles: {
        active: {
          stroke: '#999',
        },
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'activate-relations'],
      },
    })
    graph.fitView()
    graph.on('node:dragstart', function (e) {
      graph.layout()
      refreshDraggedNodePosition(e)
    })
    graph.on('node:drag', function (e) {
      const forceLayout = graph.get('layoutController').layoutMethods[0]
      forceLayout.execute()
      refreshDraggedNodePosition(e)
    })
    graph.on('node:dragend', function (e) {
      e.item.get('model').fx = null
      e.item.get('model').fy = null
    })
    graph.render()
    setGraph(graph)

    return () => {
      graph.destroy()
    }
  }, [])

  React.useEffect(() => {
    try {
      if (graph) {
        // Create a base node to anchor all new nodes around this node
        const nodes: NodeConfig[] = [BASE_NODE]
        const edges: EdgeConfig[] = []

        const process = collectProcess(logs)
        process.forEach((processName) => {
          nodes.push({
            id: processName,
            label: processName,
            type: NodeType.PROCESS,
          })
        })

        logs?.forEach((log) => {
          // Add edges to each dependency
          const [source, target] = getSyscallSrcTarget(log)
          if (source && target && source !== target) {
            // connect base node to ghost node
            // edges.push({
            //   source: BASE_NODE.id,
            //   target: source,
            //   type: EdgeType.GHOST,
            // })

            edges.push({
              source,
              target,
              label: getSyscallLabel(log),
              style: {
                endArrow: true,
              },
              id: `${source}_${target}_${getSyscallLabel(log)}`,
            })
          }
        })

        graph.changeData({
          nodes,
          edges,
        })
        graph.refresh()
        graph.fitView(null, { onlyOutOfViewPort: true }, true)
      }
    } catch (e) {
      console.error(e)
    }
  }, [logs, graph])

  return (
    <>
      <div ref={ref} style={{ height: '100%', width: '100%' }} />
    </>
  )
}

export default LogGraph
