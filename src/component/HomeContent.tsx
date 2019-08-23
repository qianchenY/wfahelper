import React from 'react';
import { Icon, Tag, Spin, Tooltip } from 'antd';
import { Responsive, WidthProvider } from "react-grid-layout";
import CountDownItem from './CountDown';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface IMyComponentState {
    data: any,
    loading: boolean
}

class HomeContent extends React.Component<any, IMyComponentState>{

    constructor(props: any){
        super(props);

        this.state = {
            loading: true,
            data: {}
        } 

    }

    componentDidMount(){
        fetch('https://api.warframestat.us/pc').then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            this.setState({loading: false, data: data})
        })
    }

    render(){
        if(this.state.loading){
            return (
                <Spin spinning={this.state.loading} size="large"></Spin>
            )
        }
        var layout = {
            lg: [
                {i: 'a', x: 0, y: 0, w: 4, h: 2},
                {i: 'b', x: 4, y: 0, w: 4, h: 4},
                {i: 'c', x: 8, y: 0, w: 4, h: 3},
                {i: 'd', x: 0, y: 2, w: 4, h: 2}
            ],
            md: [
                {i: 'a', x: 0, y: 0, w: 6, h: 2},
                {i: 'b', x: 6, y: 0, w: 6, h: 3},
                {i: 'c', x: 0, y: 2, w: 6, h: 2},
                {i: 'd', x: 6, y: 2, w: 6, h: 2}
            ],
            sm: [
                {i: 'a', x: 0, y: 0, w: 6, h: 2},
                {i: 'b', x: 6, y: 0, w: 6, h: 3},
                {i: 'c', x: 0, y: 2, w: 6, h: 2},
                {i: 'd', x: 6, y: 2, w: 6, h: 2}
            ],
            xs: [
                {i: 'a', x: 0, y: 0, w: 12, h: 2},
                {i: 'b', x: 0, y: 2, w: 12, h: 3},
                {i: 'c', x: 0, y: 5, w: 12, h: 2},
                {i: 'd', x: 0, y: 7, w: 12, h: 2}
            ],
            xss: [
                {i: 'a', x: 0, y: 0, w: 12, h: 2},
                {i: 'b', x: 0, y: 2, w: 12, h: 3},
                {i: 'c', x: 0, y: 5, w: 12, h: 2},
                {i: 'd', x: 0, y: 7, w: 12, h: 2}
            ],
        };
        return (
            <div className="m-timer">
                <ResponsiveReactGridLayout 
                    className="layout" 
                    layouts={layout} 
                    autoSize={true}
                    cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
                >
                <div className="timer-item" key="a">
                    <p className="titem-title">最新资讯</p>
                    <div className="titem-bd">
                        <ul className="titem-list titem-list1">
                            {
                                this.state.data.news.map((obj: any, index: number) => {
                                    return (
                                        <li className="list-item list-item1" key={index}>
                                            <div className="item-l">
                                                <Icon type="pushpin" theme="filled" />
                                                <a href={obj.link} title={obj.message} target="_blank" rel="noopener noreferrer">
                                                    <span>{obj.message}</span>
                                                </a>
                                            </div>
                                            <div className="item-r">
                                                <Tag color="white">
                                                    <Icon type="calendar" />
                                                    {new Date(obj.date).toLocaleString().split(" ")[0]}
                                                </Tag>
                                            </div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                </div>
                <div className="timer-item" key="b">
                    <p className="titem-title">午夜电波</p>
                    <div className="titem-bd">
                        <ul className="titem-list titem-list1">
                            {
                                this.state.data.nightwave.activeChallenges.map((obj: any, index: number) => {
                                    return (
                                        <li className="list-item list-item1" key={index}>
                                            <div className="item-l">
                                                <Icon type="pushpin" theme="filled" />
                                                <Tooltip title={obj.desc}>
                                                    <span>{obj.title}</span>
                                                </Tooltip>       
                                            </div>
                                            <div className="item-r">
                                                <Tag color="white">
                                                    <Icon type="pay-circle" />
                                                    {obj.reputation}
                                                </Tag>
                                                <Tag color="white">
                                                    <Icon type="calendar" />
                                                    <CountDownItem endTime={new Date(obj.expiry).getTime()} id={'nightwave' + index}></CountDownItem>
                                                </Tag>
                                            </div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                </div>
                <div className="timer-item" key="c">
                    <p className="titem-title">裂缝</p>
                    <div className="titem-bd">
                        <ul className="titem-list titem-list1">
                            {
                                this.state.data.fissures.map((obj: any, index: number) => {
                                    return (
                                        <li className="list-item list-item1" key={index}>
                                            <div className="item-l">
                                                <Icon type="pushpin" theme="filled" />
                                                <Tooltip title={obj.desc}>
                                                    <span>[{obj.tier}]-{obj.missionType}-{obj.node}</span>
                                                </Tooltip>       
                                            </div>
                                            <div className="item-r">
                                                <Tag color="white">
                                                    <Icon type="calendar" />
                                                    <CountDownItem endTime={new Date(obj.expiry).getTime()} id={'fissures' + index}></CountDownItem>
                                                </Tag>
                                            </div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                </div>
                <div className="timer-item" key="d">
                    <p className="titem-title">每日突击</p>
                    <div className="titem-bd">
                        <ul className="titem-list titem-list1">
                            {
                                this.state.data.sortie.variants.map((obj: any, index: number) => {
                                    return (
                                        <li className="list-item list-item1" key={index}>
                                            <div className="item-l">
                                                <Icon type="pushpin" theme="filled" />
                                                <Tooltip title={obj.modifier}>
                                                    <span>[{obj.missionType}]-{obj.node}</span>
                                                </Tooltip>       
                                            </div>
                                            <div className="item-r">
                                                <Tag color="white">
                                                    <Icon type="calendar" />
                                                    <CountDownItem endTime={new Date(this.state.data.sortie.expiry).getTime()} id={'sortie' + index}></CountDownItem>
                                                </Tag>
                                            </div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                </div>
                </ResponsiveReactGridLayout>
            </div>
            
        )
    }
}

export default HomeContent;