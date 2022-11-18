import React, { useState } from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {Header} from './Header';
import {
    UserOutlined,
    AppstoreOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AreaChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const _Menu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon: React.ReactNode,
        link: string,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
            onClick: () => navigate(link),
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem('Главная', '1', <AreaChartOutlined />, '/'),
        getItem('Комнаты', '2', <AppstoreOutlined />, '/rooms'),
        getItem('Клиенты', '3', <UserOutlined />, '/clients'),
    ];

    return (
        <>
            <Header />
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{ width: 256 }}>
                    <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        items={items}
                    />
                </div>
                <Outlet />
            </div>
        </>
    );
};
