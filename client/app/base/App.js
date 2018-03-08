'use strict'

// External Dependencies
import React from 'react'
import { Layout, Menu, Button, message } from 'antd'
import { Route, Link, NavLink } from 'react-router-dom'
import { login, logout, register } from '../utili/user'

// Custom styles, components and functions
import './App.less'
import {
  Header, 
  Footer, 
  Loading, 
  Welcome, 
  About, 
  Login, 
  Forgot, 
  Register, 
  Dashboard,
  Orientation,
  Teachers
} from 'components'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    user: null,
    loading: false
  }

  componentWillMount () {
    // Try to login if user has recently login
    (async () => {
      const res = await login()
      if (res.status === 200) {
        const result = await res.json()
        this.setState({
          user: result.data,
        })
      }
    })()
  }

  loading = () => { this.setState({ loading: true }) }
  loaded = () => { this.setState({ loading: false }) }

  register = async (values) => {
    this.loading()
    const res = await register(values)
    if (res.status === 200) {
      const res = await login(values)
      if (res.status === 200) {
        const result = await res.json()
        this.setState({
          user: result.data,
        })
      }
    }
    this.loaded()
  }

  login = async (values) => {
    this.loading()
    const res = await login(values)
    if (res.status === 200) {
      const result = await res.json()
      this.setState({
        user: result.data,
      })
    }
    this.loaded()
  }

  logout = async () => {
    this.loading()
    const res = await logout()
    if (res.status === 200) {
      this.setState({
        user: null
      })
    }
    this.loaded()
  }

  render() {
    return (
      <Layout className='App-Layout'>
        <Layout.Header className='App-Header'>
          <Header user={this.state.user}/>
        </Layout.Header>

        <Layout.Content className='App-Content'>
          <Loading loading={this.state.loading}>
            <Route exact path="/" render={() => <Welcome loaded={this.loaded}/>} />
            <Route path="/orientation" component={Orientation} />
            <Route path="/about" component={About} />
            <Route path="/forgot" component={Forgot} />

            <Route path="/register" render={(props) => <Register 
              register={this.register} 
              user={this.state.user} 
              {...props} />} 
            />
            <Route path="/login" render={(props) => <Login 
              login={this.login} 
              user={this.state.user} 
              {...props} />} 
            />
            <Route path="/dashboard" render={props => <Dashboard 
              logout={this.logout} 
              user={this.state.user} 
              {...props} />} 
            />
            <Route path="/teachers" render={() => <Teachers loading={this.loading} loaded={this.loaded}/>} />
          </Loading>
        </Layout.Content>

        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    )
  }
}
