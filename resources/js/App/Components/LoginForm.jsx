import React from 'react';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    //lets you write into the login form
    handleEmailChange = (event) => {
        this.setState ({
            email: event.target.value
        });
        
    }

    handlePasswordChange = (event) => {
        this.setState ({
            password: event.target.value
        });
    }
    //lets you submit login info
    handleFormSubmit = (event) => {
        event.preventDefault();

        fetch('api/login', {
            method: 'POST',
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json'


            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.status == 'success') {
            this.props.onLoginSuccess(data.data.token);
            }
        })
    }

    render() {
        return (
            <>
                <h1>Login form</h1>
                <form action="" method="post" onSubmit={ this.handleFormSubmit }>
                    Email:<br />
                    <input type="text" name="email" value= { this.state.email } onChange= { this.handleEmailChange }/><br />
                    Password:<br />
                    <input type="password" name="password" value= { this.state.password } onChange= { this.handlePasswordChange }/><br />
                    <input type="submit" value="Log in" />
                </form>
            </>
        )
    }
}