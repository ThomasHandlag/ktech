import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  Card,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { getRoles, createRole, updateRole, deleteRole } from "../api";
import { useGNotification } from "../const_day13";
import type { Role } from "../models/models";

interface RoleFormData {
  code: string;
  name: string;
  description?: string;
}

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [form] = Form.useForm();

  const { api } = useGNotification();

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await getRoles();
      if (Array.isArray(response)) {
        setRoles(response);
      }
    } catch (error) {
      api.error({
        message: "Error fetching roles",
        description: `Failed to fetch roles: ${(error as Error).message}`,
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreate = () => {
    setEditingRole(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    form.setFieldsValue(role);
    setIsModalOpen(true);
  };

  const handleDelete = async (roleId: number) => {
    try {
      await deleteRole(roleId);
      api.success({
        message: "Role deleted successfully",
        description: `Role with ID ${roleId} has been deleted.`,
        placement: "bottomRight",
      });
      fetchRoles();
    } catch (error) {
      api.error({
        message: "Error deleting role",
        description: `${(error as Error).message}`,
        placement: "bottomRight",
      });
    }
  };

  const handleSubmit = async (values: RoleFormData) => {
    try {
      if (editingRole) {
        await updateRole(editingRole.id.toString(), values);
        api.success({
          message: "Role updated successfully",
          description: `Role with ID ${editingRole.id} has been updated.`,
          placement: "bottomRight",
        });
      } else {
        await createRole(values);
        api.success({
          message: "Role created successfully",
          description: `Role with code ${values.code} has been created.`,
          placement: "bottomRight",
        });
      }
      setIsModalOpen(false);
      fetchRoles();
    } catch (error) {
      console.error("Error saving role:", error);
      api.error({
        message: "Failed to save role",
        description: `${(error as Error).message}`,
        placement: "bottomRight",
      });
    }
  };

  const columns: ColumnsType<Role> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => description || "No description",
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this role?"
            onConfirm={() => handleDelete(record.id)}
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
          <h1 className="text-2xl font-bold mb-2">Roles Management</h1>
          <p className="text-gray-600 mb-4">
            Manage user roles and permissions
          </p>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            size="large"
          >
            Create New Role
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={roles}
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

      <Modal
        title={editingRole ? "Edit Role" : "Create New Role"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="code"
            label="Role Code"
            rules={[
              { required: true, message: "Please enter role code" },
              { min: 2, message: "Role code must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter role code (e.g., ADMIN, USER)" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Role Name"
            rules={[
              { required: true, message: "Please enter role name" },
              { min: 2, message: "Role name must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter role name (e.g., Administrator, User)" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { max: 255, message: "Description cannot exceed 255 characters" },
            ]}
          >
            <Input.TextArea
              placeholder="Enter role description (optional)"
              rows={4}
            />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingRole ? "Update" : "Create"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Roles;
