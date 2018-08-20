import React, { Component } from 'react';
import 'whatwg-fetch';

class User extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.id)
    this.state = {
      user: {}
    };
  }
  
  componentDidMount() {
    fetch('/api/user/'+this.props.match.params.id)
      .then(res => res.json())
      .then(user => {
        this.setState({user: user[0]});
      });
  }


  render() {
    const user = this.state.user;
    if(user) {
      return (
        <div>
    
          <h3>profile picture:</h3> 
          
          <img className="img-fluid" src={window.location.origin+'/api/image/'+user.id} />              
          
          <h3>name</h3>
          <h4>{user.name}</h4>
          <h3>desc</h3>
          <h4>{user.desc}</h4>
        </div>
      );
    }
    else {
      return (
        <div>
        user not found 
        </div>
      )
    }

  }
}

export default User;
