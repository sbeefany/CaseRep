import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Projects from './Pages/PageForAdmin/Projects';
import CurrentProject from './Pages/PageForWorkerAMain/CurrentProject';

class PageResolver extends React.Component {
  getUserStartPage = (role) => {
     if (role === 1) return <Projects/>;
     if ((role === 2) || (role === 3)) return <CurrentProject/>
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