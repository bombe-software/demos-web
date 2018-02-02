import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import updateUsuario from '../../queries/updateUsuario';


class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: 'jaiba',
      imgAvatar: ['selected', 'none', 'none', 'none']
    };
    this.updateJaiba = this.updateJaiba.bind(this);
    this.updateAnguila = this.updateAnguila.bind(this);
    this.updateChivo = this.updateChivo.bind(this);
    this.updateErizo = this.updateErizo.bind(this);
    this.setState = this.setState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  updateJaiba() {
    this.setState({
      avatar: "jaiba",
      imgAvatar: ['selected', 'none', 'none', 'none']
    })
  }
  updateAnguila() {
    this.setState({
      avatar: "anguila",
      imgAvatar: ['none', 'selected', 'none', 'none']
    })
  }
  updateChivo() {
    this.setState({
      avatar: "chivo",
      imgAvatar: ['none', 'none', 'selected', 'none']
    })
  }
  updateErizo() {
    this.setState({
      avatar: "bussines",
      imgAvatar: ['none', 'none', 'none', 'selected']
    })
  }
  async onSubmit(values) {
    const {id, nombre, password} = this.props;
    const avatar = this.state.avatar;
    console.log(id, nombre, avatar);
    this.props.mutate({
      variables: {
        id, nombre, password, avatar
      }
    }).then(alert('Informacion enviada'));
    location.reload();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="level">
          <div className="level-item has-text-centered">
            <label>
              <input type="radio" name="imagen" />
              <img src="./assets/img/jaiba.svg" className={this.state.imgAvatar[0] + " image is-64x64"} width="100px" height="100px" onClick={this.updateJaiba} />
            </label>
          </div>
          <div className="level-item has-text-centered">
            <label>
              <input type="radio" name="imagen" />
              <img src="./assets/img/anguila.svg" className={this.state.imgAvatar[1] + " image is-64x64"} width="100px" height="100px" onClick={this.updateAnguila} />
            </label>
          </div>
          <div className="level-item has-text-centered">
            <label>
              <input type="radio" name="imagen" />
              <img src="./assets/img/chivo.svg" className={this.state.imgAvatar[2] + " image is-64x64"} width="100px" height="100px" onClick={this.updateChivo} />
            </label>
          </div>
          <div className="level-item has-text-centered">
            <label>
              <input type="radio" name="imagen" />
              <img src="./assets/img/hedgehog.svg" className={this.state.imgAvatar[3] + " image is-64x64"} width="100px" height="100px" onClick={this.updateErizo} />
            </label>
          </div>
        </div>
        <div className="buttons">
          <button type="submit">
            Submit
                          </button>
        </div>
      </form>
    );
  }
}
export default graphql(updateUsuario)(Avatar);