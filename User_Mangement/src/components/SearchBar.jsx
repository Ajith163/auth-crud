import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function SearchBar({ value, setValue, fullWidth = false }) {
  return (
    <Input
      allowClear
      prefix={<SearchOutlined />}
      placeholder="Search users…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{
        width: fullWidth ? '100%' : 280,
        maxWidth: fullWidth ? '100%' : 280,
      }}
    />
  );
}
