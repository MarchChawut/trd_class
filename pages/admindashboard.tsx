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
import { useRouter } from 'next/router'

type Props = {};

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

  const [aaData, setBdata] = React.useState("");
  
  useEffect(() => {
    if(router.query.userid){
      xRequest.post("/admin/usercheckin", {ID: router.query.userid}).then((response) => {
        setBdata("asdf")
        // console.log(response);
      });
    }
    
  }, [router.query.userid]);

  const [aData, setAdata] = React.useState([]);

  useEffect(() => {
    xRequest.get("/admin/getalluser", {}).then((response) => {
      console.log(response);
      setAdata(response.data.resData);
      
    });
  }, [aaData]);

  
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

  return (
    <Box>
      {adminData.Email}

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={aData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </Box>
  );
}
