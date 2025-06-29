import { Pagination as AntPagination } from 'antd';

export default function Pagination({ total, perPage, page, setPage }) {
  if (total <= perPage) return null;
  return (
    <AntPagination
      current={page}
      pageSize={perPage}
      total={total}
      onChange={setPage}
      showSizeChanger={false}
    />
  );
}
