import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'components'
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
            专注于设计辅导<br/>
            在这寻找你需要的导师<br/>
            或成为导师，分享你的知识
          </h1>

          <Link to={this.props.user ? './teachers' : './orientation'}><Button>寻找导师</Button></Link>
          <Link to='/sign-in'><Button>成为导师</Button></Link>
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