import React from 'react'
import { Layout, Button, Row, Col, Tag, Modal } from 'antd'
import { Filter, Teacher } from 'components'

export default class Teachers extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    expand: false,
    teachers: [],
    teacher: {}
  }
  openTeacher = (teacher_id) => {
    this.setState({
      expand: true,
      teacher: this.state.teachers[teacher_id] 
    })
  }
  handleOk = (e) => {
    this.setState({
      expand: false,
    })
  }
  closeTeacher = (e) => {
    this.setState({
      expand: false,
    })
  }
  componentDidMount() {
  }
  render() {
    return (
      <Layout>
        <Modal
          title={this.state.teacher.name}
          footer={null}
          width={800}
          visible={this.state.expand}
          onCancel={this.closeTeacher}
        >
          <Teacher type='detail' teacher={this.state.teacher} />
        </Modal>
        <Layout.Sider width='300'>
          <Filter />
        </Layout.Sider>

        <Layout.Content style={{marginTop: '-10px'}}>
          <Row>
            {
              this.state.teachers.map((teacher, index) =>
                (
                  <Col key={index}>
                    <div className='App-tile' onClick={() => this.openTeacher(teacher.id)}>
                      <Teacher type='overall' teacher={teacher} />
                    </div>
                  </Col>
                )
              )
            }
          </Row>
        </Layout.Content>
      </Layout>
    )
  }
}