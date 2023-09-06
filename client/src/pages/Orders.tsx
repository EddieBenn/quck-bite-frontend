import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getOrderCount } from "../slices/orderCountSlice";
import Navbar from "../components/dashboard/Navbar";
import { Box, IconButton } from "@mui/material";
import Sidenav from "../components/dashboard/sidenav";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";
import axios from "../api/httpService";
import { useState } from "react";
import OrdersModal from '../components/VendorAllFoodModal'
interface Column {
  id: "food_name" | "quantity" | "amount" | "status" | "isPaid" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: any//((value: number) => string) | undefined
}

const columns: readonly Column[] = [
  { id: "food_name", label: "Name", minWidth: 70 },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 100,
    align: "center",
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    align: "center",
  },
  { id: "status", label: "Status", minWidth: 100, align: "center" },
  // { id: "isPaid", label: "Paid", minWidth: 100, align: "center" },
  {
    id: "actions",
    label: "Actions",
    align: "center",
  },
];

interface Data {
  food_name: string;
  quantity: number;
  amount: number;
  status: string;
  actions: string;
  orderId: string;
}

function createData(
  food_name: string,
  quantity: number,
  amount: number,
  status: string,
  orderId: string
  // isPaid: boolean,
): Data {
  return {
    food_name,
    quantity,
    amount,
    status,
    // isPaid,
    actions: "actions",
    orderId
  };
}

export default function VendorOrder() {
  const dispatch = useAppDispatch();
  const { vendorOrder, isLoading } = useAppSelector(
    (state) => state.vendorOrder
  );

  React.useEffect(() => {
    dispatch(getOrderCount());
  }, [dispatch]);
  const rows = vendorOrder?.map((order: any) =>
    createData(
      order.name,
      order.quantity,
      order.itemTotal,
      order.status,
      order.id
      // order.isPaid
    )
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Data | null>(null);

    const handleEditClick = (row: Data) => {
        setSelectedRow(row);
        setShowEditModal(true);
        localStorage.setItem('orderid', row.orderId)
    };
    
    const handleDeleteClick = async (row: Data) => {
        // Implement the delete logic here
        // console.log("Delete clicked for:", row);
           // Find the index of the selected row in the rows array
            try{
                // e.preventDefault()
                const orderid = row.orderId
                localStorage.setItem('orderid', row.orderId)
                const {data} = await axios.delete(`/vendor/deleteorder/${orderid}`)
                toast.success(data.message)
                dispatch(getOrderCount());
                
              } catch (error:any) {
                if (error.response) {
                  return toast.error(error.response.data.message);
                }
                if (error.request) {
                  return toast.error("Network Error");
                }
                if (error.message) {
                  return toast.error(error.message);
                }
              }
    };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Navbar />
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.food_name}>
                          {columns.map((column) => {
                            //console.log("col", column);
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "actions" ? (
                                  <TableCell key="actions" align="center">
                                    <IconButton onClick={() => handleEditClick(row)}>
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(row)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                ) : (
                                  column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value
                                )}
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
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
            {showEditModal && <OrdersModal onClose={() => setShowEditModal(false)} isOpen={true} />}
        </Box>
      </Box>
    </>
  );
}