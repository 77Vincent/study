import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './index.less';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Temp variables
    const placeholder = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
    const promote = ['Why Here', 'Testimonial', 'Contact Us'];

    return (
      <div className='Welcome'>
        <div className='intro'>
          <div className='slogan'>
            <h1>
                We expertize in overseas studying<br/>
                Get the right tutor you need<br/>
                Share the knowledge you have
            </h1>
            <p>{placeholder}</p>
          </div>

          <div className='action'>
            <Button size='large'>
              <Link to='/orientation' >Find a tutor</Link>
            </Button>

            <Button size='large'>
              <Link to=''>Be a tutor</Link>
            </Button>
          </div>
        </div>

        <div className='promote'>
          {
            promote.map((item, index) => {
              return <div key={index} className='sub-promote'> <h1>{item}</h1> <p>{placeholder}</p> </div>;
            })
          }
        </div>
      </div>
    );
  }
}