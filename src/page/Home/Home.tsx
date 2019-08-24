import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Header from '../../component/Header';
import { Layout, Menu, Icon, Input } from 'antd';
import HomeContent from '../../component/HomeContent';
import './Home.scss';
const { Header, Sider, Content } = Layout;
const { Search } = Input;

class Home extends React.Component{
    state = {
        collapsed: false,
        logoText: 'wfaHelper'
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });

        if(this.state.collapsed){
            this.setState({
                logoText: 'wfaHelper'
            });            
        }else{
            this.setState({
                logoText: 'wfa'
            });                  
        }
    };

    render() {
        return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className="m-sdlogo" >
                    {this.state.logoText}
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="appstore" />
                        <span>实时信息</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
            <Header style={{ background: '#fff'}}>
                <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                />
                <div className="m-hdsch">
                    <Search
                        placeholder="warframe中文维基站内搜索"
                        onSearch={value => {
                            window.open(`https://warframe.huijiwiki.com/wiki/${value}`, '_target')
                        }}
                        style={{ width: 250 }}
                    />                
                </div>
            </Header>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 850,
                }}
            >
                <HomeContent></HomeContent>
            </Content>
            </Layout>
        </Layout>
        );
    }
}

export default Home;