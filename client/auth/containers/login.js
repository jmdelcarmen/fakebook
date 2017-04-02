import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

class LoginForm extends Component {
  onLogin = (e) => {
    e.preventDefault();
    const user = {
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    this.props.loginUser(user);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onLogin}>
          <div className="form-group">
            <label>Email or Phone</label>
            <input ref="email" type="text" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref="password" type="password" />
            <a href="#" className="forgot-password">Forgot account?</a>
          </div>
          <button>Log In</button>
        </form>
        <small className="login-error">
            {this.props.auth.error ? `* ${this.props.auth.error}` : ''}
        </small>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, actions)(LoginForm);
