/* globals mount, shallow */
/* eslint react/prop-types: 0 */

import React from 'react'
import renderer from 'react-test-renderer'
import connect from '../connect'
import StateContainer from '../StateContainer'

class UserMenuState extends StateContainer {
  constructor({authenticated}) {
    super()
    this.authenticated = authenticated
  }
  get menuOptions() {
    return this.authenticated ? 'Log Out' : 'Press authenticate'
  }
  authenticate() {
    this.authenticated = true
    this.update()
  }
}

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

const initState = props => ({ authenticated: props.authenticated })
const mapStateToProps = stateContainer => ({ menuOptions: stateContainer.menuOptions })
const mapStateHandlersToProps = stateContainer => ({
  authenticate: stateContainer.authenticate.bind(stateContainer)
})
const StatefulUserMenu = connect({
  initState: initState,
  stateHandler: UserMenuState
})(mapStateToProps, mapStateHandlersToProps)(UserMenu)


describe('connect', () => {
  it('passes props to the given component', () => {
    const tree = shallow(<StatefulUserMenu title='User Menu' />)
    expect(tree.prop('title')).toEqual('User Menu')
  })

  it('passes state container properties and methods to the given component', () => {
    const tree = shallow(<StatefulUserMenu />)
    expect(tree.prop('menuOptions')).toBeDefined()
    expect(tree.prop('authenticate')).toBeDefined()
  })

  describe('Stateful Component', () => {
    it('renders correctly', () => {
      let tree = renderer.create(<StatefulUserMenu authenticated={false} />).toJSON()
      expect(tree).toMatchSnapshot()

      tree = renderer.create(<StatefulUserMenu authenticated={true} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('reacts to changes inside state container', () => {
      const tree = mount(<StatefulUserMenu authenticated={false} />)
      tree.find('a').simulate('click')
      expect(tree).toMatchSnapshot()
    })
  })
})
