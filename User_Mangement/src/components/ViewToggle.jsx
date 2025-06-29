import { Segmented } from 'antd';
import { TableOutlined, AppstoreOutlined } from '@ant-design/icons';

export default function ViewToggle({ mode, setMode }) {
  return (
    <Segmented
      value={mode}
      onChange={(val) => setMode(val)}
      options={[
        { label: 'Table', value: 'table', icon: <TableOutlined /> },
        { label: 'Card',  value: 'card',  icon: <AppstoreOutlined /> },
      ]}
    />
  );
}
