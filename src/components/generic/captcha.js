import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import RaisedButton from 'material-ui/RaisedButton'
import Menu from 'material-ui/Menu';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';

class Captcha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null
        };
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClose() {
        this.setState({ open: false });
    };

    handleClick(event) {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };


    async onChange(value) {
        this.handleClose();
        this.props.checkedFunction();
    }

    render() {
        return (
            <div>
                <RaisedButton
                    onClick={this.handleClick}
                    label="Borrar"
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    animation={PopoverAnimationVertical}
                    style={{ height: '75px', width: '300px' }}
                >
                    <ReCAPTCHA
                        ref="recaptcha"
                        sitekey="6LdPo00UAAAAAAZJmBZt2LAFq8rmgDcKFzUW4uLA"
                        onChange={this.onChange}
                    />
                </Popover>
            </div >
        );
    }
}


export default Captcha;