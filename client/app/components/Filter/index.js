import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Button, Row, Col, Tag, Checkbox, Select, Radio, Icon } from 'antd'
import Components from 'components'
import './index.less'

export default class Filter extends React.Component {
  constructor(props) {
    super(props)
  }
  filters = [
    {
      name: '专业',
      multiple: true,
      options: [
        { 
          label: '平面',
          value: 'plain',
        }, {
          label: '服装',
          value: 'costume',
        }, {
          label: '室内',
          value: 'interior',
        }, {
          label: '工业',
          value: 'industry',
        }, {
          label: '建筑',
          value: 'architecture',
        },
      ]
    }, {
      name: '国家',
      multiple: true,
      options: [
        {
          label: '英国',
          value: 'us'
        }, {
          label: '美国',
          value: 'uk'
        },
      ]
    }, {
      name: '上课方式',
      multiple: true,
      options: [
        {
          label: '线上',
          value: '1'
        }, {
          label: '线下',
          value: '0'
        },
      ]
    }, {
      name: '导师性别',
      multiple: true,
      options: [{
        label: '男生',
        value: '1'
      }, {
        label: '女生',
        value: '0'
      }]
    }, {
      name: '区域',
      multiple: true,
      options: [{
        label: '目前所在地',
        value: '1'
      }]
    }
  ]
  sortings = [{
    name: '按价格高低',
    options: [{
      label: '由低到高',
      value: 0
    }, {
      label: '由高到低',
      value: 1 
    }]
  }]
  render() {
    return (
      <div className='Filter'>
        {
          this.filters.map((filter, index) => 
            (
              <section key={index}>
                <h4>{filter.name}</h4>
                {
                  filter.multiple ?
                    <Checkbox.Group options={filter.options} /> :
                    <Radio></Radio>
                }
              </section>
            )
          )
        }
        {
          this.sortings.map((sorting, index) => 
            (
              <section key={index}>
                <h4>{sorting.name}</h4>
                <Radio.Group options={sorting.options}/>
              </section>
            )
          )
        }
      </div>
    )
  }
}