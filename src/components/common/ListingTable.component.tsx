import * as React from "react";
import { Table, Card } from "antd";
import { IListingTable } from "components/common/types";

class ListingTable extends React.Component<IListingTable> {
  render() {
    const tableProps = {
      columns: this.props.columns,
      dataSource: this.props.data,
      expandedRowRender: this.props.expandRowComponent || null,
      onRow: record => {
        return {
          onClick: () => {
            this.props.onRowSelected(record);
          }
        };
      }
    };

    return (
      <>
        <Card>
          <Table {...tableProps} />
        </Card>
      </>
    );
  }
}

export default ListingTable;
