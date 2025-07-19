import { useEffect, useState, useCallback } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Tag,
  Popconfirm,
  Card,
  Select,
  Switch,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { LoggedInUser, Role, UserOnCreate } from "../models/models";
import { getUsers, createUser, updateUser, deleteUser, getRoles } from "../api";
import { useGNotification } from "../const_day13";

interface UserFormData {
  username?: string;
  fullName: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  isActive: boolean;
  roleIds: number[];
}

interface UserRoleUpdateData {
  roleIds: number[];
}

const ListUserDay13 = () => {
  const [users, setUsers] = useState<LoggedInUser[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<LoggedInUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<LoggedInUser | null>(null);
  const [userForm] = Form.useForm();
  const [roleForm] = Form.useForm();

  const { api } = useGNotification();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      if (Array.isArray(response)) {
        setUsers(response);
      } else {
        api.error({
          message: "Error fetching users",
          description: "Failed to load users data",
          placement: "bottomRight",
        });
      }
    } catch (error) {
      api.error({
        message: "Error fetching users",
        description: JSON.stringify(error),
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  }, [api]);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await getRoles();
      if (Array.isArray(response)) {
        setRoles(response);
      }
    } catch (error) {
      api.error({
        message: "Error fetching roles",
        description: `${(error as Error).message}`,
        placement: "bottomRight",
      });
    }
  }, [api]);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [fetchUsers, fetchRoles]);

  const handleCreateUser = () => {
    setEditingUser(null);
    userForm.resetFields();
    userForm.setFieldsValue({ isActive: true, roleIds: [] });
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user: LoggedInUser) => {
    setEditingUser(user);
    const userRoleIds = user.roles?.map((role) => Number(role.id)) || [];
    userForm.setFieldsValue({
      ...user,
      roleIds: userRoleIds,
    });
    setIsUserModalOpen(true);
  };

  const handleEditUserRoles = (user: LoggedInUser) => {
    setSelectedUser(user);
    const userRoleIds = user.roles?.map((role) => Number(role.id)) || [];
    roleForm.setFieldsValue({
      roleIds: userRoleIds,
    });
    setIsRoleModalOpen(true);
  };

  const handleDeleteUser = async (userId: string | number) => {
    try {
      await deleteUser(userId.toString());
      api.success({
        message: "Success",
        description: "User deleted successfully",
        placement: "bottomRight",
      });
      fetchUsers();
    } catch (error) {
      api.error({
        message: "Error deleting user",
        description: `${(error as Error).message}`,
        placement: "bottomRight",
      });
    }
  };

  const handleUserSubmit = async (values: UserFormData) => {
    try {
      if (editingUser) {
        const updateData = {
          fullName: values.fullName,
          email: values.email,
          isActive: values.isActive,
        };
        await updateUser(editingUser.id.toString(), updateData);
        api.success({
          message: "Success",
          description: "User updated successfully",
          placement: "bottomRight",
        });
      } else {
        const createData: UserOnCreate = {
          username: values.username || values.email || "",
          fullName: values.fullName,
          password: values.password || "",
          confirmPassword: values.confirmPassword || "",
        };
        await createUser(createData);
        api.success({
          message: "Success",
          description: "User created successfully",
          placement: "bottomRight",
        });
      }
      setIsUserModalOpen(false);
      fetchUsers();
    } catch (error) {
      api.error({
        message: "Error saving user",
        description: `${(error as Error).message}`,
        placement: "bottomRight",
      });
    }
  };

  const handleRoleSubmit = async (values: UserRoleUpdateData) => {
    if (!selectedUser) return;

    try {
      const updateData = {
        roleIds: values.roleIds,
      } as Partial<LoggedInUser>;
      await updateUser(selectedUser.id.toString(), updateData);
      api.success({
        message: "Success",
        description: "User roles updated successfully",
        placement: "bottomRight",
      });
      setIsRoleModalOpen(false);
      fetchUsers();
    } catch (error) {
      api.error({
        message: "Error updating roles",
        description: `${(error as Error).message}`,
        placement: "bottomRight",
      });
    }
  };

  const columns: ColumnsType<LoggedInUser> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => (
        <div className="flex items-center gap-2">
          <UserOutlined />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "username",
      key: "email",
      render: (text) => (
        <span className="text-blue-500 hover:underline">{text}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (active) => (
        <Tag color={active === "active" ? "green" : "red"} className="capitalize">
          {active}
        </Tag>
      ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles: Role[]) => (
        <div className="flex flex-wrap gap-1">
          {roles?.map((role) => (
            <Tag key={role.id} color="blue" icon={<TeamOutlined />}>
              {role.name}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 250,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
          >
            Edit
          </Button>
          <Button
            type="default"
            size="small"
            icon={<TeamOutlined />}
            onClick={() => handleEditUserRoles(record)}
          >
            Roles
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">User Management</h1>
          <p className="text-gray-600 mb-4">
            Manage users, their roles, and permissions
          </p>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateUser}
            size="large"
          >
            Create New User
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Card>

      {/* User Create/Edit Modal */}
      <Modal
        title={editingUser ? "Edit User" : "Create New User"}
        open={isUserModalOpen}
        onCancel={() => setIsUserModalOpen(false)}
        footer={null}
        width={700}
      >
        <Form
          form={userForm}
          layout="vertical"
          onFinish={handleUserSubmit}
          autoComplete="off"
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter full name" },
                { min: 2, message: "Full name must be at least 2 characters" },
              ]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>
          </div>

          {!editingUser && (
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm password" />
              </Form.Item>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="isActive" label="Status" valuePropName="checked">
              <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                defaultChecked
              />
            </Form.Item>

            <Form.Item name="roleIds" label="Roles">
              <Select
                mode="multiple"
                placeholder="Select user roles"
                allowClear
                options={roles.map((role) => ({
                  value: role.id,
                  label: role.name,
                }))}
              />
            </Form.Item>
          </div>

          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button onClick={() => setIsUserModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingUser ? "Update" : "Create"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* User Roles Edit Modal */}
      <Modal
        title={`Edit Roles for ${selectedUser?.fullName}`}
        open={isRoleModalOpen}
        onCancel={() => setIsRoleModalOpen(false)}
        footer={null}
        width={500}
      >
        <Form
          form={roleForm}
          layout="vertical"
          onFinish={handleRoleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="roleIds"
            label="User Roles"
            rules={[
              { required: true, message: "Please select at least one role" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select user roles"
              allowClear
              options={roles.map((role) => ({
                value: role.id,
                label: role.name,
              }))}
            />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button onClick={() => setIsRoleModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Update Roles
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListUserDay13;
