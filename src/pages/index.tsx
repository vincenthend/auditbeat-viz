import Head from 'next/head'
import ky from 'ky'
import React from 'react'
import { Log } from '../types/log'
import LogGraph from '../components/LogGraph'

export default function Home() {
  const [data, setData] = React.useState<Log[]>()

  const loadData = React.useCallback(async () => {
    const data = await ky.get<{ logs: Log[] }>('/api/logs').json()
    setData(data.logs)
  }, [])

  React.useEffect(() => {
    loadData().catch((e) => {
      console.error(e)
    })
  }, [loadData])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data && <LogGraph logs={data} />}
      </div>
    </div>
  )
}
