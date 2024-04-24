import { TypeMiddleware } from '../middleWare'
const fs = require('fs')
interface TypeDBResponse {
  ok: boolean
  msg?: string
  data?: any | undefined
  user?: any | undefined
  rscName?: string | undefined
}

const path = './db'
const jsonPath = `${path}/json`
const rscPath = `${path}/rsc`
class JsonApi implements TypeMiddleware {
  async _check() {
    return true
  }

  async _reConnect() {
    //
  }

  async _disconnectDB() {
    //
  }

  async _connect(): Promise<TypeDBResponse> {
    try {
      if (!fs.existsSync(path)) fs.mkdirSync(path)
      if (!fs.existsSync(jsonPath)) fs.mkdirSync(jsonPath)
      if (!fs.existsSync(rscPath)) fs.mkdirSync(rscPath)

      return { ok: true, data: [], msg: 'JSON DATA' }
    } catch (e: any) {
      return { ok: false, data: [], msg: e.message }
    }
  }

  async getSceneList(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      try {
        const files = fs.readdirSync(jsonPath)
        const data: string[] = []
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          const extension = file.split('.')
          if (extension[1] == 'json') data.push(extension[0])
        }
        resolve({ ok: true, data, msg: '조회 성공' })
      } catch (e) {
        resolve({ ok: false, data: [], msg: `${e}` })
      }
    })
  }

  async getScene(scene): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      try {
        fs.readFile(jsonPath + '/' + scene + '.json', function (err, buf) {
          if (err) return resolve({ ok: false, data: [], msg: '조회 실패' })
          const data = JSON.parse(buf)
          resolve({ ok: true, data, msg: '조회 성공' })
        })
      } catch (e) {
        resolve({ ok: false, data: '', msg: `${e}` })
      }
    })
  }

  async getRscList(file: string): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      try {
        const files = fs.readdirSync(rscPath).split(',')
        resolve({ ok: true, data: files })
      } catch (e) {
        resolve({ ok: false, msg: `${e}`, data: '' })
      }
    })
  }

  async getRsc(file: string): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      const name = `${rscPath}/${file.replaceAll(`"`, '')}`
      try {
        const base64 = fs.readFileSync(name, 'base64')
        const data = 'data:image/png;base64, ' + base64.toString('base64')
        resolve({ ok: true, data })
      } catch (e) {
        resolve({ ok: false, msg: `${e}`, data: '' })
      }
    })
  }

  async uploadRsc({ path, name }: { path: string; name: string }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      try {
        const base64 = fs.readFileSync(path, 'base64')
        // const data = 'data:image/png;base64, ' + base64.toString('base64')

        fs.writeFile(`${rscPath}/${name}`, base64, 'base64', (err) => {
          if (err) return resolve({ ok: false, data: '', rscName: '', msg: err })
          fs.readFile(`${rscPath}/${name}`, function (err, buf) {
            if (err) return resolve({ ok: false, data: '', rscName: '', msg: `${err}` })
            else
              return resolve({
                ok: true,
                data: 'data:image/png;base64, ' + buf.toString('base64'),
                rscName: name,
                msg: '업로드'
              })
          })
        })
      } catch (e) {
        resolve({ ok: false, data: '', rscName: '', msg: `${e}` })
      }
    })
  }
}

export default new JsonApi()
