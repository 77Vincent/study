import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Carousel } from 'antd';
import './index.less';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    position: 'center',
    ad: [{
      text: '已辅导学生人数',
      num: '200'
    }, {
      text: '认证老师人数',
      num: '200'
    }, {
      text: '全网已预定课时',
      num: '200'
    }]     
  }

  componentDidMount = () => {
    this.props.loaded()
  }

  effect = (e) => {
    this.setState({
      position: `-${e.pageX / 2}px -${e.pageY / 2}px`
    });
  }

  render() {
    return (
      <div className='Welcome' onMouseMove={this.effect} >
        <div style={{backgroundPosition: `${this.state.position}`}} className='App-background-image' />

        <hgroup>
          <h1>
            专注于<span>设计</span>辅导<br/>
            在这寻找你需要的<span>导师</span><br/>
            或成为导师，分享你的<span>知识</span>
          </h1>

          <Button size='large' type='primary'>
            <Link to='/orientation' >寻找导师</Link>
          </Button>

          <Link to='/login'>成为导师 ></Link>
        </hgroup>

        <aside>
          {
            this.state.ad.map((item, index) => (
              <section key={index}>
                <h3>{item.text}</h3>
                <h2>{item.num}</h2>
              </section>
            ))
          }
        </aside>
      </div>
    );
  }
}