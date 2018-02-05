import React from 'react';
import { Link } from 'react-router-dom';
import { Radio } from 'antd';
import fetch from 'isomorphic-fetch';
import './index.less';

export default class Orientation extends React.Component{
  constructor(props) {
    super(props);
  }

  state = {
    value: 1,
  }

  questions = [
    {
      title: '目的',
      content: ['冲击大牛', '出国深造', '兴趣爱好'] 
    },
    {
      title: '申请学位',
      content: ['预科', '本科', '研究生'] 
    },
    {
      title: '专业',
      content: ['预科', '本科', '研究生'] 
    },
  ]

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <div className='Orientation'>
        {
          this.questions.map((question, question_index) => {
            return (
              <div className='' key={question_index}>
                <h3>{question.title}</h3>
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                  {
                    question.content.map((option, option_index) => {
                      return (
                        <Radio key={option_index} value={option_index}>{option}</Radio>
                      )
                    })
                  }
                </Radio.Group>
              </div>
            )
          })
        }
      </div>
    )
  }
}