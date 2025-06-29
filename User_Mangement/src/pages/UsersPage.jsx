import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, editUser, removeUser } from '../store/usersSlice';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

import {
  Layout,
  Button,
  Space,
  Typography,
  Card,
  Grid,
  Row,
  Col,
  Spin,
  message,
} from 'antd';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';

import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import UserTable from '../components/UserTable';
import UserCardGrid from '../components/UserCardGrid';
import UserModal from '../components/UserModal';
import ConfirmDialog from '../components/ConfirmDialog';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;
const PER_PAGE = 4;

export default function UsersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector((s) => s.users);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('table');
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
  };

  const save = async (data) => {
    try {
      setActionLoading(true);
      if (editing) {
        await dispatch(editUser({ id: editing.id, data })).unwrap();
      } else {
        await dispatch(addUser(data)).unwrap();
      }
      message.success('Saved!');
      closeModal();
    } catch (err) {
      message.error(err || 'Something went wrong');
    } finally {
      setActionLoading(false);
    }
  };

  const doDelete = async () => {
    try {
      setActionLoading(true);
      await dispatch(removeUser(deleteCandidate.id)).unwrap();
      setDeleteCandidate(null);
      message.success('Deleted!');
    } catch (err) {
      message.error(err || 'Delete failed');
    } finally {
      setActionLoading(false);
    }
  };

  const filtered = list.filter((u) =>
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase())
  );
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: 'lightgray',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Title
          level={4}
          style={{ color: '#000', margin: 0, lineHeight: 'inherit' }}
        >
          Users
        </Typography.Title>

        <Button
          style={{ marginTop: '13px' }}
          icon={<LogoutOutlined />}
          onClick={() => {
            dispatch(logout());
            navigate('/login');
          }}
        >
          Logout
        </Button>
      </Header>

      <Content style={{ padding: 24 }}>
        <Card>
          <Row
            justify="space-between"
            align="middle"
            gutter={[16, 16]}
            style={{ marginBottom: 16 }}
          >
            <Col xs={24} md={12}>
              <ViewToggle mode={mode} setMode={setMode} />
            </Col>

            <Col xs={24} md={12} style={{ textAlign: isMobile ? 'left' : 'right' }}>
              <Space wrap>
                <SearchBar value={search} setValue={setSearch} fullWidth={isMobile} />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setShowModal(true)}
                >
                  Create User
                </Button>
              </Space>
            </Col>
          </Row>

          <Spin spinning={loading || actionLoading}>
            {mode === 'table' ? (
              <UserTable
                users={paged}
                onEdit={(u) => {
                  setEditing(u);
                  setShowModal(true);
                }}
                onDelete={setDeleteCandidate}
              />
            ) : (
              <UserCardGrid
                users={paged}
                onEdit={(u) => {
                  setEditing(u);
                  setShowModal(true);
                }}
                onDelete={setDeleteCandidate}
              />
            )}

            <div
              style={{
                marginTop: 24,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Pagination
                total={filtered.length}
                perPage={PER_PAGE}
                page={page}
                setPage={setPage}
              />
            </div>
          </Spin>
        </Card>
      </Content>

      {showModal && (
        <UserModal initial={editing} onClose={closeModal} onSubmit={save} />
      )}
      {deleteCandidate && (
        <ConfirmDialog
          text={`Delete ${deleteCandidate.first_name}?`}
          onCancel={() => setDeleteCandidate(null)}
          onConfirm={doDelete}
        />
      )}
    </Layout>
  );
}
