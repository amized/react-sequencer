import { TickerNotifyFunction } from './types'

let onNextTick: Function
let cancelNextTick: Function

if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
  onNextTick = window.requestAnimationFrame
  cancelNextTick = window.cancelAnimationFrame
} else if (typeof setTimeout === 'function') {
  onNextTick = (func: Function) => setTimeout(func, 15)
  cancelNextTick = clearTimeout
} else {
  throw new Error(
    'React sequencer depends on requestAnimationFrame, please use a polyfill if not available in the browser.'
  )
}

class Ticker {
  currentTimeStamp: number
  isActive: boolean
  requestID: string | null
  subscriptions: Array<TickerNotifyFunction>
  constructor() {
    this.currentTimeStamp = Date.now()
    this.isActive = false
    this.requestID = null
    this.subscriptions = []
  }

  startLoop = () => {
    if (!this.isActive) {
      this.isActive = true
      this.currentTimeStamp = Date.now()
      this.requestID = onNextTick(this._onLoop)
    }
  }

  stopLoop = () => {
    if (this.isActive) {
      this.isActive = false
      cancelNextTick(this.requestID)
    }
  }

  onTick(fn: TickerNotifyFunction) {
    if (this.subscriptions.length === 0) {
      this.startLoop()
    }
    this.subscriptions.push(fn)
  }

  offTick(fn: TickerNotifyFunction) {
    const index = this.subscriptions.indexOf(fn)
    if (index !== -1) {
      this.subscriptions.splice(index, 1)
    }
    if (this.subscriptions.length === 0) {
      this.stopLoop()
    }
  }

  _onLoop = () => {
    this.currentTimeStamp = Date.now()
    for (let i = 0; i < this.subscriptions.length; i++) {
      const fn = this.subscriptions[i]
      fn(this.currentTimeStamp)
    }
    onNextTick(this._onLoop)
  }
}

export default Ticker
