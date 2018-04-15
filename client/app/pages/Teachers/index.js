import React from 'react'
import { Layout, Button, Row, Col, Tag, Modal } from 'antd'
import { Filter, TeacherPreview } from 'components'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  state = { teachers: [] }
  componentDidMount = async () => {
    const res = await fetch( '/api/users?role_id=teacher')
    if (res.status === 200) {
      const data = await res.json()
      this.setTeachers(data)
    }
  }
  setTeachers = (teachers) => this.setState({ teachers })
  render() {
    return (
      <Layout>
        <Layout.Sider width='300'>
          <Filter majors={this.props.majors} setTeachers={this.setTeachers}/>
        </Layout.Sider>

        <Layout.Content style={{marginTop: '-10px'}}>
          <Row>
            {
              this.state.teachers.map((teacher, index) =>
                (
                  <Col key={index}>
                    <div className='App-tile'>
                      <TeacherPreview teacher={teacher} />
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