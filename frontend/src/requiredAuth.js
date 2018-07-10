import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
export default ChildComponent => {
  class ComposedComponent extends Component {

    static contextTypes = {
      router: PropTypes.object
    }
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.context.router.history.push('/admin/login');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }

  return connect(mapStateToProps)(ComposedComponent);
};