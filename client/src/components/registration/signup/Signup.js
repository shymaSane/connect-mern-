import React, { Component } from 'react'
import TextInputGroup from '../TextInputGroup'

class Signup extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
   
    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
    }
    render() {
        const{name, email, password, password2} = this.state
        return (
            <form onSubmit = {this.handleSubmit}>
                <TextInputGroup 
                    label = 'Name:'
                    name = 'name'
                    type = 'text'
                    placeholder = 'Please enter your name'
                    value = {name}
                    onChange = {this.onChange}
                />
                <TextInputGroup 
                    label = 'Email:'
                    name = 'email'
                    type = 'email'
                    placeholder = 'Please enter your E-mail'
                    value = {email}
                    onChange = {this.onChange}
                />
                <TextInputGroup 
                    label = 'Password:'
                    name = 'password'
                    type = 'password'
                    placeholder = 'Please enter your password'
                    value = {password}
                    onChange = {this.onChange}
                />
                <TextInputGroup 
                    label = 'Confirm Password:'
                    name = 'password2'
                    type = 'password'
                    placeholder = 'Please confirm your password'
                    value = {password2}
                    onChange = {this.onChange}
                />
                <input type="submit" name="Submit" value="Register" />
            </form>
        )
    }
}

export default Signup
