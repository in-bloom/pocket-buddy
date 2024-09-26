import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const col = (onDelete) => [
  { field: "description", headerName: "Descrizione", width: 300 },
  {
    field: "amount",
    headerName: "Importo",
    width: 300,
    valueFormatter: (params) => {
      return `${params}€`;
    },
  },
  { field: "category", headerName: "Categoria", width: 300 },
  { field: "data", headerName: "Data", width: 250 },
  {
    field: "delete",
    headerName: "Elimina",
    width: 150,
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
    <div style={{ width: "100" }}>
      <DataGrid
        rows={data}
        columns={col(onDelete)}
        pageSize={10}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
};

export default DynamicGrid;
