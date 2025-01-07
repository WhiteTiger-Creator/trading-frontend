import React, { useEffect, useState } from 'react';
import { tradingAPI } from '../../../services/api';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    height: 400,
  },
});

const columns = [
  { id: 'date',
    label: 'Date',
    minWidth: 250,
    format: (value) => {
      const date = new Date(value);
      return date.toLocaleString();
    }
  },
  {
    id: 'address',
    label: 'Address',
    minWidth: 250
  },
  {
    id: 'amount',
    label: 'Withdraw Amount',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'balance',
    label: 'Remain Balance',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];


const ActivityDashboard = () => {
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getInitData = async () => {
    const history = await tradingAPI.withdrawHistory();
    setWithdrawHistory(history);
  }

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <div style={{ marginTop: "80px", padding: '0 30px'}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Paper
          sx={{
            width: "100%",
            backgroundColor: "inherit",
          }}
        >
          <TableContainer
            sx={{
              color: "white",
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              },
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {withdrawHistory
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={withdrawHistory.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default ActivityDashboard;