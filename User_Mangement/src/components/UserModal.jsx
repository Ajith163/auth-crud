import { Modal, Form, Input } from 'antd';
import { useEffect } from 'react';

export default function UserModal({ initial, onClose, onSubmit }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initial || { first_name: '', last_name: '', email: '', avatar: '' });
  }, [initial, form]);

  const submit = () => {
    form
      .validateFields()
      .then((values) => onSubmit(values))
      .catch(() => {});
  };

  return (
    <Modal
      open
      title={initial ? 'Edit User' : 'Create User'}
      onOk={submit}
      onCancel={onClose}
      okText="Submit"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Required' },
            { type: 'email', message: 'Invalid email' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Profile Image Link"
          name="avatar"
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
