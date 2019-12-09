import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
import { alertActions } from './actions';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: true
        }

        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear)
        });
    }

    hideAlert() {
        this.setState({
            isActive: false,
        });
    }

    render() {
        const { alert } = this.props;
        const { type, message } = alert;

        return (
            <div className="container">
                <div className="col-sm-8 col-sm-offset-2">
                    {this.state.isActive && alert.message &&
                        <div className={`alert ${type}`}>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="alert"
                                aria-label="Close"
                                onClick={() => this.hideAlert()}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            {message}</div>}
                    <Router history={history}>
                        <div>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(App);
