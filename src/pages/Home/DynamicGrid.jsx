import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const DynamicGrid = ({ data, onDelete }) => {
  return (
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
                <button
                  onClick={(e) => {
                    const tr = e.target.closest("tr");
                    const id = tr.getAttribute("data-id");
                    onDelete(id);
                    console.log(id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} className="mx-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicGrid;
