# react-state-class

[![Build Status](https://travis-ci.org/dra1n/react-state-class.svg?branch=master)](https://travis-ci.org/dra1n/react-state-class)

The main idea is to decouple state logic from component code and simplify testing.

## Installation

```sh
npm install --save react-state-class
```

## Usage

```jsx
import { StateContainer } from 'react-state-class'

export default class UserMenuState extends StateContainer {
  constructor({authenticated}) {
    super()

    this.authenticated = authenticated
  }

  get menuOptions() {
    return this.authenticated ? 'Log Out' : 'Press authenticate'
  }

  authenticate() {
    this.authenticated = true
    this.emit('change')
  }
}
```

Stateful component definition. Here we wrap our UserMenu in higher order component (HOC), which will provide all data and state handlers to UserMenu via props.

```jsx
import { connect } from 'react-state-class'
import UserMenuState from './UserMenuState'

// Props may be given by react_compoment view helper.
// Object returned by this function will be used for
// state container initialization
const initState = props => ({
  authenticated: props.authenticated
})

// data getters
const mapStateToProps = stateContainer => ({
  menuOptions: stateContainer.menuOptions
})

// data setters
const mapStateHandlersToProps = stateContainer => ({
  authenticate: stateContainer.authenticate
})

const StatefulUserMenu = connect({
  initState: initState,
  stateHandler: UserMenuState
})(mapStateToProps, mapStateHandlersToProps)(UserMenu)

export default StatefulUserMenu
```

Using state containers makes our components really simple and state itself very testable.

```jsx
const UserMenu = ({ menuOptions, authenticate }) => (
  <div>
    <div>
      { menuOptions }
    </div>
    <a onClick={authenticate}>
      Authenticate
    </a>
  </div>
)

export default UserMenu
```
