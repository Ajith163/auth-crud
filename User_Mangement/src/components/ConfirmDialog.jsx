import { Modal } from 'antd';

export default function ConfirmDialog({ text, onConfirm, onCancel }) {
  return (
    <Modal
      open
      title="Confirm Delete"
      onOk={onConfirm}
      onCancel={onCancel}
      okButtonProps={{ danger: true }}
      okText="Delete"
    >
      {text}
    </Modal>
  );
}
