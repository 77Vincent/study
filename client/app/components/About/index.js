import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fooDuck } from 'ducks';

class About extends React.Component {
  constructor(props){
    super(props);
    this.props.fooActions.callFoo();
  }
  render(){
    return (
      <div className='About'>
      </div>
    );
  }
}

About.propTypes = {
  foo: PropTypes.object,
  fooActions: PropTypes.object,
};

const mapStateToProps = state => ({
  foo: state.foo,
});

const mapDispatchToProps = dispatch => ({
  fooActions: bindActionCreators(fooDuck.creators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
