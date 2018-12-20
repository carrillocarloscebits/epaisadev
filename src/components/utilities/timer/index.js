import React, {Component} from 'react';
import {TextMontserrat} from 'components';

export default class Timer extends Component {

    state = {
        counter:'01:00',
        seconds: 60,
    }

    componentWillMount() {
        this.countDown()
    }

    countDown = () => {
        this.clockCall = setInterval(() => {
            this.decrementClock();
        }, 1000);
    }

    decrementClock = () => {      
        this.setState(
            (prevstate) => ({ 
                seconds: prevstate.seconds--,
                counter: '00:'+this.secondWithZero(prevstate.seconds--)
            }));
        if(this.state.seconds == 0){
            // on 00:00
            clearInterval(this.clockCall);
        }
    };

    secondWithZero = (second) => {
        return second < 10 ? '0'+second:''+second
    }

    componentWillUnmount() {
        clearInterval(this.clockCall)
    }

    render() {
        const {textStyle} = this.props;
        return (
            <TextMontserrat style={textStyle}>
                {this.state.counter}
            </TextMontserrat>
        )
    }
}
