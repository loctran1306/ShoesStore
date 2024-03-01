// @mui
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
// assets
// components
import { useEffect, useState } from 'react';
import { _productsTable } from 'src/_mock';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import ModalActionShoes from '../components/Modals/Shoes/ModalActionShoes';
import { getComparator, stableSort } from '../components/orders';
import ViewTableHead from '../components/table/TableHead';
import ViewTableRow from '../components/table/TableRow';
import { getAllShoesAddTodayService } from '../services/product';
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TABLE_HEAD_SHOES = [
  { id: 'stt', label: 'STT', width: 50 },
  { id: 'name', label: 'Shoes Name', width: 200 },
  { id: 'price', label: 'Price', width: 160 },
  { id: 'size', label: 'Size', width: 160 },
  { id: 'quantity', label: 'Quantity', width: 50 },
  { id: 'status', label: 'Status', width: 50 },
  { id: '' },
];

export default function AccountManageShoes() {
  // Get Data
  const [shoesAddTodayList, setShoesAddTodayList] = useState<any[]>([]);

  const navigate = useNavigate();
  const getAllShoesAddToday = async () => {
    const res = await getAllShoesAddTodayService();
    if (res) {
      setShoesAddTodayList(res);
    }else{
      navigate('/40]');
    }
  };

  useEffect(() => {
    getAllShoesAddToday();
  }, []);

  // Show Change Password
  const [showModalAddShoes, setShowModalAddShoes] = useState<boolean>(false);

  // Table
  const [dense, setDense] = useState<boolean>(false);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('orderId');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (id: string) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // const newSelected = _productsTable.map((n) => n.id);
      // setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectRow = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - _productsTable.length) : 0;

  return (
    <Stack>
      <Stack mb={3} direction="row" alignItems="center" justifyContent="space-between">
        <Typography fontSize={20} fontWeight={700}>
          List Shoes Add Today
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography fontSize={14} fontWeight={600}>
            Add New Shoes
          </Typography>
          <IconButton onClick={() => setShowModalAddShoes(!showModalAddShoes)}>
            <Iconify
              color={`${showModalAddShoes ? 'red' : 'green'}`}
              icon={`${showModalAddShoes ? 'mdi:cancel-bold' : 'mdi:add-bold'}`}
              sx={{ width: 16, height: 16, cursor: 'pointer' }}
            />
          </IconButton>
        </Stack>
      </Stack>
      {showModalAddShoes && (
        <ModalActionShoes openModal={showModalAddShoes} handleCloseModal={setShowModalAddShoes} />
      )}
      <TableContainer
        sx={{
          overflow: 'unset',
          '& .MuiTableCell-head': {
            color: 'text.primary',
          },
          '& .MuiTableCell-root': {
            bgcolor: 'background.default',
            borderBottomColor: (theme) => theme.palette.divider,
          },
        }}
      >
        {/* <AccountOrdersTableToolbar
          rowCount={_productsTable.length}
          numSelected={selected.length}
          onSelectAllRows={handleSelectAllRows}
        /> */}

        <Scrollbar>
          <Table
            sx={{
              minWidth: 720,
            }}
            size={dense ? 'small' : 'medium'}
          >
            <ViewTableHead
              order={order}
              orderBy={orderBy}
              onSort={handleSort}
              headCells={TABLE_HEAD_SHOES}
              onSelectAllRows={handleSelectAllRows}
            />

            <TableBody>
              {shoesAddTodayList.map((row, index: number) => (
                <ViewTableRow
                  key={row.id}
                  index={index + 1}
                  row={row}
                  selected={selected.includes(row.id)}
                  onSelectRow={() => handleSelectRow(row.id)}
                  data={row}
                  tableHead={TABLE_HEAD_SHOES}
                  handleClick={() => {}}
                />
              ))}

              {emptyRows > 0 && (
                <TableRow
                  sx={{
                    height: (dense ? 36 : 57) * emptyRows,
                  }}
                >
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Stack>
  );
}
