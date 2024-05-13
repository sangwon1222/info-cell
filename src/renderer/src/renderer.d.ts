declare interface TypeLayoutStore {
  isLoading: boolean
  loadingText: string
}

declare interface TypeSceneStore {
  sceneName: string
  gameScreen: {
    place: any
    actor: any
  }
  eventList?: any
  event?: TypeInterActiveEvents | TypeChatEvents[] | any
  saveData?: TypeInterActiveEvents | TypeChatEvents[] | any
  editMode: boolean
  eventIndex: number
}

// 'chat' |'examine' | 'move' | 'use'
declare interface TypeChatEvents {
  type: string
  actor: string
  chat: string
  placeId: number
  img: { id: number; start: { x: number; y: number }; x: number; y: number }[]
}
declare interface TypeInterActiveEvents {
  type: string
  examine: {
    id: number
    placeId: number
    isShow: boolean
    isComplete: boolean
    rect: { x: number; y: number; w: number; h: number }
    script: {
      actor: string
      chat: string
      placeId: number
      img: { id: number; start: { x: number; y: number }; x: number; y: number }[]
    }
  }
  move: {
    id: number
    isShow: boolean
    placeId: number
    condition: { type: string; id: number; able: string }
  }[]
  talk: {
    id: number
    label: string
    isShow: boolean
    isComplete: boolean
    script: {
      actor: string
      chat: string
      placeId: number
      img: { id: number; start: { x: number; y: number }; x: number; y: number }[]
    }[]
  }[]
  use: {
    id: number
    isShow: boolean
    isComplete: boolean
    script: {
      actor: string
      chat: string
      placeId: number
      img: { id: number; start: { x: number; y: number }; x: number; y: number }[]
    }[]
  }
}

declare interface TypeRsc {
  id: number
  name: string
  src: string
  data: string
  start: { x: number; y: number }
  x: number
  y: number
}
