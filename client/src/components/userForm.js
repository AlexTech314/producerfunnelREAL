import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addUserMutation } from '../queries/queries';
import { flowRight as compose } from 'lodash';
import axios from 'axios';

class userForm extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
        }
    };

    componentDidMount() {
    }

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        })
    };

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        })
    };

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    };

    onSubmit(e) {
        e.preventDefault();
        console.log("suck me");
        console.log(this.state);
    
        this.props.addUserMutation({
            variables: {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
            }
        });




    }

    render() {
        return (
            <form onSubmit={this.onSubmit}> 
                <label>FIRSTNAME:</label>
                <input id="firstname-submit" type="text" value={this.state.firstname} onChange={this.onChangeFirstname} />
                <br />
                <label>LASTNAME:</label>
                <input id="lastname-submit" type="text" value={this.state.lastname} onChange={this.onChangeLastname} />
                <br />
                <label>EMAIL:</label>
                <input id="email-submit" type="text" value={this.state.email} onChange={this.onChangeEmail} />
                <br />
                <input id="getbeats-submit" type="submit" />
            </form>
        );
    }
}

export default compose(
    graphql(addUserMutation, { name: "addUserMutation"})
)(userForm)