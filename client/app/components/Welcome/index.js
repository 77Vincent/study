import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './index.less';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className='Welcome'>
        <hgroup>
          <div className='App-background-image' />

          <h1>
              专注于<span className='font-color-primary'>设计</span>辅导<br/>
              在这找到你需要的<span className='font-color-primary'>导师</span><br/>
              或成为导师，分享你的<span className='font-color-primary'>知识</span>
          </h1>
          {/* <p>留学顾问，就是提供到国外留学等相关咨询服务的人。如，如何选择国外的学校，如何申请国外的学校，如何准备申请材料，如何办理签证，及其相关的一系列信息。顾问，英文为counselor。有某方面的专门知识，供个人或机关团体咨询的人。</p> */}

          <Button size='large' type='primary'>
            <Link to='/orientation' >寻找导师</Link>
          </Button>

          <Button size='large'>
            <Link to='/login'>成为导师</Link>
          </Button>
        </hgroup>

        <div className='Welcome-news'>
        </div>
      </div>
    );
  }
}