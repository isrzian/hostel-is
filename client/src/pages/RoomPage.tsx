import React, {useState} from 'react';
import type { ColumnsType } from 'antd/es/table';
import {Typography} from 'antd';
import {_Table as Table} from '../components';
import {useAddRoomMutation, useGetRoomsQuery} from '../redux';
import {IRoom} from '../entities/IRoom';
import {AddRoomModal} from '../components/AddRoomModal';

const defaultRoom: IRoom = {
    capacity: 0,
    comfort: 'lux',
    cost: 0,
}

export const RoomPage = () => {
    const [isModal, setIsModal] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(defaultRoom);
    const [addRoom] = useAddRoomMutation();

    const handleOk = () => {
        addRoom(currentRoom);
        setIsModal(false);
    };

    const handleCancel = () => {
        setIsModal(false);
    };

    const columns: ColumnsType<IRoom> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Вместимость',
            dataIndex: 'capacity',
            key: 'capacity',
        },
        {
            title: 'Комфорт',
            dataIndex: 'comfort',
            key: 'comfort',
        },
        {
            title: 'Стоимость',
            dataIndex: 'cost',
            key: 'cost',
        },
    ];

    const rooms = useGetRoomsQuery().data;

    return (
        <div style={{marginLeft: 20}}>
            <AddRoomModal
                room={currentRoom}
                setRoom={setCurrentRoom}
                isModal={isModal}
                setIsModal={setIsModal}
                onOk={handleOk}
                onCancel={handleCancel}
            />
            <h1>Комнаты</h1>
            {
                rooms?.length ?
                    <Table
                        columns={columns}
                        dataSource={rooms}
                    />
                    : <Typography>Комнат пока нет</Typography>
            }
        </div>
    )
}
