import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, Progress, Carousel } from 'antd';
import fetch from 'isomorphic-fetch';
import './index.less';

export default class Orientation extends React.Component{
  constructor(props) {
    super(props);
  }

  state = {
    progress: 0,
    answers: []
  }

  questions = [
    {
      title: '目的',
      options: ['冲击大牛', '出国深造', '兴趣爱好'] 
    },
    {
      title: '申请学位',
      options: ['预科', '本科', '研究生'] 
    },
    {
      title: '专业',
      options: ['平面设计', '服装设计', '室内设计', '工业设计', '建筑设计', '插画设计', '动画设计', '纯艺术'] 
    },
    {
      title: '申请时间',
      options: [2018, 2019, 2020, 2021, 2022] 
    },
    {
      title: '上课方式',
      options: ['家里', '公共场所', '线上', '由导师决定'] 
    },
    {
      title: '上课时间',
      options: ['', '公共场所', '线上', '由导师决定'] 
    },
  ]

  onChange = (e) => {
    this.carousel.next();

    this.setState({
      value: e.target.value,
      progress: this.state.progress + Math.ceil(100 / this.questions.length)
    });
  }

  render() {
    return (
      <div className='Orientation'>
        <h2>了解你的需求以寻找合适的导师</h2>

        <Progress type='circle' className='Orientation-Progress' percent={this.state.progress} status="active" />

        <div className='Orientation-questions'>
          <Carousel ref={c => this.carousel = c} className='Orientation-question' dots='false' effect='fade'>
            {
              this.questions.map((question, index) => {
                return (
                  <Radio.Group key={index} onChange={this.onChange}>
                    <h2>{question.title}</h2>
                    {
                      question.options.map((option, index) => {
                        return <Radio.Button key={index} value={index}>{option}</Radio.Button>
                      })
                    }
                  </Radio.Group>
                )
              })
            }
          </Carousel>
        </div>
      </div>
    )
  }
}