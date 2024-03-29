import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userActions } from '../actions';
import '../style/LoginPage.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            username: '',
            password: '',
            submitted: false,
            alert: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    componentWillReceiveProps(nextProps) {
        const { alert } = this.state;
        this.setState({ alert: { ...alert, ...nextProps.alert } });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        return (username && password) ?
            (dispatch(userActions.login(username, password))) :
            '';
    }

    render() {
        const { username, password, submitted, alert } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                {alert ?
                    <div className={`alert ${alert.type}`} role="alert">{alert.message}</div> : ''
                }
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        <Link className="register-link" to="/register">Register</Link>
                    </div>

                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        alert
    }
}

export default connect(mapStateToProps)(LoginPage);

