import React, { useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { xRequest } from "../utils/request";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Box, Chip, ChipProps } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from 'next/router';
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

type Props = {};

interface IUserData {
  id: number,
  Title: string;
  FirstLastName: string;
}

export interface IAdminData {
  Title: string;
  FirstLastName: string;
  Email: string;
}

export default function Admindashboard({}: Props) {
  const router = useRouter()
  const [adminData, setAdminData] = React.useState<IAdminData>({
    Title: "",
    FirstLastName: "",
    Email: "",
  });

  useEffect(() => {
    xRequest.get("/admin/info", {}).then((response) => {
      setAdminData(response.data.resData[0]);

    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [userData, setUserData] = React.useState<IUserData>({
    id: 0,
    Title: "",
    FirstLastName: "",
  });

  useEffect(() => {
    console.log(adminData.FirstLastName)
    if(router.query.userid && adminData.FirstLastName.length > 0){
      xRequest.post("/admin/usercheckin", {ID: router.query.userid}).then((response) => {
        setUserData(response.data.resData)
        handleOpen()
      });
    }
    
  }, [router.query.userid]);

  const [aData, setAdata] = React.useState([]);

  useEffect(() => {
    xRequest.get("/admin/getalluser", {}).then((response) => {
      console.log(response);
      setAdata(response.data.resData);
      
    });
  }, [userData]);

  
  //Title, FirstLastName, Email, member, is_check_in
  const columns: GridColDef[] = [
    { field: "id", headerName: "ลำดับ", width: 70 },
    { field: "Title", headerName: "คำนำหน้า", width: 70 },
    { field: "FirstLastName", headerName: "ชื่อ-สกุล", width: 260 },
    { field: "Email", headerName: "อีเมล", width: 130 },
    { field: "member", headerName: "สังกัด", width: 500 },
    // { field: 'is_check_in', headerName: 'มาแล้ว', width: 70 },

    {
      field: "is_check_in",
      headerName: "Status",
      renderCell: (params) => {
        if (params.value == 1) {
          return <CheckIcon />;
        } else {
          return <ClearIcon />;
        }
      },
    },
  ];
  //Title, FirstLastName, Email, member, is_check_in
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box>
      <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               ลำดับที่ {userData.id} {userData.Title}{userData.FirstLastName}
              </Typography>
            </Box>
          </Modal>


      {adminData.Email}

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={aData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 10]}
        />
      </div>
    </Box>
  );
}
