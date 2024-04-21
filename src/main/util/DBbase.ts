import { TypeMiddleware } from '../middleWare'
const fs = require('fs')
interface TypeDBResponse {
  ok: boolean
  msg?: string
  data?: any | undefined
  user?: any | undefined
}
const createTableSQL =
  'CREATE TABLE IF NOT EXISTS scene (' +
  'idx INTEGER NOT NULL UNIQUE, ' +
  'sceneIdx TEXT NOT NULL UNIQUE,' +
  'place TEXT NOT NULL,' +
  'contents TEXT NOT NULL,' +
  'img TEXT DEFAULT "",' +
  'PRIMARY KEY(idx AUTOINCREMENT)' +
  ')'

const sceneDataPath = './db/scene.db'

class DBbase implements TypeMiddleware {
  private mDB: any

  async _check() {
    return true
  }

  async _reConnect() {
    const { ok, msg } = await this._connectDB()
    if (!ok) console.error(msg)
    return { ok, msg }
  }

  async _disconnectDB() {
    this.mDB?.close()
  }

  async _connectDB(): Promise<TypeDBResponse> {
    try {
      if (!fs.existsSync('./db')) {
        fs.mkdirSync('./db')
      }
      if (!fs.existsSync(sceneDataPath)) {
        fs.writeFileSync(sceneDataPath, '', { flag: 'wx' })
      }

      this.mDB = require('better-sqlite3')('./db/excel-data.db')
      const { ok, data, msg } = await this.createSceneTable()
      if (ok) {
        return { ok, data, msg }
      } else {
        return { ok: false, data: [], msg: '데이터 없음' }
      }
    } catch (e: any) {
      this.mDB = null
      return { ok: false, data: [], msg: e.message }
    }
  }

  async createSceneTable(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      const bindDB = () => {
        const create = this.mDB.prepare(createTableSQL)
        create.run()
        if (this.mDB.open) resolve({ ok: true, data: [], msg: 'DB 생성 완료' })
        else resolve({ ok: false, data: [], msg: 'DB 생성 실패' })
      }

      try {
        bindDB()
      } catch (e) {
        const error = e as any

        switch (error.code) {
          case 'EEXIST':
            bindDB()
            break
          default:
            this.mDB = null
            resolve({ ok: false, msg: error.message })
            break
        }
      }
    })
  }

  async dropTable(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      try {
        const sql = 'DROP TABLE scene'
        this.mDB.exec(sql)
        resolve({ ok: true, msg: '테이블 삭제 성공' })
      } catch (e: any) {
        resolve({ ok: false, msg: e.message })
      }
    })
  }

  async getData(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      const sql = 'SELECT * FROM scene ORDER BY sceneIdx ASC'
      try {
        const read = this.mDB.prepare(sql).all()
        resolve({ ok: true, msg: 'DB조회 성공', data: read })
      } catch (e: any) {
        const msg = this.mDB ? e.message : 'DB연결이 안되어 있습니다.'
        resolve({ ok: false, msg, data: [] })
      }
    })
  }

  async searchData(searchParams: { sceneIdx: string }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      const sql = `SELECT * FROM scene WHERE sceneIdx = ?`
      try {
        const { sceneIdx } = searchParams
        const read = this.mDB.prepare(sql).get(sceneIdx)
        if (read) resolve({ ok: true, msg: 'DB조회 성공', data: read })
        else resolve({ ok: false, msg: 'DB조회 결과 없음', data: [] })
      } catch (e: any) {
        const msg = this.mDB ? e.message : 'DB연결이 안되어 있습니다.'
        resolve({ ok: false, msg, data: [] })
      }
    })
  }

  async update(sceneData: { [key: string]: string | number }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      try {
        const { sceneIdx, place, contents, event, img } = sceneData
        const update = this.mDB.prepare(
          `UPDATE scene SET sceneIdx = $sceneIdx, place = $place,contents = $contents, event = $event, img = $img`
        )
        update.run({ sceneIdx, place, contents, event, img })
        console.log(update)
        console.log({ sceneIdx, place, contents, event, img })
        resolve({ ok: true, msg: '업데이트' })
      } catch (e: any) {
        const msg = this.mDB ? e.message : 'DB연결이 안되어 있습니다.'
        resolve({ ok: false, msg, data: [] })
      }
    })
  }

  async insert(sceneData: { [key: string]: string | number }): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      const { sceneIdx, place, contents, event, img } = sceneData
      try {
        const insert = this.mDB.prepare(`
        INSERT INTO scene
        ( sceneIdx,place,contents, event, img )
        VALUES
        ( @sceneIdx, @place,@contents,@event,@img )
          `)
        insert.run({ sceneIdx, place, contents, event, img })
        resolve({ ok: true, msg: '데이터 추가 성공' })
      } catch (e: any) {
        resolve({ ok: false, msg: `[${sceneIdx}] 추가 실패,${e.message}` })
      }
    })
  }

  async deleteAll() {
    try {
      const drop = this.mDB.prepare('DROP TABLE scene')
      drop.run()
      const create = this.mDB.prepare(createTableSQL)
      create.run()

      return { ok: true, msg: '데이터 삭제 성공' }
    } catch (e: any) {
      return { ok: false, msg: e.message }
    }
  }

  async createTxt(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      try {
        if (!fs.existsSync('db/test.txt')) {
          fs.writeFileSync('db/test.txt', '', { flag: 'w' })
        }
        resolve({ ok: true, msg: '유저 정보 조회 성공' })
      } catch (e) {
        const error = e as any
        switch (error.code) {
          case 'EEXIST':
            resolve({ ok: true, msg: error.message })
            break
          default:
            this.mDB = null
            resolve({ ok: false, msg: error.message })
            break
        }
      }
    })
  }

  async updateTxt(data): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      try {
        fs.writeFileSync('db/test.txt', JSON.stringify(data), { flag: 'w' })
        resolve({ ok: true })
      } catch (e) {
        const error = e as any
        switch (error.code) {
          case 'EEXIST':
            resolve({ ok: true, msg: error.message })
            break
          default:
            this.mDB = null
            resolve({ ok: false, msg: error.message })
            break
        }
      }
    })
  }

  async readTxt(): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      try {
        const data = fs.readFileSync('db/test.txt').toString()
        if (data.length) {
          resolve({ ok: true, msg: 'TEST txt', data })
        } else {
          resolve({ ok: false, msg: 'HAS NOT TEST txt', data })
        }
      } catch (e) {
        resolve({ ok: false, msg: `${e}`, data: '' })
      }
    })
  }

  async getScene(scene): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      const name = `db/${scene.replaceAll(`"`, '')}.json`
      try {
        const data = fs.readFileSync(name).toString()
        resolve({ ok: true, data })
      } catch (e) {
        resolve({ ok: false, msg: `${e}`, data: '' })
      }
    })
  }

  async readFile(file: string): Promise<TypeDBResponse> {
    return new Promise((resolve, _reject) => {
      const name = `db/${file.replaceAll(`"`, '')}`
      try {
        const base64 = fs.readFileSync(name, 'base64')
        const data = 'data:image/png;base64, ' + base64.toString('base64')
        resolve({ ok: true, data })
      } catch (e) {
        resolve({ ok: false, msg: `${e}`, data: '' })
      }
    })
  }
}

export default new DBbase()
