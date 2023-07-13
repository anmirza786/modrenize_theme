export const usersTableColumnDefs = [
  {
    headerName: 'Name',
    field: 'name',
    minWidth: 150,
  },
  {
    field: 'email',
    minWidth: 150,
  },
  {
    headerName: 'Role',
    field: 'role.name',
    minWidth: 130,
  },
  {
    headerName: 'Status',
    field: 'is_active',
    cellRenderer: 'RenderStatusChip',
    minWidth: 160,
  },
  {
    headerName: 'Actions',
    cellRenderer: 'ActionButtons',
    minWidth: 135,
    filter: false,
    sortable: false,
  },
];

export const rolesTableColumnDefs = [
  {
    headerName: 'ID',
    field: 'id',
    maxWidth: 50,
  },
  {
    headerName: 'Name',
    field: 'name',
    maxWidth: 300,
  },
  {
    field: 'description',
  },
  {
    headerName: 'Users',
    field: 'userCount',
    maxWidth: 200,
  },
  // {
  //   headerName: "Actions",
  //   cellRenderer: "ActionButtons",
  //   minWidth: 135,
  //   filter: false,
  //   sortable: false,
  // },
];

export const localStorageKeys = {
  authToken: 'AccessToken',
  userObj: 'user',
  userId: 'userId',
};
