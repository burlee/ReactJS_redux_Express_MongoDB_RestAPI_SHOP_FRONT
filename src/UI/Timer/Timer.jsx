import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/pl';

export default class Timer extends Component {
    state = {
        time: moment().format('LTS')
    };

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {
        moment.locale('pl');

        this.setState({
            time: moment().format('LTS')
        });
    }


    render() {
        return (
            <div>
                {this.state.time}
            </div>
        )
    }
}
