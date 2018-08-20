import React, { Component } from 'react';
import 'whatwg-fetch';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }
  
  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        this.setState({users});
      });
  }


  render() {
    const users = this.state.users;
    const listItems = users.map((user) => {
      console.log('users', user);
      return (<li key={user.id}>name: <a href={`/user/${user.id}`}> {user.name}</a> desc: {user.desc}</li>)
    });
    return (
      <div>
        all users: 
        <ol>{listItems}</ol>,
      </div>
    );
  }
}

export default Users;
