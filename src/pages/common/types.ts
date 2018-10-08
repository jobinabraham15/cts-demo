export interface IListPageProps {
  list: any;
  workflow: any;
  getList: (payload: any) => void;
  fetchWorkflowData: (payload: any) => void;
  selectRow: (id: string) => void;
}
