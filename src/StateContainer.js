import EventEmitter from 'events'

class StateContainer extends EventEmitter {
  update() {
    this.emit('change')
  }
}

export default StateContainer
