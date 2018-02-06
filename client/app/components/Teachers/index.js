import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Tag } from 'antd';
import './index.less';

export default class Teachers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const domain = this.constructor.name;
    const teachers = [
      {
        name: 'Vincent Wen',
        last_active: '2018/01/01',
        majors: ['建筑', '景观'],
        introduction: 'placeholder placeholder placeholder placeholder'
      }
    ]

    return (
      <div className={domain}>
        <Layout>
          <Layout.Sider width='300'>
          </Layout.Sider>

          <Layout.Content>
            {
              teachers.map((teacher, index) => {
                return (
                  <div className={`${domain}-teacher App-tile`}>
                    <Row type='flex'>
                      <Col className={`${domain}-profile`}>
                        <div className='placeholder-img'></div>
                        <h3>{teacher.name}</h3>
                      </Col>

                      <Col className={`${domain}-info`}>
                        {
                          teacher.majors.map((major, index) => {
                            return <Tag>{major}</Tag>
                          })
                        }
                        <p className={`${domain}-intro`}>{teacher.introduction}</p>
                        <p className={`${domain}-active`}>{teacher.last_active}</p>
                        <Button type='primary'>预约</Button>
                      </Col>
                    </Row>
                  </div>
                )
              })
            }
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}