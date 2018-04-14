import React from 'react'
import { Checkbox, Select, Radio } from 'antd'
import { Request } from 'utils'
import './index.less'

export default class Filter extends React.Component {
  constructor(props) {
    super(props)
  }
  defaultFilters = {
    majors: [],
    cost: '',
    role_id: 'teacher',
    gender: [0, 1],
  }
  state = {
    filters: this.defaultFilters
  }
  onChangeMajors = async (e) => {
    this.setState({ filters: Object.assign(this.state.filters, { majors: e }) })
    const res = await Request.getUser(this.state.filters)
    const data = await res.json()
    this.props.setTeachers(data)
  }
  onChangeCost = async (e) => {
    this.setState({ filters: Object.assign(this.state.filters, { cost: e.target.value }) })
    const res = await Request.getUser(this.state.filters)
    const data = await res.json()
    this.props.setTeachers(data)
  }
  render() {
    const majors = this.props.majors && this.props.majors.map(item => {
      return { label: item.label, value: item.id }
    })

    return (
      <div className='Filter'>
        {
          this.props.majors &&
          <section>
            <h4>专业</h4>
            <Checkbox.Group options={majors} onChange={this.onChangeMajors}/>
          </section>
        }
        <section>
          <h4>价格排序</h4>
          <Radio.Group options={[{ label: '由低到高', value: 'ASC' }, { label: '由高到低', value: 'DESC' }]} onChange={this.onChangeCost}/>
        </section>
      </div>
    )
  }
}