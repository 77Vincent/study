import React from 'react';
import { Spin } from 'antd';
import './index.less';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const domain = this.constructor.name;

    return (
      <div>
        {
          this.props.visibility ? 
            <div className={`${domain}-Wrapper`}>
              <Spin size='large'/>
            </div> : null  
        }
      </div>
    )
  }
};
