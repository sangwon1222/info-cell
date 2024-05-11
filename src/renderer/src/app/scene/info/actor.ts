import { canvasInfo } from '@/util/canvas'
import * as PIXI from 'pixi.js'
import Scene from '../scene'
import gsap from 'gsap'
import { useSceneStore } from '@/store/scene'
import { rscManager } from '@/app/resource/resourceManager'
import App from '@/app'
import { getAlphaInImg } from '@/util'
import InfoCell from '.'
import { find } from 'lodash-es'

export default class Actor extends PIXI.Container {
  private mSrc: string
  private mSprite: PIXI.Sprite
  private mMoveFlag: boolean

  get moveFlag(): boolean {
    return this.mMoveFlag
  }
  get src(): string {
    return this.mSrc
  }
  set setInteraction(v: boolean) {
    this.mSprite.interactive = v
  }
  constructor(src: string) {
    super()
    this.mSrc = src
    this.mSprite = new PIXI.Sprite()
    this.mMoveFlag = false
  }

  async init() {
    const texture = await rscManager.getHandle.getRsc(this.mSrc)
    this.mSprite.texture = texture
    this.mSprite.anchor.set(0.5)
    this.addChild(this.mSprite)

    this.mSprite.on('pointerdown', (e) => {
      //   const target = e.target as PIXI.Sprite
      //   const able = getAlphaInImg(target, e.x, e.y)
      this.mMoveFlag = true
      //   if (able) {
      ;(this.parent.parent as InfoCell).sortActor(this.mId)
      //   }
    })

    this.mSprite.on('pointermove', (e) => {
      if (!this.mMoveFlag) return
      this.position.set(e.x, e.y)
    })
    this.mSprite.on('pointerup', (e) => this.endMove(e))
    this.mSprite.on('pointerout', (e) => this.endMove(e))
    this.mSprite.on('pointerleave', (e) => this.endMove(e))
  }

  endMove(e) {
    if (this.mMoveFlag) {
      this.mMoveFlag = false
      const target = find(useSceneStore.event.img, (e) => e.src == this.mSrc)
      if (target) {
        target.x = e.x
        target.y = e.y
      } else {
        useSceneStore.event.img.push({ src: this.mSrc, x: e.x, y: e.y, start: { x: 0, y: 0 } })
      }
      console.log(target)
      console.log(useSceneStore.event)
    }
  }
}
