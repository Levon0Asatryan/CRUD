import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ConfirmDialog } from "../components/ConfirmDialog";

export const DepartmentList = () => {
  const [departments, setDepartments] = useState(null);
  const [confirmData, setConfirmData] = useState({ show: false });
  const deleteRecord = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    return fetch(
      `${process.env.REACT_APP_API_URL}/department/${id}`,
      requestOptions
    );
  };
  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let res = await fetch(
      `${process.env.REACT_APP_API_URL}/department`,
      requestOptions
    );
    let data = await res.json();
    setDepartments(data);
  }, []);

  return (
    <div>
      <h1>Departments </h1>
      <div>
        <Link to={`/department/new`}>Add new department</Link>
      </div>
      {departments ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Updated</TableCell>
                <TableCell align="right">Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department) => (
                <TableRow
                  key={department.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {department.id}
                  </TableCell>
                  <TableCell align="right">{department.name}</TableCell>
                  <TableCell align="right">{department.description}</TableCell>
                  <TableCell align="right">
                    {department.updated ?? department.created}
                  </TableCell>
                  <TableCell align="right">{department.created}</TableCell>
                  <TableCell align="right">
                    <DeleteIcon
                      onClick={() => {
                        setConfirmData({
                          show: true,
                          onOk: async () => {
                            await deleteRecord(department.id);
                            setDepartments(
                              departments.filter((e) => e.id !== department.id)
                            );
                          },
                          onClose: () => {
                            setConfirmData({ show: false });
                          },
                          message: "some message",
                          title: "Some title",
                        });
                      }}
                    />
                    <Link to={`/department/${department.id}`}>
                      <EditIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>Loading</div>
      )}
      <ConfirmDialog {...confirmData} />
    </div>
  );
};
