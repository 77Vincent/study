import React from 'react';
import { Spin } from 'antd';
import './index.less';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.visibility ? 
            <div className='Loading-wrapper'>
              <Spin size='large'/>
            </div> : null  
        }
      </div>
    )
  }
};
