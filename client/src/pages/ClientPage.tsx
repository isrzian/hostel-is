import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import {Typography} from 'antd';
import {_Table as Table} from '../components';
import {useGetClientsQuery} from '../redux';
import {IClient} from '../entities/IClient';

export const ClientPage = () => {
    const columns: ColumnsType<IClient> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Фамилия',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Отчество',
            dataIndex: 'patronymic',
            key: 'patronymic',
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            key: 'comment',
        },
    ];

    const clients = useGetClientsQuery().data;

    return (
        <div style={{marginLeft: 20}}>
            <h1>Клиенты</h1>
            {
                clients?.length ?
                    <Table
                        columns={columns}
                        dataSource={clients}
                    />
                    : <Typography>Клиентов пока нет</Typography>
            }
        </div>
    )
}
