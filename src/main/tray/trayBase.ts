const { Menu } = require('electron')
import icon from '../../../resources/16x16.png?asset'

export default abstract class TrayOptionBase {
  private menu: Electron.Menu
  get trayMenu() {
    return this.menu
  }

  constructor() {
    this.menu = Menu.buildFromTemplate([
      { label: 'INFO-CELL', enabled: false, icon },
      { label: '열기', type: 'normal', click: () => this.trayOpen() },
      { label: '최소화', type: 'normal', click: () => this.trayMinimize() },
      { label: 'dev_tool', type: 'normal', click: () => window.openDevTool.openDevTools() },
      { label: '닫기', type: 'normal', click: () => this.trayClose() },
      { label: '', type: 'separator' },
      { label: '종료', type: 'normal', click: () => this.trayQuit() }
    ])
  }

  abstract trayOpen(): void
  abstract trayMinimize(): void
  abstract trayClose(): void
  abstract trayQuit(): void
}
