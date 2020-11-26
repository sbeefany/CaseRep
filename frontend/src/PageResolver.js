import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Projects from './Projects/Projects';

class PageResolver extends React.Component {
  getUserStartPage = (role) => {
     if (role === 'Системный аналитик') return <Projects/>;
  };

  render() {
    const { role, isAuth } = this.props;
    if (!isAuth) return <Redirect to={'/login'} />;
    const Component = this.getUserStartPage(role);
    return Component;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.AuthReducer.isAuth,
  role: state.AuthReducer.position,
});

export default connect(mapStateToProps)(PageResolver);