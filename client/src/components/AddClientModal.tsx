import React, { useState, Dispatch, SetStateAction } from 'react';
import { Button, Modal, Form, Input, Alert } from 'antd';
import {IClient} from '../entities/IClient';

interface AddClientModalProps {
    client: IClient,
    setClient: Dispatch<SetStateAction<IClient>>
    isModal: boolean,
    setIsModal: Dispatch<SetStateAction<boolean>>
    onOk: () => void,
    onCancel: () => void,
}

export const AddClientModal = (props: AddClientModalProps) => {
    const {client, setClient, isModal, setIsModal, onCancel, onOk} = props;
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
                Добавить клиента
            </Button>
            <Modal
                title="Добавление клиента"
                open={isModal}
                onOk={onOk}
                onCancel={onCancel}
            >
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={client}
                    onChange={(event: any) => setClient({...client, [event.target.id]: event.target.value})}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Фамилия"
                        name="surname"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Имя"
                        name="name"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Отчество"
                        name="patronymic"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Адрес"
                        name="address"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Серия паспорта"
                        name="passportSeries"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Номер паспорта"
                        name="passportNumber"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Комментарий"
                        name="comment"
                        rules={[{ required: true, message: 'Поле не должно быть пустым!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
