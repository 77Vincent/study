import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Carousel } from 'antd';
import './index.less';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    position: 'center'
  }

  effect = (e) => {
    this.setState({
      position: `-${e.pageX / 2}px -${e.pageY / 2}px`
    });
  }

  render() {
    return (
      <div className='Welcome' onMouseMove={this.effect} >
        <hgroup>
          <div style={{backgroundPosition: `${this.state.position}`}} className='App-background-image' />

          <h1>
            专注于<span>设计</span>辅导<br/>
            在这找到你需要的<span>导师</span><br/>
            或成为导师，分享你的<span>知识</span>
          </h1>

          <Button size='large' type='primary'>
            <Link to='/orientation' >寻找导师</Link>
          </Button>

          <Button size='large'>
            <Link to='/login'>成为导师</Link>
          </Button>
        </hgroup>
      </div>
    );
  }
}