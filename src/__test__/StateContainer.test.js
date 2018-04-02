import StateContainer from '../StateContainer'

describe('StateContainer', () => {
  let stateContainer = new StateContainer()

  it('allows to subscribe to the events', done => {
    const callback = data => {
      expect(data).toEqual(42)
      done()
    }

    stateContainer.on('change', callback)
    stateContainer.emit('change', 42)
  })

  it('allows to unsubscribe from the events', () => {
    const callback = jest.fn()

    stateContainer.on('change', callback)
    stateContainer.removeAllListeners('change')
    stateContainer.emit('change', 42)

    expect(callback).not.toHaveBeenCalled()
  })

  describe('#update', () => {
    it('triggers "change" event', () => {
      const callback = jest.fn()

      stateContainer.on('change', callback)
      stateContainer.update()
      expect(callback).toHaveBeenCalled()
    })
  })
})
