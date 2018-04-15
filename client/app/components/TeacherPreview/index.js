import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Layout, Button, Row, Col, Tag } from 'antd'
import './index.less'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const teacher = this.props.teacher
    const brief = teacher.bio.length <= 50 ? teacher.bio : `${teacher.bio.slice(0, 50)}...`

    return (
      <div className='Teacher-Preview'>
        <h2>{teacher.name}</h2>
        <p>{brief}</p>

        <Icon type='heart' className='btn-like' />
        <Button className='btn-learn' size='large' type='primary'>跟ta学习</Button>
      </div>
    )
  }
}
