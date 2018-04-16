import React from 'react'
import { Checkbox, Select, Radio } from 'antd'
import { Request } from 'utils'
import './index.less'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount = async () => {
    // get cities and provinces list
    let res = await window.fetch('/cities/CN/cities.json')
    const cities = await res.json()
    this.setState({ cities })

    res = await window.fetch('/cities/CN/provinces.json')
    const provinces = await res.json()
    this.setState({ provinces })

    res = await window.fetch('/countries.json')
    const countries = await res.json()
    this.setState({ countries })
  }
  defaultFilters = {
    majors: [],
    cost: '',
    role_id: 'teacher',
    gender: [0, 1],
  }
  state = {
    cities: [],
    provinces: [],
    countries: [],
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
  onChangeSelect = (type) => {
    return async (e) => {
      if (!e) {
        this.setState({ filters: delete this.state.filterValues[type] })
      } else {
        this.setState({ filters: Object.assign(this.state.filterValues, { [type]: e }) })
      }
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
      label: '申请专业',
      id: 'majors',
      filter: this.props.majors.map(item => {
        return { label: item.label, value: item.id }
      })
    }, {
      label: '老师性别',
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
          <h4>申请国家</h4>
          <Select 
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            className='Filter-Select'
            placeholder='申请国家'
            onChange={this.onChangeSelect('country')}
          >
            <Select.Option value=''>不限</Select.Option>
            {
              this.state.countries.map((country, index) => {
                return <Select.Option key={index} value={country.code}>{country.cn}</Select.Option>
              })
            }
          </Select>
        </section>

        <section>
          <h4>所在城市</h4>
          <Select 
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            className='Filter-Select'
            placeholder='老师当前所在地'
            onChange={this.onChangeSelect('city')}
          >
            <Select.Option value=''>全国</Select.Option>
            {
              this.state.provinces.map((province, index) => {
                return (
                  <Select.OptGroup label={province.name} key={index}>
                    {
                      this.state.cities.map((city, ind) => {
                        if (province.code === city.provinceCode) {
                          return <Select.Option key={ind} value={city.code}>{city.name}</Select.Option>
                        }
                      })
                    }
                  </Select.OptGroup>
                )
              })
            }
          </Select>
        </section>

        <section>
          <h4>价格排序</h4>
          <Radio.Group options={[{ label: '由低到高', value: 'ASC' }, { label: '由高到低', value: 'DESC' }]} onChange={this.onChangeCost}/>
        </section>
      </div>
    )
  }
}