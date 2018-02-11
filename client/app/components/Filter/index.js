import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Tag, Checkbox, Select } from 'antd';
import Components from 'components';
import './index.less';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const filters = [
      {
        name: '专业',
        options: [
          {
            label: '平面',
            value: 'plain',
          },
          {
            label: '服装',
            value: 'costume',
          },
          {
            label: '室内',
            value: 'interior',
          },
          {
            label: '工业',
            value: 'industry',
          },
          {
            label: '建筑',
            value: 'architecture',
          },
        ]
      }
    ];

    return (
      <div className='Filter'>
        {
          filters.map((filter, index) => {
            return (
              <section key={index}>
                <h3>{filter.name}</h3>
                <Checkbox.Group options={filter.options}></Checkbox.Group>
              </section>
            )
          })
        }
      </div>
    )
  }
}