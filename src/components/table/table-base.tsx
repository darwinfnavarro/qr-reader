import React from 'react';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { loteImeiSubject$ } from '@/subjects/lote-imei.subject';
import { QrCode } from '@mui/icons-material';

export interface TableProps {
  rows: {
    id: number;
    loteId: string;
    imei: string[];
    bodega: string;
    service: string;
  }[];
  onClick?: (row: any) => void;
}

export const TableBase: React.FC<TableProps> = ({
  rows,
  onClick = () => {},
}) => {
  const pageSizeOptions = [5, 10, 15];

  const handleRowClickImei = (row: any) => {
    const listOfImeis = row.imei;
    const loteId = row.loteId;
    loteImeiSubject$.open({ listOfImeis, loteId });
  };

  const columns = [
    {
      field: 'loteId',
      headerName: 'ID',
      width: 100,
      renderCell: (params: GridRenderCellParams) => <ul>{params.value}</ul>,
    },

    {
      field: 'IMEI',
      type: 'actions',
      sortable: false,
      headerName: 'IMEI',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          color="secondary"
          aria-label="delete row"
          onClick={() => handleRowClickImei(params.row)}
          variant="contained"
          endIcon={<QrCode />}
        >
          Ver listado de IMEI
        </Button>
      ),
    },
    {
      field: 'bodega',
      headerName: 'Bodega',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'service',
      headerName: 'Plataforma',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: 'date',
      headerName: 'Fecha de Registro',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ];

  return (
    <DataGrid
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
