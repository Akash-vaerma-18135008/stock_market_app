import React, { PureComponent } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class Home extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            token: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async handleSubmit(evt){
        try{
            evt.preventDefault();

            let body = {
                email: this.state.email,
                password: this.state.password
            }
            
            let response = await axios.post(
              "http://127.0.0.1:8000/api/v1/users/login",
              body
            );
            let token = response.data.token;
            console.log(token);
            this.setState({
                token: token
            });
        }catch(err){
            alert("unauthorised!");
        }
    }
    handleChange(evt){
        evt.preventDefault();
        this.setState({
            [evt.target.name] : evt.target.value 
        })
    }

    render() {
        console.log(document.cookie);
        return (
          <div>
            <h1 className="mb-5">Hey! This is home page</h1>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="email">Email</label>
                <input onChange={this.handleChange} required type="email" id="email" name="email"></input>
                <label htmlFor="password">password</label>
                <input onChange={this.handleChange} required type="password" id="password" name="password"></input>
                <button type="submit">Login</button>
            </form>
          </div>
        );
    }
}

export default Home