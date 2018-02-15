import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import likeGQL from './../../../mutations/like';
import dislikeGQL from './../../../mutations/dislike';
import _ from 'lodash';

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

    componentDidMount() {
        const { likes } = this.props;
        const isLiked = _.map(likes, 'id').indexOf(this.props.id_usuario) >= 0;
        this.setState({ count: likes.length, isLiked });
    }

    onLike() {
        const { id_propuesta, id_usuario } = this.props;
        console.log("like");
        this.props.mutateLike({
            variables: { id_propuesta, id_usuario }
        }).then(response => this.setState({ isLiked: true, count: response.data.like_propuesta.likes.length }));
    }

    onDislike() {
        const { id_propuesta, id_usuario } = this.props;
        console.log("dislike");
        this.props.mutateDislike({
            variables: { id_propuesta, id_usuario }
        }).then(response => {
                if (response.data.like_propuesta != undefined) {
                    this.setState({ isLiked: false, count: response.data.like_propuesta.likes.length })
                } else {
                    this.setState({ isLiked: false, count: 0 })
                }
            });
    }

    render() {
        return (
            <div>
                {this.state.count}
                <a onClick={this.state.isLiked ? this.onDislike : this.onLike}>
                    <i className={this.state.isLiked ? "fa fa-thumbs-up" : "fa fa-thumbs-o-up"} aria-hidden="true"></i>
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