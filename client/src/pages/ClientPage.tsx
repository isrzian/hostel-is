import React, {useState} from 'react';
import type { ColumnsType } from 'antd/es/table';
import {Typography} from 'antd';
import {_Table as Table} from '../components';
import {useAddClientMutation, useGetClientsQuery} from '../redux';
import {IClient} from '../entities/IClient';
import {AddClientModal} from '../components/AddClientModal';

const defaultClient: IClient = {
    surname: '',
    name: '',
    patronymic: '',
    address: '',
    passportSeries: '',
    passportNumber: '',
    comment: '',
}

export const ClientPage = () => {
    const [isModal, setIsModal] = useState(false);
    const [currentClient, setCurrentClient] = useState(defaultClient);
    const [addClient] = useAddClientMutation();

    const handleOk = () => {
        addClient(currentClient);
        setIsModal(false);
    };

    const handleCancel = () => {
        setIsModal(false);
    };

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
            <AddClientModal
                client={currentClient}
                setClient={setCurrentClient}
                isModal={isModal}
                setIsModal={setIsModal}
                onOk={handleOk}
                onCancel={handleCancel}
            />
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
