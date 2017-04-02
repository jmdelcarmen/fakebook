import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import actions from '../../actions';
import { DaysSelect, MonthsSelect, YearsSelect } from '../../util-components';

class SignUp extends Component {
    onSignUp = (newUser) => {
        const { resetForm, signUpUser } = this.props;
        signUpUser(newUser);
        resetForm();
    }
    renderSignUpError()  {
        const { auth, submitFailed } = this.props;
        return auth.error && submitFailed
            ? <div className="error">{auth.error}</div>
            : '';
    }
  render() {
      const {
          fields: { firstName, lastName, email, confirmEmail, password, bmonth, bday, byear, sex },
          handleSubmit
      } = this.props;
      console.log(this.props);
    return (
      <div className="signup">
        <h1>Create a New Account</h1>
        <span>Its free and always will be</span>
          {this.renderSignUpError()}
        <form onSubmit={handleSubmit(this.onSignUp)}>
          <div className="form-group">
              {firstName.touched && firstName.error && <div className="error">{firstName.error}</div>}
            <input {...firstName} type="text" placeholder="First name" className="form-control"/>
              {lastName.touched && lastName.error && <div className="error">{lastName.error}</div>}
            <input {...lastName} type="text" placeholder="Last name" className="form-control"/>
          </div>
          <div className="form-group">
              {email.touched && email.error && <div className="error">{email.error}</div>}
            <input {...email}  type="email" placeholder="Mobile number or email" className="form-control"/>
              {confirmEmail.touched && confirmEmail.error && <div className="error">{confirmEmail.error}</div>}
            <input {...confirmEmail} type="email" placeholder="Re-enter email" className="form-control"/>
          </div>
          <div className="form-group">
              {password.touched && password.error && <div className="error">{password.error}</div>}
            <input {...password} type="password" placeholder="New password" className="form-control" />
          </div>
          <div className="form-group bday">
            <label>Birthday</label>
            <MonthsSelect {...bmonth} />
            <DaysSelect {...bday}/>
            <YearsSelect {...byear}/>
          </div>
          <div className="form-group sex">
          <label>
              {sex.touched && sex.error && <div className="error">{sex.error}</div>}
            <input checked="true" {...sex} name="sex" value="female" type="radio" />
            <span>Female</span>
          </label>
          <label>
            <input {...sex} name="sex" value="male" type="radio" />
            <span>Male</span>
          </label>
          </div>
          <span>Terms and conditions...</span>
          <button>Create Account</button>
        </form>
      </div>
    );
  }
}
const validate = (fields) => {
    const errors = {};
    for (let field in fields) {
        if (!fields[field]) {
            if (field === 'confirmEmail') {
                errors[field] = `* Please confirm your email`;
            }
            else if(field === 'email') {
                errors[field] = `* Please provide a valid ${field.toLowerCase()}`;
            }
            else if(field === 'sex') {
                errors[field] = `* Please choose your gender`;
            }
            else {
                errors[field] = `* Please provide a ${field.toLowerCase()}`;
            }
        }
    }
    if (fields.email !== fields.confirmEmail) {
        errors.email = '* Your emails must match';
    }
    return errors;
};

const mapStateToProps = (state) => ({ form: state.form, auth: state.auth });
export default reduxForm({
    form: 'signup',
    fields: [ 'firstName', 'lastName', 'email', 'confirmEmail', 'password', 'bmonth', 'bday', 'byear', 'sex' ],
    validate
}, mapStateToProps, actions)(SignUp);