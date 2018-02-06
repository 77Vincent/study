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
        cost: 300,
        majors: ['建筑', '景观'],
        introduction: '金吉列留学，国内出国留学咨询服务机构，涵盖出国留学，签证移民等频道，提供全方位的美国留学，加拿大留学和英国留学等各国最全面的留学费用、留学条件、留学生活、留学名校、移民签证等权威资讯，打造国内专业出国留学服务平台。'
      },
      {
        name: 'Vincent Wen',
        last_active: '2018/01/01',
        cost: 300,
        majors: ['建筑', '景观'],
        introduction: '金吉列留学，国内出国留学咨询服务机构，涵盖出国留学，签证移民等频道，提供全方位的美国留学，加拿大留学和英国留学等各国最全面的留学费用、留学条件、留学生活、留学名校、移民签证等权威资讯，打造国内专业出国留学服务平台。'
      },
      {
        name: 'Vincent Wen',
        last_active: '2018/01/01',
        cost: 300,
        majors: ['建筑', '景观'],
        introduction: '金吉列留学，国内出国留学咨询服务机构，涵盖出国留学，签证移民等频道，提供全方位的美国留学，加拿大留学和英国留学等各国最全面的留学费用、留学条件、留学生活、留学名校、移民签证等权威资讯，打造国内专业出国留学服务平台。'
      },
      {
        name: 'Vincent Wen',
        last_active: '2018/01/01',
        cost: 300,
        majors: ['建筑', '景观'],
        introduction: '金吉列留学，国内出国留学咨询服务机构，涵盖出国留学，签证移民等频道，提供全方位的美国留学，加拿大留学和英国留学等各国最全面的留学费用、留学条件、留学生活、留学名校、移民签证等权威资讯，打造国内专业出国留学服务平台。'
      },
      {
        name: 'Vincent Wen',
        last_active: '2018/01/01',
        cost: 300,
        majors: ['建筑', '景观'],
        introduction: '金吉列留学，国内出国留学咨询服务机构，涵盖出国留学，签证移民等频道，提供全方位的美国留学，加拿大留学和英国留学等各国最全面的留学费用、留学条件、留学生活、留学名校、移民签证等权威资讯，打造国内专业出国留学服务平台。'
      },
    ]

    return (
      <div className={domain}>
        <Layout>
          <Layout.Sider width='300' className={`${domain}-Sider`}>
          </Layout.Sider>

          <Layout.Content className={`${domain}-Content`}>
            <Row gutter='20'>
              {
                teachers.map((teacher, index) => {
                  return (
                    <Col span='12'>
                      <div className={`${domain}-teacher App-tile`}>
                        <Row type='flex'>
                          <Col className={`${domain}-profile`}>
                            <div className='placeholder-img'></div>
                            <h3>{teacher.name}</h3>
                            <strong>{teacher.cost}/小时</strong>
                          </Col>

                          <Col className={`${domain}-info`}>
                            {
                              teacher.majors.map((major, index) => {
                                return <Tag>{major}</Tag>
                              })
                            }
                            <p className={`${domain}-active`}>上次在线：{teacher.last_active}</p>
                            <p className={`${domain}-intro`}>{teacher.introduction}</p>
                            <Button type='primary'>预约</Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  )
                })
              }
            </Row>
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}