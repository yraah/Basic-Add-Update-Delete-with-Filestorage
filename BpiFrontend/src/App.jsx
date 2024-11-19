import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, addUser, updateUser } from '../features/userSlice';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import UserTable from '../components/userTable';
import UserForm from '../components/userForm';
import { Modal, Button, Input, Form } from 'antd';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [users, searchQuery, isModalOpen]);

  const handleAddOrEdit = (values) => {
    values.photo = photo;
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, formData: values }));
    } else {
      dispatch(addUser(values));
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setImagePreview(user.photo ? URL.createObjectURL(user.photo) : null);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1000px',
          marginBottom: '16px',
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditingUser(null);
            setIsModalOpen(true);
          }}
          style={{ marginRight: '16px' }}
        >
          Add User
        </Button>

        <Input.Search
          placeholder="Search by username"
          enterButton={<SearchOutlined />}
          value={searchQuery}
          onSearch={setSearchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '200px' }}
        />
      </div>

      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <UserForm
          form={form}
          onSubmit={handleAddOrEdit}
          imagePreview={imagePreview}
          handlePhotoChange={(e) => {
            const file = e.target.files[0];
            setImagePreview(file ? URL.createObjectURL(file) : null);
            setPhoto(e.target.files[0]);
          }}
        />
      </Modal>
    </div>
  );
};

export default App;
