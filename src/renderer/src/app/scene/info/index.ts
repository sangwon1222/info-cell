import { canvasInfo } from '@/util/canvas'
import * as PIXI from 'pixi.js'
import Scene from '../scene'
import gsap from 'gsap'
import { useSceneStore } from '@/store/scene'
import { rscManager } from '@/app/resource/resourceManager'
import Actor from './actor'

const { width, height } = canvasInfo

export default class InfoCell extends Scene {
  private mBgSprite: PIXI.Sprite
  private mBgInfo: { x: number; y: number; src: string }
  private mActorContainer: PIXI.Container
  private mActorList: Actor[]
  constructor() {
    super(0, 'info')
  }

  async init() {
    console.log(`%c info-cell init`, 'padding:6px; border:2px purple solid;')
    this.removeChildren()
    this.sortableChildren = true
    this.mBgInfo = { x: 0, y: 0, src: '' }
    this.mActorList = []
    this.mBgSprite = new PIXI.Sprite()
    this.mActorContainer = new PIXI.Container()
    this.sortableChildren = true
    this.mBgSprite.zIndex = 1
    this.mActorContainer.zIndex = 2
    this.addChild(this.mBgSprite, this.mActorContainer)
  }

  async startGame() {
    console.log('startGame')
  }

  async next() {
    console.log(useSceneStore.gameScreen)
    if (this.mBgInfo.src !== useSceneStore.gameScreen.place.src) {
      this.mBgInfo.src = useSceneStore.gameScreen.place.src
      const texture = await rscManager.getHandle.getRsc(useSceneStore.gameScreen.place.src)
      this.mBgSprite.position.set(this.mBgInfo.x, this.mBgInfo.y)
      this.mBgSprite.texture = texture
    }

    this.mActorList = []
    this.mActorContainer.removeChildren()
    const actorData = useSceneStore.gameScreen.actor
    for (let i = 0; i < actorData.length; i++) {
      const { src, start, x, y } = actorData[i]

      const actor = new Actor(src)
      actor.zIndex = 1
      await actor.init()
      this.mActorContainer.addChild(actor)
      this.mActorList.push(actor)
      actor.setInteraction = true
      actor.position.set(x, y)
      // actor.position.set(start.x, start.y)
      // gsap.to(actor, {
      //   x,
      //   y,
      //   duration: 0.5,
      //   onComplete: () => {
      //     actor.setInteraction = true
      //   }
      // })
    }
  }

  sortActor(src: string) {
    for (let i = 0; i < this.mActorList.length; i++) {
      const actor = this.mActorList[i]
      actor.zIndex = actor.src == src ? 2 : 1
    }
  }
  async addActor(name: string) {
    const actor = new Actor(name)
    await actor.init()
    actor.position.set(width / 2, height / 2)
    actor.setInteraction = true
    this.mActorList.push(actor)
    this.mActorContainer.addChild(actor)
  }
}
