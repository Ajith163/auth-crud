import { Table, Space, Button, Avatar } from 'antd';

export default function UserTable({ users, onEdit, onDelete }) {
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} size={32} />
          <a href={`mailto:${text}`}>{text}</a>
        </Space>
      ),
    },
    { title: 'First Name', dataIndex: 'first_name' },
    { title: 'Last Name',  dataIndex: 'last_name' },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (res) => (
        <Space>
          <Button type="primary" size="small" onClick={() => onEdit(res)}>
            Edit
          </Button>
          <Button danger size="small" onClick={() => onDelete(res)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={users}
      columns={columns}
      pagination={false}
      size="middle"
      scroll={{ x: 'max-content' }}
    />
  );
}
