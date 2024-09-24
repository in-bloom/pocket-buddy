import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const col = (onDelete) => [
  { field: "description", headerName: "Descrizione", width: 200 },
  {
    field: "amount",
    headerName: "Importo",
    width: 200,
    valueFormatter: (params) => {
      return `-${params}€`;
    },
  },
  { field: "category", headerName: "Categoria", width: 200 },
  { field: "data", headerName: "Data", width: 200 },
  {
    field: "delete",
    headerName: "Elimina",
    width: 200,
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
  /* return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border-b">Descrizione</th>
            <th className="border-b">Importo</th>
            <th className="border-b">Categoria</th>
            <th className="border-b">Data</th>
            <th className="border-b">Elimina</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 text-center"
              data-id={item.id}
            >
              <td className="border-b">{item.description}</td>
              <td className="border-b">{item.amount}€</td>
              <td className="border-b">{item.category}</td>
              <td className="border-b">{item.data}</td>
              <td className="border-b">
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ); */

  return (
    <div style={{ height: 400, width: "100%" }}>
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
