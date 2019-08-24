
import React from 'react';

// 用于存放每个倒计时的回调方法
const countDownFuncList: any = {};
 
const addFunc = (key: string, func: any, _this: object) => {
    countDownFuncList[key] = [];
    countDownFuncList[key][0] = _this;
    countDownFuncList[key][1] = func;
}

const removeFunc = (key: string) => {
    delete countDownFuncList[key];
}
 
const timeContent = (millisecond: number) => {
    const second = millisecond / 1000;
    let d = Math.floor(second / 86400);
    let h = Math.floor((second % 86400) / 3600);
    let m = Math.floor(((second % 86400) % 3600) / 60);
    let s = Math.floor(((second % 86400) % 3600) % 60);
    if(d > 0){
        return (
            <span>
                {d}:{h}:{m}:{s}
            </span>
        );
    }else{
        return (
            <span>
                {h}:{m}:{s}
            </span>
        );
    }


}
 
let intervalHandler: any = -1;

const countDown = () => {
    if (intervalHandler !== -1) {
        clearInterval(intervalHandler);
    }
    intervalHandler = setInterval(() => {
        const now = new Date();
        Object.keys(countDownFuncList).forEach((key) => {
            const item = countDownFuncList[key][1];
            const _this = countDownFuncList[key][0];

            if (typeof item === 'function') {
                
                item.call( _this, now);
            }
        })
    }, 1000);
}
 
countDown();
 
class CountDownItem extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentTime: this.props.nowDate
        }
 
        this.parseDisplayTime = this.parseDisplayTime.bind(this);
    }
 
    componentDidMount() {
        const { id } = this.props;
        // 往事件列表添加回调函数
        addFunc(id, this.updateTime, this);
    }
 
    componentWillUnmount() {
        const { id } = this.props;
        // 从事件列表移除回调函数
        removeFunc(id);
    }
 
    updateTime(time: any) {

        this.setState({
            currentTime: time
        })
    }
 
    parseDisplayTime() {
        const { endTime, id } = this.props;
        const { currentTime } = this.state;
        const subtractTime = endTime -  currentTime;
        let countDownDOM: any = '';
        if(subtractTime > 1000){
            countDownDOM = (
                <p className="count-down-content c-nomb">
                    {timeContent(subtractTime)}
                </p>
            );
        }else{
            countDownDOM = (
                <p style={{margin: "0"}}>已到期</p>
            )
            removeFunc(id);
        }
 
        return countDownDOM;
    }
 
    render(){
        return(
            <div className="count-down-wrap">{this.parseDisplayTime()}</div>
        );
    }
}

export default CountDownItem;