import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import likeGQL from './../../../mutations/like';
import dislikeGQL from './../../../mutations/dislike';

class Like extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiked: false,
            count: 0
        };
        this.onLike = this.onLike.bind(this);
        this.onDislike = this.onDislike.bind(this);
    }

    componentDidMount(){
        const {likes} = this.props;
        const isLiked = this.props.id_usuario == true; 
        this.setState({count:likes.length, isLiked});
    }

    onLike(){
        const { id_propuesta, id_usuario } = this.props;
        this.props.mutateLike({
            variables: { id_propuesta, id_usuario }
        }).then(data => console.log(data));
        this.setState({ isLiked: true });
    }

    onDislike(){
        const { id_propuesta, id_usuario } = this.props;
        this.props.mutateDislike({
            variables: { id_propuesta, id_usuario }
        }).then(data => console.log(data));
        this.setState({ isLiked: false });
    }

    render(){
        return(
            <div>
                {12}
                <a onClick={this.state.isLiked ? this.onDislike : this.onLike}>
                    {console.log("some")}
                    Hola
                    <i className={this.state.isLiked ? "fa fa-thumbs-up": "fa fa-thumbs-o-up"} aria-hidden="true"></i>
                </a>
            </div>
        );
    }
}


export default compose( 
    graphql(likeGQL, {
        name: 'mutateLike'
    }),
    graphql(dislikeGQL, {
        name: 'mutateDislike'
    })
)(Like); 