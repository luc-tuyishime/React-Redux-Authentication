import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../actions';

class HomePage extends Component {

    handleLogout() {
        userActions.logout();
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2 align="center">Welcome! You have successfully logged in.</h2>
                <p align="center">
                    <Link to="" onClick={this.handleLogout}>Logout</Link>
                </p>
            </div>
        );
    }
}




export default (HomePage);