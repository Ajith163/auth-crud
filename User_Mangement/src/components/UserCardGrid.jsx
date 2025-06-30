import { Row, Col, Card, Avatar, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function UserCardGrid({ users, onEdit, onDelete }) {
  return (
    <Row gutter={[16, 16]}>
      {users.map((u) => (
        <Col xs={24} sm={12} md={8} lg={6} key={u.id}>
          <Card className="user-card" hoverable>
            <div className="user-card-body">
              <Avatar src={u.avatar} size={80} />
              <h3 className="user-card-name">
                {u.first_name} {u.last_name}
              </h3>
              <p className="user-card-mail">{u.email}</p>
            </div>

            <div className="user-card-overlay">
              <Space>
                <Button
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(u)}
                />
                <Button
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete(u)}
                />
              </Space>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
