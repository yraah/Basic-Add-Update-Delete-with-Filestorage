import React, {useEffect, useState} from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../features/countriesSlice';

const UserForm = ({ form, onSubmit, imagePreview, handlePhotoChange }) => {
  const dispatch = useDispatch();
  const { countries, status } = useSelector((state) => state.countries);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: 'Please select a country!' }]}
      >
        <Select placeholder="Select a country" loading={status === 'loading'}>
          {countries.map((country) => (
            <Select.Option key={country.code} value={country.name}>
              {country.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Account Type"
        name="account_type"
        rules={[{ required: true, message: 'Please select account type!' }]}
      >
        <Select placeholder="Select a account type">
          <Select.Option value="System Admin">System Admin</Select.Option>
          <Select.Option value="Team Admin">Team Admin</Select.Option>
          <Select.Option value="Team Member">Team Member</Select.Option>
          <Select.Option value="Admin">Admin</Select.Option>
          <Select.Option value="User">User</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please enter your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter your name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Contact Number" name="contact_number" >
        <Input />
      </Form.Item>
      <Form.Item label="Photo">
        <Input type="file" onChange={handlePhotoChange} />
        {imagePreview && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={imagePreview}
            alt="Preview"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>
      )}
      </Form.Item>
      <Button type="primary" htmlType="submit">
          Submit
        </Button>
    </Form>
  );
};

export default UserForm;
