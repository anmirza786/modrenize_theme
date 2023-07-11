
import React, { useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ActionButtons, RenderStatusChip } from "./FrameworkComponents";
import { usersTableColumnDefs } from 'src/utils/helpers';
import "./AGStyles.css";

export const UserTable = ({ rows }) => {
  const agGridRef= useRef();
  useEffect(() => {
    const agGridDiv =
      agGridRef.current?.gridOptionsWrapper?.getLayoutElements()[1];
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

  return (
    <div
      className="ag-theme-alpine"
      style={{ margin: "10px 0", height: "60vh" }}
    >
      <AgGridReact
        ref={agGridRef}
        rowData={rows}
        defaultColDef={defaultColDef}
        columnDefs={usersTableColumnDefs}
        components={frameworkComponents}
        suppressScrollOnNewData={true}
        rowSelection="single"
      ></AgGridReact>
    </div>
  );
};
