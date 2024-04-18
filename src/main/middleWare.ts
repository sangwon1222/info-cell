import { WebContents, ipcMain } from 'electron'

export interface TypeResponse {
  ok: boolean
  msg: string
  result?: any
}

export interface TypeMiddleware {
  _check(): Promise<boolean>
  _reConnect(): Promise<{ ok: boolean; msg: string } | any>
  _send?: any
}

export default class MeddleWare {
  private mWebContents: WebContents
  constructor(webContents: WebContents) {
    this.mWebContents = webContents
  }

  async registMiddleware(obj: TypeMiddleware, name: string) {
    const properties = Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
    const exclude = ['constructor', '_reConnect', '_check']

    for (const property of properties) {
      if (exclude.includes(property)) continue
      ipcMain.handle(property, async (_event, res) => {
        const isConnect = property.substring(0, 1) === '_' ? true : await obj._check()
        if (!isConnect) {
          const { ok, msg } = { ok: false, msg: `${name} 연결이 안되어 있습니다.` }
          return { ok, msg }
        }

        switch (typeof res) {
          case 'object':
            return res?.length ? await obj[property](...res) : await obj[property](res)
          default:
            return await obj[property]()
        }
      })
    }

    obj._send = (channel: string, ...args: any[]) => this.send(channel, ...args)
  }

  send(channel: string, ...args: any[]) {
    this.mWebContents.send(channel, ...args)
  }
}
