import * as PIXI from 'pixi.js'
import SceneManager from '@/app/sceneManager'
import Scene from '@/app/scene/scene'
import { registVisibleChange } from '@/util/index'
import { ShaderSystem, Renderer } from '@pixi/core'

import '@pixi/unsafe-eval'
import InfoCell from './scene/info'

/**
 * @params {number} - background color
 * @params {number} - canvas width
 * @params {number} - canvas height
 * @params {HTMLCanvasElement} - canvas view
 */
export default class App extends PIXI.Application {
  private static handle: App
  private mSceneManager: SceneManager

  static get getHandle(): App {
    return App.handle
  }
  get getScene(): InfoCell {
    return this.mSceneManager.currentScene as InfoCell
  }

  constructor() {
    super()
    App.handle = this
  }

  /** @description application 초기 세팅  */
  async ready() {
    this.stage.removeChildren()
    this.mSceneManager = new SceneManager()
    this.stage.addChild(this.mSceneManager)
    this.stage.sortableChildren = true
    this.mSceneManager.zIndex = 1

    registVisibleChange()

    await this.mSceneManager.init()
    await this.mSceneManager.start()
  }

  /** @description 탭이 안보일 때  */
  onHiddenTab() {
    console.log('탭이 안보일 때')
  }

  /**  @description 탭이 보일 때 */
  onViewTab() {
    console.log('탭이 보일 때')
  }
}
