import React, { Component } from 'react'

const connect = ({
  initState = () => ({}),
  stateHandler
}) => (mapStateToProps, mapStateHandlersToProps) => WrappedComponent => {
  return class StateContainer extends Component {
    constructor(props) {
      super(props)

      const StateHandler = stateHandler
      this.stateContainer = new StateHandler(initState(props))
    }

    componentDidMount() {
      this.stateContainer.on('change', () => {
        this.forceUpdate()
      })
    }

    componentWillUnmount() {
      this.stateContainer.removeAllListeners('change')
    }

    render() {
      const stateProps = mapStateToProps(
        this.stateContainer
      )

      const stateHandlerProps = mapStateHandlersToProps(
        this.stateContainer
      )

      return (
        <WrappedComponent
          {...this.props}
          {...stateProps}
          {...stateHandlerProps}
        />
      )
    }
  }
}

export default connect
