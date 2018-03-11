import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import './index.less'

export default class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount = () => {
    this.props.setLoading(false)
  }
  promotion = [{
    text: '已辅导学生人数',
    num: '200'
  }, {
    text: '认证老师人数',
    num: '200'
  }, {
    text: '全网已预定课时',
    num: '200'
  }]     
  render() {
    return (
      <div className='Welcome'>
        <hgroup>
          <h1>
            <span>
              专注设计教育<br/>
              寻找你的导师<br/>
              分享你的知识 
            </span>
          </h1>

          <Button size='large' type='primary'>
            <Link to={this.props.user ? './teachers' : './orientation'}>寻找导师</Link>
          </Button>

          <Button size='large'>
            <Link to='/sign-in'>成为导师</Link>
          </Button>
        </hgroup>

        <aside>
          {
            this.promotion.map((item, index) => (
              <section key={index}>
                <h5>{item.text}</h5>
                <h4>{item.num}</h4>
              </section>
            ))
          }
        </aside>
      </div>
    )
  }
}