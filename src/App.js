import React from "react";
import "./App.css";
import DataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import { Button } from "@material-ui/core";

function App() {
  let [rows, setRows] = React.useState([]);
  let [columns, setColumns] = React.useState([]);

  React.useEffect(() => {
    console.log("hello world");

    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
        let _columns;
        if (data.length > 0) {
          _columns = Object.keys(data[0]).map((key) => ({
            key: key,
            name: key.toUpperCase(),
            editable: true,
          }));
          setColumns(_columns);
        }

        console.log({ data, _columns });
      });
  }, []);

  function handleEdit({ action, fromRow, toRow, updated }) {
    let _rows = rows;
    for (let i = fromRow; i <= toRow; i++) {
      Object.assign(_rows[i], updated);
    }
    setRows(_rows);
  }

  function handleSave() {
    fetch("http://localhost:8080/", {
      method: "POST",
      body: JSON.stringify(rows),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <div className="App">
      <DataGrid columns={columns} rows={rows} onRowsUpdate={handleEdit} />
      <Button
        onClick={handleSave}
        color="secondary"
        variant="contained"
        fullWidth={true}
      >
        Save
      </Button>
    </div>
  );
}

export default App;
