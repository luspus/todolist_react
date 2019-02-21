import React, { Component } from 'react';

class Popup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            checkbox: false
        }
    }
    onChangeVal = (e) => {
        const name = e.target.name;
        let val = e.target.value;
        if(name === 'checkbox') val = !this.state.checkbox;
        this.setState({
            [name]: val
        });
    }
    onSaveUserName = () => {
        this.props.saveUserName(this.state);
    }
    render() {
        const { user } = this.state;
        return (
            <div className='popup'>
                <label htmlFor={'user'}>
                    What is your name?
                    <input type='text' name='user' className='name-inp'
                           value={user}
                           onChange={this.onChangeVal} />
                </label>
                <label htmlFor={'checkbox'}
                       className={user.length > 0 ? 'check' :'check disabled'}>
                    <input type='checkbox'
                           name='checkbox'
                           disabled={user.length > 0 ? false : true}
                           onClick={this.onChangeVal} />
                    <span>Remember me</span>
                </label>
                <input type='button' value={'Ok'} onClick={this.onSaveUserName}/>
            </div>
        );
    };
}

export default Popup;
