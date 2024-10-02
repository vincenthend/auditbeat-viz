import { Log } from '../../types/log'

export function getSyscallLabel(log: Log): string {
  if (!log.auditd?.data.syscall) {
    console.log(log)
  }
  return log.auditd?.data.syscall ?? 'unknown'
}

export function collectProcess(logs: Log[]): string[] {
  const process = new Set<string>()

  for (const log of logs) {
    const syscallData = log.auditd?.data
    process.add(log.auditd?.summary.how)
    switch (syscallData?.syscall) {
      case 'socket':
        process.add(`socket_${syscallData?.a0}`)
        break
      case 'connect':
        process.add(
          `${log.auditd?.summary.object?.primary}:${log.auditd?.summary.object?.secondary}`,
        )
        break
      case 'unlink':
      case 'rmdir':
      case 'openat':
      case 'execve':
      default:
        process.add(log.auditd?.summary.object?.primary)
        break
    }
  }

  return Array.from(process).filter(Boolean)
}

export function getSyscallSrcTarget(log: Log): [string, string] {
  const source = log.auditd?.summary.how
  let target = ''

  const syscallData = log.auditd?.data
  switch (syscallData?.syscall) {
    case 'socket':
      target = `socket_${syscallData?.a0}`
      break
    case 'connect':
      target = `${log.auditd?.summary.object?.primary}:${log.auditd?.summary.object?.secondary}`
      break
    case 'unlink':
    case 'rmdir':
    case 'openat':
    case 'execve':
    default:
      target = log.auditd?.summary.object?.primary
      break
  }

  return [source, target]
}
