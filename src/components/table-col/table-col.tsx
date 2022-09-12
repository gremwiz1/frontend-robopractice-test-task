import { FC } from "react";
import { parseTime } from "../../utils/helpers";
import { ITime} from "../../utils/types";
import TableCell from "../table-cell/table-cell";
import "./table-col.css";
import { v4 as makeUUID } from "uuid";

interface ITableCol {
  data: ITime[] | undefined
}
const TableCol: FC<ITableCol> = ({ data }) => {
  
  return (
    <div className="table-col">
      {data ? 
      data.map((day) => (
        <TableCell data={parseTime(day.time)} key={makeUUID()}/>
      ))
      : ""

      }
    </div>
  );
}

export default TableCol;