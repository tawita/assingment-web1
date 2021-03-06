import React from 'react'
import auth from '../firebase'
import axios from 'axios';
import _ from 'lodash';
const URL = 'https://us-central1-react-database-ceb9d.cloudfunctions.net/api/Tawita';
class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      message: '',
      currentUser: null,
      eyes: []
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user
        })
      }
    })
    axios.get(URL)
    .then(res => {
      this.setState({ eyes: res.data })
      console.log(res.data)
    })
  }

  onChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const { email, password } = this.state
    auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          currentUser: response.user
        })
      })
      .catch(error => {
        this.setState({
          message: error.message
        })
      })
  }

  logout = e => {
    e.preventDefault()
    auth.signOut().then(response => {
      this.setState({
        currentUser: null
      })
    })
  }

  render() {
    const { message, currentUser} = this.state
    if (currentUser) {
      return _.map(this.state.eyes, eye => {
         return (
        <div>
          <p>Subject</p>
          <p>{eye.Subject}</p>
          <p>{eye.id}</p>
          <button onClick={this.logout}>ok</button>
        </div>
      )
      }) 
     
    }

    return (
      <section className="section container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form onSubmit={this.onSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              {message ? <p className="help is-danger">{message}</p> : null}

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Submit</button>
                </div>
                <div className="control">
                  <button className="button is-text">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default LoginForm
