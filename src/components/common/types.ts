export interface IListingTableColumn {
  title: string;
  dataIndex: string;
  key?: string | number;
  render?: any;
}

export interface IListingTable {
  columns: Array<IListingTableColumn>;
  data: Array<any>;
  expandRowComponent?: any;
}
