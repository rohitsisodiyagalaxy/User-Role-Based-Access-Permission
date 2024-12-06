import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

// Define types for the props
interface MasterDataTableProps {
  columns: TableColumn<any>[]; // Columns should be an array of TableColumn
  data: any[]; // Data can be any type (you can also use a specific type if known)
}

function MasterDataTable({ columns, data }: MasterDataTableProps): JSX.Element {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
    />
  );
}

export default MasterDataTable;
