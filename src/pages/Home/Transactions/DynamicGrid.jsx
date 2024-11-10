import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import useMediaQuery from "react-responsive";

const DynamicGrid = ({ data, onDelete }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const col = () => [
    {
      field: "description",
      headerName: "Descrizione",
      width: isMobile ? 50 : 300,
    },
    {
      field: "amount",
      headerName: "Quantità",
      valueFormatter: (params) => {
        return `${params}€`;
      },
      width: isMobile ? 50 : 300,
    },
    {
      field: "category",
      headerName: "Categorie",
      width: isMobile ? 50 : 300,
    },
    { field: "data", headerName: "Date", width: isMobile ? 50 : 300 },
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
      width: isMobile ? 50 : 300,
    },
  ];

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
