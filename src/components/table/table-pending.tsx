import React from 'react';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { loteImeiSubject$ } from '@/subjects/lote-imei.subject';
import { Check, Clear, QrCode } from '@mui/icons-material';
import { authorizeLote, rejectLote } from '@/services/lote.service';

export interface TablePendingProps {
  rows: {
    id: number;
    loteId: string;
    imei: string[];
    bodega: string;
    service: string;
    date: string; // Asegúrate de que 'date' sea un string que representa una fecha
  }[];
  onClick?: (row: any) => void;
}

export const TablePending: React.FC<TablePendingProps> = ({ rows }) => {
  const pageSizeOptions = [5, 10, 15];

  const handleRowClickAuthorize = async (row: any) => {
    const loteId = row.loteId;
    authorizeLote(loteId);
  };

  const handleRowClickReject = async (row: any) => {
    const loteId = row.loteId;
    rejectLote(loteId);
  };

  const handleRowClickImei = (row: any) => {
    const listOfImeis = row.imei;
    const loteId = row.loteId;
    loteImeiSubject$.open({ listOfImeis, loteId });
  };

  // Asegúrate de que las fechas estén ordenadas antes de pasarlas a DataGrid
  const sortedRows = [...rows].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Orden descendente
  });

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
    {
      field: 'Response',
      type: 'actions',
      sortable: false,
      headerName: 'Autorizar',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <IconButton
            color="secondary"
            aria-label="approve row"
            onClick={() => handleRowClickAuthorize(params.row)}
          >
            <Check />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="reject row"
            onClick={() => handleRowClickReject(params.row)}
          >
            <Clear />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <DataGrid
      columns={columns}
      disableRowSelectionOnClick
      getRowId={(row) => row.id ?? `${row.loteId}-${row.imei}`}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
        sorting: {
          sortModel: [{ field: 'date', sort: 'desc' }], // Orden descendente por la fecha
        },
      }}
      pageSizeOptions={pageSizeOptions}
      rows={sortedRows}
    />
  );
};
