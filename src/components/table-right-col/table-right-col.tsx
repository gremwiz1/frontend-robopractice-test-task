import { FC } from "react";
import { parseTime } from "../../utils/helpers";
import TableCell from "../table-cell/table-cell";
import "./table-right-col.css";
import { v4 as makeUUID } from "uuid";

interface ITableRightCol {
  data: number[];
  sort: string;
  onSortByTimeTotal: () => void;
}
const TableRightCol: FC<ITableRightCol> = ({
  data,
  sort,
  onSortByTimeTotal,
}) => {
  function sortTotalTime() {
    onSortByTimeTotal();
  }
  return (
    <div className="table-right-col">
      <TableCell data="Monthly total" onSort={sortTotalTime} sort={sort} />
      {data.map((totalTime) => (
        <TableCell data={parseTime(totalTime)} key={makeUUID()} />
      ))}
    </div>
  );
};

export default TableRightCol;
