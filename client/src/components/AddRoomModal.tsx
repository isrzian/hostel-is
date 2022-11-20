import React, { useState, Dispatch, SetStateAction } from 'react';
import { Button, Modal, Form, Input, Select, Alert } from 'antd';
import {IRoom} from '../entities/IRoom';

interface AddRoomModalProps {
    room: IRoom,
    setRoom: Dispatch<SetStateAction<IRoom>>
    isModal: boolean,
    setIsModal: Dispatch<SetStateAction<boolean>>
    onOk: () => void,
    onCancel: () => void,
}

export const AddRoomModal = (props: AddRoomModalProps) => {
    const {room, setRoom, isModal, setIsModal, onCancel, onOk} = props;
    const [alert, setAlert] = useState(false);

    const onFinishFailed = () => {
        setAlert(true);
    }

    return (
        <>
            {alert && <Alert
                message="Ошибка формы!"
                showIcon
                description="При отправке запроса на сервер возникла ошибка!"
                type="error"
                closable
                onClose={() => setAlert(false)}
            />}
            <Button type="primary" onClick={() => setIsModal(true)}>
                Добавить комнату
            </Button>
            <Modal
                title="Добавление комнаты"
                open={isModal}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={room}
                    onChange={(event: any) => setRoom({...room, [event.target.id]: event.target.value})}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Комфорт"
                        name="comfort"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Select
                            defaultValue="lux"
                            style={{ width: 120 }}
                            onChange={(value) => setRoom(prev => ({...prev, comfort: value}))}
                            options={[
                                {
                                    value: 'lux',
                                    label: 'lux',
                                },
                                {
                                    value: 'half lux',
                                    label: 'half lux',
                                },
                                {
                                    value: 'default',
                                    label: 'default',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Вместимость"
                        name="capacity"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Стоимость"
                        name="cost"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
