import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const col = (onDelete) => [
  { field: "description", headerName: "Descrizione" },
  {
    field: "amount",
    headerName: "Importo",
    valueFormatter: (params) => {
      return `${params}€`;
    },
  },
  { field: "category", headerName: "Categoria" },
  { field: "data", headerName: "Data" },
  {
    field: "delete",
    headerName: "Elimina",
    renderCell: (params) => {
      return (
        <button
          onClick={() => {
            const id = params.row.id;
            onDelete(id);
          }}
        >
          <FontAwesomeIcon icon={faTrash} className="mx-2" />
        </button>
      );
    },
  },
];
const DynamicGrid = ({ data, onDelete }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <DataGrid
        rows={data}
        columns={col(onDelete)}
        pageSize={10}
        slots={{ toolbar: GridToolbar }}
        sx={{
          "& .MuiDataGrid-root": {
            backgroundColor: "#ffffff",
          },
          "& .MuiDataGrid-cell": {
            color: "#e2e8f0",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#e2e8f0",
            color: "1e3a8a",
            fontSize: "1rem",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#e2e8f0",
            color: "#ffffff",
          },
          "& .MuiDataGrid-toolbarContainer": {
            backgroundColor: "#e2e8f0",
            color: "#ffffff",
          },
        }}
      />
    </div>
  );
};

export default DynamicGrid;
