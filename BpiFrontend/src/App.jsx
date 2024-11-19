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
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [photo, setPhoto] = useState(null);

  // Fetch users initially and refresh whenever `users` state changes
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    // Update filteredUsers whenever `users` or `searchQuery` changes
    if (searchQuery) {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [users, searchQuery]);

  const handleAddOrEdit = async (values) => {
    values.photo = photo;
    if (editingUser) {
      await dispatch(updateUser({ id: editingUser.id, formData: values }));
    } else {
      await dispatch(addUser(values));
    }

    // Close modal and reset the form
    setIsModalOpen(false);
    form.resetFields();

    // Refresh users list
    dispatch(fetchUsers());
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      country:user.country,
      account_type:user.account_type,
      name:user.name,
      contact_number:user.contact_number
    });
    if (user.photo) {
      setImagePreview(user.photo.startsWith('http') ? user.photo : null);
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    dispatch(fetchUsers()); // Refresh the users list after deletion
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
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
          style={{ width: 200 }}
        />
      </div>

      <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />

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
            setPhoto(e.target.files[0]);
            const file = e.target.files[0];
            setImagePreview(file ? URL.createObjectURL(file) : null);
          }}
        />
      </Modal>
    </div>
  );
};

export default App;
