import { Add, Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import StartIconButton from '../components/Button/StartIconButton'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom'


const Tournaments = () => {

    const columns = [
        { id: 'game_id', label: 'Game Id', minWidth: 170 },
        { id: 'contest_name', label: 'Contest Name', minWidth: 100 },
        {id: 'action', label: 'Action',minWidth: 100}
      ];

      const createAction = (id) => (
        <>
            <Stack direction="row" spacing={2}>
                <IconButton>
                    <RemoveRedEye />
                </IconButton>
                <IconButton>
                    <Edit />
                </IconButton>
                <IconButton>
                    <Delete />
                </IconButton>
            </Stack>
        </>
      )

      
    function createData(game_id,contest_name) {
        return {game_id,contest_name,action: createAction(1) };
    }
    
    const rows = [
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),
        createData('OC388383', 'Herry MUD'),

    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
  
  return (
    <>
        <Container maxWidth	='100%'>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Typography variant="h3" component='h3'>
                    Tournaments
                </Typography>
                <Link to={'/create-tournaments'}>
                    <StartIconButton text='Add New' variant='contained' icon={<Add />} />
                </Link>
            </Stack>

            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '24px' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
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
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <React.Fragment key={column.id}>
                                        <TableCell align={column.align}>
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                    </React.Fragment>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </Paper>
        </Container>
    </>
  )
}

export default Tournaments