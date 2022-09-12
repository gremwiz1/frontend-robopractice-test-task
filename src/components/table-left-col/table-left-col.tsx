import { FC } from "react";
import TableCell from "../table-cell/table-cell";
import "./table-left-col.css";

interface ITableLeftCol {
  data: string[];
  sort: string;
  onSortByName: () => void;
}
const TableLeftCol: FC<ITableLeftCol> = ({ data, sort, onSortByName }) => {
  function sortUser() {
    onSortByName();
  }
  return (
    <div className="table-left-col">
      <TableCell data="User" onSort={sortUser} sort={sort} />
      {data.map((user, id) => (
        <TableCell data={user} key={id} />
      ))}
    </div>
  );
};

export default TableLeftCol;
