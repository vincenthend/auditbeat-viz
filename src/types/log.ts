export interface Log {
  id: number
  '@timestamp': string
  '@metadata': Metadata
  service: Service
  error?: Error
  ecs: Ecs
  host: Host
  agent: Agent
  event: Event
  process?: Process
  network?: Network
  auditd?: Auditd
  user?: User
  file?: File
  tags?: string[]
  destination?: Destination
  message?: string
  related?: Related
  flow?: Flow
  server?: Server
  source?: Source
  client?: Client
  system?: System
  group?: Group5
}

export interface Metadata {
  beat: string
  type: string
  version: string
}

export interface Service {
  type: string
}

export interface Error {
  message: string
}

export interface Ecs {
  version: string
}

export interface Host {
  name: string
  ip?: string[]
  mac?: string[]
  os?: Os
  architecture?: string
  containerized?: boolean
  hostname?: string
  id?: string
}

export interface Os {
  name: string
  platform: string
  type: string
  version: string
  codename: string
  family: string
  kernel: string
}

export interface Agent {
  type: string
  version: string
  ephemeral_id: string
  id: string
  name: string
}

export interface Event {
  module: string
  category?: string[]
  action: any
  outcome?: string
  kind?: string
  type?: string[]
  id?: string
  dataset?: string
  start?: string
  end?: string
  duration?: number
}

export interface Process {
  pid: number
  name?: string
  args?: string[]
  executable?: string
  created?: string
  working_directory?: string
  entity_id?: string
  parent?: Parent
  start?: string
  hash?: Hash
  thread?: Thread
  title?: string
}

export interface Parent {
  pid: number
}

export interface Hash {
  sha1: string
}

export interface Thread {
  capabilities: Capabilities
}

export interface Capabilities {
  effective: string[]
  permitted: string[]
}

export interface Network {
  packets?: number
  bytes?: number
  community_id?: string
  direction: string
  type?: string
  transport?: string
}

export enum AuditDMessageType {
  syscall = 'syscall',
  user_acct = 'user_acct',
  cred_refr = 'cred_refr',
  user_cmd = 'user_cmd',
  user_start = 'user_start',
  config_change = 'config_change',
}

export interface Auditd {
  session?: string
  summary: Summary
  message_type: AuditDMessageType
  sequence: number
  result: string
  data: SyscallData
  paths?: Path[]
}

export interface Summary {
  actor: Actor
  object?: Object
  how?: string
}

export interface Actor {
  primary: string
  secondary?: string
}

export interface Object {
  primary?: string
  type: string
  secondary?: string
}

export interface SyscallData {
  grantors?: string
  acct?: string
  terminal?: string
  op?: string
  cmd?: string
  a1?: string
  tty?: string
  a0?: string
  arch?: string
  a3?: string
  exit?: string
  syscall?: string
  socket?: Socket
  a2?: string
  argc?: string
  audit_backlog_wait_time?: string
  old?: string
  auid?: string
  ses?: string
  result?: string
  audit_pid?: string
  subj_user?: string
}

export interface Socket {
  saddr?: string
  family: string
  addr?: string
  port?: string
}

export interface Path {
  cap_frootid: string
  cap_fver: string
  item: string
  name: string
  nametype: string
  cap_fe: string
  cap_fi: string
  cap_fp: string
  inode?: string
  dev?: string
  mode?: string
  ogid?: string
  rdev?: string
  ouid?: string
}

export interface User {
  id?: string
  name?: string
  selinux?: Selinux
  audit?: Audit
  effective?: Effective
  group?: Group2
  saved?: Saved
  filesystem?: Filesystem
}

export interface Selinux {
  user: string
}

export interface Audit {
  id: string
  name: string
}

export interface Effective {
  id: string
  name?: string
  group?: Group
}

export interface Group {
  id: string
  name?: string
}

export interface Group2 {
  id: string
  name: string
}

export interface Saved {
  id: string
  group: Group3
  name?: string
}

export interface Group3 {
  id: string
  name?: string
}

export interface Filesystem {
  id: string
  group: Group4
  name: string
}

export interface Group4 {
  id: string
  name: string
}

export interface File {
  owner?: string
  ctime?: string
  gid?: string
  group?: string
  type?: string
  mode?: string
  path: string
  inode?: string
  mtime?: string
  uid?: string
  target_path?: string
  device?: string
}

export interface Destination {
  ip: string
  port: any
  packets?: number
  bytes?: number
  domain?: string
}

export interface Related {
  ip?: string[]
  user: string[]
}

export interface Flow {
  final: boolean
  complete: boolean
}

export interface Server {
  port: number
  packets: number
  bytes: number
  domain?: string
  ip: string
}

export interface Source {
  bytes: number
  ip: string
  port: number
  packets: number
}

export interface Client {
  ip: string
  port: number
  packets: number
  bytes: number
}

export interface System {
  audit: Audit2
}

export interface Audit2 {
  socket?: Socket2
  host?: Host2
}

export interface Socket2 {
  uid: number
  gid: number
  euid: number
  egid: number
  kernel_sock_address: string
}

export interface Host2 {
  containerized: boolean
  ip: string[]
  mac: string[]
  'timezone.offset.sec': number
  architecture: string
  uptime: number
  id: string
  os: Os2
  'timezone.name': string
  boottime: string
  hostname: string
}

export interface Os2 {
  version: string
  kernel: string
  codename: string
  type: string
  platform: string
  name: string
  family: string
}

export interface Group5 {
  id: string
  name: string
}
