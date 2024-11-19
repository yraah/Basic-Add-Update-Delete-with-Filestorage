import React, {useState} from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const UserTable = ({ users, onEdit, onDelete }) => {
    const [pageSize, setPageSize] = useState(5); 
  const columns = [
    {
      title: 'Photo',
      key: 'photo',
      render: (text, record) => (
        <img
          src={`http://localhost:5000${record.photo}`}
          alt="User"
          style={{ width: 100, height: 100 }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email), 
    },
    {
        title: 'Account Type',
        dataIndex: 'account_type',
        key: 'account_type',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
  <Table
    style={{width:'100%'}}
    dataSource={users}
    columns={columns}
    rowKey="id"
    pagination={{
        pageSize: pageSize,
        onChange: (page, pageSize) => setPageSize(pageSize),
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
    }}
    />);
};

export default UserTable;
