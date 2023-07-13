import React, { useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ActionButtons, RenderStatusChip } from './FrameworkComponents';
import { usersTableColumnDefs } from 'src/utils/helpers';
import './AGStyles.css';
import Dialog from 'src/components/dialogs/Dialog';
import { useSelector } from 'react-redux';

export const UserTable = ({ rows }) => {
  const agGridRef = useRef();
  useEffect(() => {
    const agGridDiv = agGridRef.current?.gridOptionsWrapper?.getLayoutElements()[1];
    new PerfectScrollbar(agGridDiv);
  }, []);
  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
  };
  const frameworkComponents = {
    ActionButtons,
    RenderStatusChip,
  };
  const isOpen = useSelector((state) => state.Dialogs.isOpen);
  const dialogData = useSelector((state) => state.Dialogs.data);
  return (
    <div className="ag-theme-alpine" style={{ margin: '10px 0', height: '60vh' }}>
      <AgGridReact
        ref={agGridRef}
        rowData={rows}
        defaultColDef={defaultColDef}
        columnDefs={usersTableColumnDefs}
        components={frameworkComponents}
        suppressScrollOnNewData={true}
        rowSelection="single"
      ></AgGridReact>
      {isOpen && (
        <Dialog
          title={'Confirmation Dialog'}
          dialogText={`Are you sure you want to delete ${dialogData?.data?.name} ?`}
          buttonText={'Yes'}
          data={dialogData}
        />
      )}
    </div>
  );
};
