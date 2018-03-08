'use strict'

// External Dependencies
import React from 'react'
import { Layout, Menu, Button, message } from 'antd'
import { Route, Link, NavLink } from 'react-router-dom'
import { signIn, signOut, signUp, logout } from '../utili/user'

// Custom styles, components and functions
import './App.less'
import {
  Header, 
  Footer, 
  Loading, 
  Welcome, 
  About, 
  SignIn, 
  Forgot, 
  SignUp, 
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
  componentDidMount () {
    // Try to sign in if user has recently sign in
    (async () => {
      const res = await signIn()
      if (res.status === 200) {
        const result = await res.json()
        this.setState({
          user: result.data,
        })
      }
    })()
  }
  loading = () => { 
    this.setState({ loading: true }) 
  }
  loaded = () => { 
    this.setState({ loading: false }) 
  }
  signUp = async (values) => {
    this.loading()
    const res = await signUp(values)
    if (res.status === 200) {
      const res = await signIn(values)
      if (res.status === 200) {
        const result = await res.json()
        this.setState({
          user: result.data,
        })
      }
    }
    this.loaded()
  }
  signIn = async (values) => {
    this.loading()
    const res = await signIn(values)
    if (res.status === 200) {
      const result = await res.json()
      this.setState({
        user: result.data,
      })
    }
    this.loaded()
  }
  signOut = async () => {
    this.loading()
    const res = await signOut()
    if (res.status === 200) {
      this.setState({
        user: null
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

            <Route path="/sign-up" render={(props) => <SignUp 
              signUp={this.signUp} 
              user={this.state.user} 
              {...props} />} 
            />
            <Route path="/sign-in" render={(props) => <SignIn 
              signIn={this.signIn} 
              user={this.state.user} 
              {...props} />} 
            />
            <Route path="/dashboard" render={props => <Dashboard 
              signOut={this.signOut} 
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
