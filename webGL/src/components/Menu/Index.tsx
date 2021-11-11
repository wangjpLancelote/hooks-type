import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { routes } from '@/routes/Index';
import { IRoute } from '@/utils/interface';
import Herf from '../Href/Index';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

const { Content, Sider, Header } = Layout;
const { SubMenu } = Menu;

/** 菜单组件 */
const MenuApp = (props: any) => {

    const [collapsed, setCollapsed] = useState(false);

    const  toggle = () => {
        setCollapsed(!collapsed);
    };
    /** 生成菜单项 */
    const MenuItemGenerate = (route: IRoute) => {
        if (route.children && route.children.length) {
            return (
                 <SubMenu key={route.path} title={route.name}>
                    {
                        route.children.map((v, index) => {
                            return MenuItemGenerate(v)
                        })
                    }
                </SubMenu>
            )
        }
        return (
            <Menu.Item key={route.path} >
                <Herf path={route.path} name={route.name}></Herf>
            </Menu.Item>
        )
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                {
                    routes.map((route, index) => {
                        return MenuItemGenerate(route);
                    })
                }
            </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0, height: '44px', lineHeight: '44px' }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                    margin: '20px 16px',
                    padding: 20
                    }}
                >
                    { props.children }
                </Content>
            </Layout>
        </Layout>
    ) 
}

export default MenuApp;