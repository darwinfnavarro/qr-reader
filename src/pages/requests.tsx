import {
  getAuthorizedLotes,
  getPendingLotes,
  getRejectedLotes,
  Lote,
} from '@/services/lote.service';
import { LoteImeiDialog, TablePending, TableBase } from '@/components';
import { useEffect, useState } from 'react';

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const Requests = () => {
  const [pending, setPending] = useState<Lote[] | []>([]);
  const [approved, setApproved] = useState<Lote[] | []>([]);
  const [rejected, setRejected] = useState<Lote[] | []>([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const loadLotes = async () => {
    const pendingLotes = await getPendingLotes();
    const approvedLotes = await getAuthorizedLotes();
    const rejectedLotes = await getRejectedLotes();

    setPending(pendingLotes);
    setApproved(approvedLotes);
    setRejected(rejectedLotes);
  };

  useEffect(() => {
    loadLotes();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1>Solicitudes</h1>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Pendientes" {...a11yProps(0)} />
            <Tab label="Autorizados" {...a11yProps(1)} />
            <Tab label="Rechazados" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TablePending rows={pending} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TableBase rows={rejected} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TableBase rows={approved} />
        </CustomTabPanel>
      </Box>

      <LoteImeiDialog />
    </div>
  );
};

export default Requests;
