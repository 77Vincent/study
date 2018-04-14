import React from 'react'
import { Checkbox, Select, Radio } from 'antd'
import { Request } from 'utils'
import './index.less'

export default class Filter extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    sortings: [{
      name: '按价格高低',
      options: [{
        label: '由低到高',
        value: 0
      }, {
        label: '由高到低',
        value: 1 
      }]
    }]
  }
  onChange = async (e) => {
    const res = await Request.getUser({
      majors: e,
      role_id: 'teacher'
    })
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
            <Checkbox.Group options={majors} onChange={this.onChange}/>
          </section>
        }
        {
          this.state.sortings && this.state.sortings.map((sorting, index) => 
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