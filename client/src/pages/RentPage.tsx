import React, {useState} from 'react';
import {_Table as Table} from '../components';
import {Typography} from 'antd';
import {useAddRentMutation, useGetRentsQuery} from '../redux';
import {IRent} from '../entities/IRent';
import {AddRentModal} from '../components/AddRentModal';
import {ColumnsType} from 'antd/es/table';

const defaultRent: IRent = {
    name: '',
    discount: 0,
    cost: 0,
    clientId: 0,
    roomId: 0,
    bookedStartDate: '',
    bookedEndDate: '',
}

export const RentPage = () => {
    const [isModal, setIsModal] = useState(false);
    const [currentRent, setCurrentRent] = useState(defaultRent);
    const [addRent] = useAddRentMutation();

    const rents = useGetRentsQuery().data;

    const handleOk = () => {
        addRent(currentRent);
        setIsModal(false);
    };

    const handleCancel = () => {
        setIsModal(false);
    };

    const columns: ColumnsType<IRent> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Дата вьезда',
            dataIndex: 'checkIn',
            key: 'checkIn',
        },
        {
            title: 'Скидка',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Стоимость',
            dataIndex: 'cost',
            key: 'cost',
        },
        {
            title: 'Клиент',
            dataIndex: 'clientId',
            key: 'clientId',
        },
        {
            title: 'Комната',
            dataIndex: 'roomId',
            key: 'roomId',
        }
    ]

    return (
        <div style={{marginLeft: 20}}>
            <AddRentModal
                rent={currentRent}
                setRent={setCurrentRent}
                isModal={isModal}
                setIsModal={setIsModal}
                onOk={handleOk}
                onCancel={handleCancel}
            />
            <h1>Аренды</h1>
            {
                rents?.length ?
                    <Table
                        columns={columns}
                        dataSource={rents}
                    />
                    : <Typography>Аренд пока нет</Typography>
            }
        </div>
    )
}
