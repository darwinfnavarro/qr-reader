import React from 'react';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface TableProps {
  rows: {
    id: number;
    loteId?: string;
    imei?: string;
    bodega?: string;
    service?: string;
  }[];
  onClick?: (row: any) => void;
}

export const TableBase: React.FC<TableProps> = ({
  rows,
  onClick = () => {},
}) => {
  const pageSizeOptions = [5, 10, 15];

  const handleRowClick = (row: any) => {
    onClick(row);
  };

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      sortable: false,
      headerName: 'Actions',
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          color="secondary"
          aria-label="delete row"
          onClick={() => handleRowClick(params.row)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      field: 'loteId',
      headerName: 'Lote ID',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'imei',
      headerName: 'IMEI',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'bodega',
      headerName: 'Bodega',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'service',
      headerName: 'Service',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ];

  return (
    <DataGrid
      autoHeight
      columns={columns}
      disableRowSelectionOnClick
      getRowId={(row) => row.id ?? `${row.loteId}-${row.imei}`}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      pageSizeOptions={pageSizeOptions}
      rows={rows}
    />
  );
};
