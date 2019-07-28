import * as React from "react";
import { Table, Input, Button, Icon } from "antd";
import axios from "axios";

export default class FormPoc extends React.Component {
  searchInput: Input | null;

  state = {
    data: [],
    pagination: {
      current: 0
    },
    loading: false
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      this.fetch({ search: value });
      return true;
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput && this.searchInput.select());
      }
    }
  });

  columns = () => [
    {
      title: "Name",
      dataIndex: "name.first",
      key: "name.first",
      sorter: true,
      // render: name => `${name.first} ${name.last}`,
      width: "20%",
      ...this.getColumnSearchProps("name.first")
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" }
      ],
      width: "20%"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    }
  ];

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  componentDidMount() {
    const pagination: any = { ...this.state.pagination };
    this.fetch().then((data: any) => {
      this.setState({
        loading: false,
        data: data.data.results,
        pagination
      });
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });

    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    }).then((data: any) => {
      this.setState({
        loading: false,
        data: data.data.results,
        pagination
      });
    });
  };

  fetch = (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    return axios({
      url: "https://randomuser.me/api",
      method: "get",
      params: {
        results: 10,
        ...params
      },
      responseType: "json"
    });
  };

  render() {
    console.log("this.state.data", this.state.data);
    return (
      <Table
        columns={this.columns()}
        rowKey={(record: any) => record.login.uuid}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}
