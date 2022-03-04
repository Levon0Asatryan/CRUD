import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export const Department = () => {
  const [department, setDepartment] = useState({ name: "", description: "" });
  const { id } = useParams();
  const handlSubmit = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: id === "new" ? "POST" : "PUT",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify(department),
    };
    let url = `${process.env.REACT_APP_API_URL}/department${
      id !== "new" ? `/${id}` : ""
    }`;
    let res = await fetch(url, requestOptions);
  };
  useEffect(async () => {
    if (id && id !== "new") {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      let res = await fetch(
        `${process.env.REACT_APP_API_URL}/department/${id}`,
        requestOptions
      );
      let data = await res.json();
      const { name, description } = data;
      setDepartment({ name, description });
    }
  }, [id]);
  return (
    <>
      <TextField
        label="Name"
        value={department.name}
        variant="outlined"
        onChange={(e) => {
          setDepartment({ ...department, name: e.target.value });
        }}
      />
      <TextField
        label="Desciption"
        value={department.description}
        variant="outlined"
        onChange={(e) => {
          setDepartment({ ...department, description: e.target.value });
        }}
      />
      <Button onClick={handlSubmit} variant="primary">
        {id !== "new" ? "Update Department" : "Create Department"}
      </Button>
      <div>Department{JSON.stringify(department)}</div>
    </>
  );
};
