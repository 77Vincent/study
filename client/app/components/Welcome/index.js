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
    const domain = this.constructor.name;
    const placeholder = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
    const promote = ['Why Here', 'Testimonial', 'Contact Us'];

    return (
      <div className={domain}>
        <div className={`${domain}-intro`}>
          <div className='App-background-image'></div>

          <div className={`${domain}-slogan`}>
            <h1>
                We expertize in overseas studying<br/>
                Get the right tutor you need<br/>
                Share the knowledge you have
            </h1>
            <p>{placeholder}</p>
          </div>

          <div className={`${domain}-action`}>
            <Button size='large'>
              <Link to='/orientation' >Find a tutor</Link>
            </Button>

            <Button size='large'>
              <Link to=''>Be a tutor</Link>
            </Button>
          </div>
        </div>

        <div className={`${domain}-news`}>
          {
            promote.map((item, index) => {
              return <section key={index}> <h1>{item}</h1> <p>{placeholder}</p> </section>;
            })
          }
        </div>
      </div>
    );
  }
}