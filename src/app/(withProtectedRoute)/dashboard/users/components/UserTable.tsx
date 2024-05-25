"use client";
import { useUpdateUserStatusByIdMutation } from "@/redux/api/userApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";
import { toast } from "sonner";

type TUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  status: "ACTIVE" | "DEACTIVE";
  createdAt: string;
  updatedAt: string;
};
type TProps = {
  userList: TUser[];
};
const UserTable = ({ userList }: TProps) => {
  const [updateStatus, { isLoading ,error}] = useUpdateUserStatusByIdMutation();
  // console.log(error);
  
  const handleStatusChange = async (event: any, user_id: string) => {
    try {
      const res = await updateStatus({
        user_id,
        status: event.target.value,
      }).unwrap();
      
      toast.success(res.message||"Status updated successfully!!");
      
    } catch (err: any) {
      console.log(err);
      toast.success(err?.message);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, padding: "1rem 0" }}
        size="small"
        aria-label="user table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user: TUser) => (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                padding: 0,
              }}
              key={user.id}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.status}
                  onChange={(event) => handleStatusChange(event, user.id)}
                  size="small"
                >
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="DEACTIVE">Deactive</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
