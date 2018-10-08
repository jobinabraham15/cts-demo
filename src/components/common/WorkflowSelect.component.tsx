import * as React from "react";
import { Menu, Dropdown, Icon } from "antd";

export interface IWorkflowASelectItem {
  display: string | number;
  value: string | number;
}
interface IWorkflowSelect {
  onChange?: (record: any) => void;
  items: Array<IWorkflowASelectItem>;
}

class WorkflowSelect extends React.Component<IWorkflowSelect> {
  render() {
    const { onChange, items } = this.props;
    const menu = (
      <Menu onClick={onChange}>
        {items.map((item, index) => (
          <Menu.Item key={item.value}>{item.display}</Menu.Item>
        ))}
      </Menu>
    );
    return (
      <>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#">
            Hover me, Click menu item <Icon type="down" />
          </a>
        </Dropdown>
      </>
    );
  }
}

export default WorkflowSelect;
