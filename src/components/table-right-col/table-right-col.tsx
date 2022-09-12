import { FC } from "react";
import { parseTime } from "../../utils/helpers";
import TableCell from "../table-cell/table-cell";
import "./table-right-col.css";
import { v4 as makeUUID } from "uuid";

interface ITableRightCol {
    data: number[];
}
const TableRightCol: FC<ITableRightCol> = ({data}) => {
  function sortTotalTime() {

  }
    return (
      <div className="table-right-col">
        <TableCell data='Monthly total' onClick={sortTotalTime}/>
        {data.map((totalTime) => (
            <TableCell data={parseTime(totalTime)} key={makeUUID()}/>
        ))}
      </div>
    );
  }
  
  export default TableRightCol;