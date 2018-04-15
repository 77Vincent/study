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
    filterValues: this.defaultFilters
  }
  onChangeFilter = (id) => {
    return async (e) => {
      this.setState({ filters: Object.assign(this.state.filterValues, { [id]: e }) })
      const res = await Request.getUser(this.state.filterValues)
      const data = await res.json()
      this.props.setTeachers(data)
    }
  }
  onChangeCost = async (e) => {
    this.setState({ filters: Object.assign(this.state.filterValues, { cost: e.target.value }) })
    const res = await Request.getUser(this.state.filterValues)
    const data = await res.json()
    this.props.setTeachers(data)
  }
  render() {
    const filters = this.props.majors && [{
      label: '专业',
      id: 'majors',
      filter: this.props.majors.map(item => {
        return { label: item.label, value: item.id }
      })
    }, {
      label: '性别',
      id: 'gender',
      filter: [{ label: '先生', value: 1 }, { label: '女士', value: 0 }]
    }, {
      label: '上课方式',
      id: 'place',
      filter: [{ label: '线上', value: 'online' }, { label: '线下', value: 'offline' }]
    }]

    return (
      <div className='Filter'>
        {
          filters && filters.map((filter, index) => {
            return (
              <section key={index}>
                <h4>{filter.label}</h4>
                <Checkbox.Group options={filter.filter} onChange={this.onChangeFilter(filter.id)}/>
              </section>
            )
          })
        }
        <section>
          <h4>价格排序</h4>
          <Radio.Group options={[{ label: '由低到高', value: 'ASC' }, { label: '由高到低', value: 'DESC' }]} onChange={this.onChangeCost}/>
        </section>
      </div>
    )
  }
}