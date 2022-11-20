import React, { useState, Dispatch, SetStateAction } from 'react';
import { Button, Modal, Form, Input, Alert, Select } from 'antd';
import {IRent} from '../entities/IRent';
import {useGetClientsQuery, useGetRoomsQuery} from '../redux';

interface AddRentModalProps {
    rent: IRent,
    setRent: Dispatch<SetStateAction<IRent>>
    isModal: boolean,
    setIsModal: Dispatch<SetStateAction<boolean>>
    onOk: () => void,
    onCancel: () => void,
}

export const AddRentModal = (props: AddRentModalProps) => {
    const {rent, setRent, isModal, setIsModal, onCancel, onOk} = props;
    const [alert, setAlert] = useState(false);

    const clients = useGetClientsQuery().data;
    const rooms = useGetRoomsQuery().data;

    const onFinishFailed = () => {
        setAlert(true);
    }
    console.log(rent)
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
                Добавить аренду
            </Button>
            <Modal
                title="Добавление аренды"
                open={isModal}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={rent}
                    onChange={(event: any) => setRent({...rent, [event.target.id]: event.target.value})}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Наименование аренды"
                        name="name"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Скидка"
                        name="discount"
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
                    <Form.Item
                        label="Клиент"
                        name="clientId"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Select
                            defaultValue={Infinity}
                            style={{ width: 250 }}
                            onChange={(value: number) => setRent({...rent, clientId: value})}
                            options={
                                clients?.map(client => ({
                                    label: `${client.surname} ${client.name} ${client.patronymic}`,
                                    value: client.id,
                                }))
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="Комната"
                        name="roomId"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Select
                            defaultValue={Infinity}
                            style={{ width: 250 }}
                            onChange={(value: number) => setRent({...rent, roomId: value})}
                            options={
                                rooms?.map(room => ({
                                    label: `${room.comfort} - ${room.capacity} чел. - ${room.cost} руб.`,
                                    value: room?.id,
                                }))
                            }
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
