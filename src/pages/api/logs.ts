// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import { AuditDMessageType, Log } from '../../types/log'

type Data = {
  logs: Log[]
}

function isAuditLog(log: Log) {
  // console.log(log.process?.name, log.process?.name === 'malicious_prog', log.)
  return log.auditd && log.auditd.message_type === AuditDMessageType.syscall
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const rawData = fs.readFileSync(path.resolve(process.cwd(), 'src/logs/logs.json'))
  const logs = JSON.parse(rawData.toString()) as Log[]

  res.status(200).json({ logs: logs.filter(isAuditLog).map((x, idx) => ({ ...x, id: idx })) })
}
