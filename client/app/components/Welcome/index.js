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

          <Button>
            <Link to='/orientation' >寻找导师</Link>
          </Button>

          <Button>
            <Link to='/sign-in'>成为导师</Link>
          </Button>
        </hgroup>

        <aside>
          {
            this.promotion.map((item, index) => (
              <section key={index}>
                <h3>{item.text}</h3>
                <h2>{item.num}</h2>
              </section>
            ))
          }
        </aside>
      </div>
    )
  }
}