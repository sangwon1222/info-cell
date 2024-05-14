declare interface TypeLayoutStore {
  isLoading: boolean
  loadingText: string
}

declare interface TypeScriptEvents {
  actor: string
  chat: string
  place: string
  placeName: string
  rect?: { x: number; y: number; w: number; h: number }
  img: { src: string; start: { x: number; y: number }; x: number; y: number }[]
}
declare interface TypeInterActiveEvents {
  type: string
  examine: TypeInterActive[]
  move: TypeInterActive[]
  talk: TypeInterActive[]
  use: TypeInterActive[]
}

declare interface TypeInterActive {
  label?: string
  isShow: boolean
  isComplete: boolean
  condition: boolean
  place: string
  placeName: string
  script: TypeScriptEvents[]
  next?: boolean
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
