import React, { Component } from 'react';
import 'whatwg-fetch';



class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changed: false,
      user: {},
      image: {}
    };
    
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.uploadPic = this.uploadPic.bind(this);
    
  }

  handleNameChange(event) {
    let user = {...this.state.user}
    user.name = event.target.value;
    this.setState({user, changed: true})
  }
  
  handleDescChange(event) {
    let user = {...this.state.user}
    user.desc = event.target.value;
    this.setState({user,  changed: true})
  } 
  
  fileChangedHandler(event) {
    const image = event.target.files[0];
    // user.image = image
    console.log("image", image);
    this.setState({image})
  
  }
  
  uploadPic(event) {
    
    const formData = new FormData()
    formData.append('image', this.state.image)
    console.log('form', formData);
    const requestOptions = {
      method: 'POST',
      body: formData,
      credentials: 'same-origin'
    };
    
    // technecly i could just do 1 because there is only 1 user
    fetch('/api/image/'+this.state.user.id, requestOptions)
      .then(res => {
        console.log('made it boyzzz', res)
        // this.setState({image: {}})
      })
      .catch((err) => console.error(err));
  }
  
  
  changeUser(event) {
    if(this.state.changed) {
      let user = JSON.stringify({user: this.state.user})
      console.log(user);
      fetch('/api/user/'+this.state.user.id, { 
        headers:{
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: user
      })
        .then(res => {
          console.log('made it boyzzz', res)
          this.setState({changed: false})
        })
        .catch((err) => console.error(err));
    }
    
  }
  componentDidMount() {
    // this would use a cookie if there were more then 1 user
    fetch('/api/me')
      .then(res => res.json())
      .then(user => {
        this.setState({user: user[0]});
      });
  }

  render() {
    return (
      <main className="col-md-3 container">
        <form>
          <div className="form-group">
            <label htmlFor="name h3">Name: </label>
            <br />
            <input className="form-group" type="text" value={this.state.user.name} onChange={this.handleNameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description of yourself: </label>
            <br />
            <input className="form-group" type="text" value={this.state.user.desc} onChange={this.handleDescChange} />
          </div>
          <button className="btn btn-primary" onClick={this.changeUser} disabled={!this.state.changed}> 
            Save! 
          </button>
        </form>
        <br />
          
        <h3>profile picture:</h3> 
        <img className="img-fluid" src={window.location.origin+'/api/image/1'} />              

        <div className="form-group">
          <input type="file" onChange={this.fileChangedHandler} />
        </div>
        <button  className="btn btn-primary"  onClick={this.uploadPic} disabled={!this.state.image}> 
          Upload Pic! 
        </button>
      </main>
    );
  }
}

// <label htmlFor="picture">upload new picture</label>
export default Home;
