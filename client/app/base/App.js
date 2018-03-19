// External Dependencies
import React from 'react'
import { Layout } from 'antd'
import { Route } from 'react-router-dom'
import { UserUtili } from '../utili'

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
    majors: null,
    isLoading: false
  }
  componentDidMount = async () => {
    let res = await UserUtili.signIn()
    if (res.status === 200) {
      const data = await res.json()
      this.setUser(data)
    }
    res = await fetch( '/api/majors')
    if (res.status === 200) {
      const data = await res.json()
      this.setState({ majors: data })
    }
  }
  setLoading = (boolean) => { 
    this.setState({ isLoading: boolean }) 
  }
  setUser = (user = null) => {
    this.setState({ user })
  }
  render() {
    return (
      <Layout className='App-Layout'>
        <Layout.Header className='App-Header'>
          <Header user={this.state.user}/>
        </Layout.Header>

        <Layout.Content className='App-Content'>
          <Loading isLoading={this.state.isLoading}>
            <Route exact path="/" render={() => <Welcome
              setLoading={this.setLoading}
              user={this.state.user} />}
            />
            <Route path="/orientation" component={Orientation} />
            <Route path="/about" component={About} />
            <Route path="/forgot" component={Forgot} />

            <Route path="/sign-up" render={(props) => <SignUp 
              setUser={this.setUser} 
              setLoading={this.setLoading}
              user={this.state.user} 
              {...props} />} 
            />
            <Route path="/sign-in" render={(props) => <SignIn 
              setUser={this.setUser} 
              setLoading={this.setLoading}
              user={this.state.user} 
              {...props} />} 
            />
            <Route path="/dashboard" render={props => <Dashboard 
              setUser={this.setUser} 
              setLoading={this.setLoading}
              user={this.state.user} 
              majors={this.state.majors}
              {...props} />} 
            />
            <Route path="/teachers" render={() => <Teachers 
              setLoading={this.setLoading} />}
            />
          </Loading>
        </Layout.Content>

        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    )
  }
}
