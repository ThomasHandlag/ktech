import { useEffect, useRef, useState } from "react";
import { type TaskDay13 } from "../const_day13";
import UpdateDay13 from "./update_day13";
import { useAuthStore } from "../api/useAuthStore";
import apiClient from "../api/api-client";
import AccessButton from "./access_button";
import {
  SearchOutlined,
} from "@ant-design/icons";
import { Table, Space, Tag, type InputRef, type TableColumnType, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { FilterDropdownProps } from "antd/es/table/interface";

type DataIndex = keyof TaskDay13;

const ListDay13 = () => {
  const { access_token, loggedInUser: user } = useAuthStore();

  const [listTasks, setListTasks] = useState<TaskDay13[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskDay13 | null>(null);

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (confirm: FilterDropdownProps["confirm"]) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<TaskDay13> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) ?? false,
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
  });

  useEffect(() => {
    const fetchTasks = async () => {
      if (access_token) {
        try {
          const dat = (await apiClient.get("/workspaces/tasks")) as TaskDay13[];
          setListTasks(dat.slice(0, 50));
        } catch (error) {
          console.error("Error fetching tasks:", (error as Error).message);
        }
      }
    };

    fetchTasks();
  });

  const handleDeleteTask = async (taskId: number) => {
    if (access_token) {
      try {
        await apiClient.delete(`/workspaces/tasks/${taskId}`);
      } catch (error) {
        console.error("Error deleting task:", (error as Error).message);
      }
    }
  };

  const columns: ColumnsType<TaskDay13> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      ...getColumnSearchProps("title"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Assignee ID",
      dataIndex: "assignee_id",
      key: "assignee_id",
      sorter: (a, b) => a.assignee_id - b.assignee_id,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "done"
            ? "green"
            : status === "in_progress"
            ? "orange"
            : "default";
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        { text: "To Do", value: "to_do" },
        { text: "In Progress", value: "in_progress" },
        { text: "Done", value: "done" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a, b) =>
        new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <AccessButton
            roles={user?.roles.map((role) => role.name)}
            className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded-md transition-colors"
            onClick={() => setSelectedTask(record)}
          >
            Edit
          </AccessButton>
          <AccessButton
            roles={user?.roles.map((role) => role.name)}
            className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded-md transition-colors"
            onClick={() => handleDeleteTask(record.id)}
          >
            Delete
          </AccessButton>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Task List</h1>
      <Table
        columns={columns}
        dataSource={listTasks}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        scroll={{ x: "max-content" }}
        className="bg-white rounded-lg shadow"
      />

      {selectedTask && (
        <UpdateDay13
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default ListDay13;
