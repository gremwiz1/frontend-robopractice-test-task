import { FC } from "react";
import TableCell from "../table-cell/table-cell";
import "./table-left-col.css";

interface ITableLeftCol {
    data: string[];
}
const TableLeftCol: FC<ITableLeftCol> = ({data}) => {
  function sortUser() {

  }
    return (
      <div className="table-left-col">
        <TableCell data='User' onClick={sortUser}/>
        {data.map((user, id) => (
            <TableCell data={user} key={id}/>
        ))}
      </div>
    );
  }
  
  export default TableLeftCol;