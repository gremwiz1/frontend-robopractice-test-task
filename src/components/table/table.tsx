import { FC } from "react";
import { IData } from "../../utils/types";
import TableCell from "../table-cell/table-cell";
import TableCol from "../table-col/table-col";
import "./table.css";
import { v4 as makeUUID } from "uuid";

interface ITable {
  data: IData
}
const Table: FC<ITable> = ({ data }) => {
  const arrayDays = [];
  for (let i = 1; i < 32; i++) {
    arrayDays.push(i);
  }

  return (
    <div className="table">
      <div className="table-content">
        <div className="table-row-content">
          {arrayDays.map((day, id) => (
            <TableCell data={day.toString()} key={makeUUID()} />
          ))}
        </div>
        {data.data.map(user => (
          <TableCol data={user.data} key={user.id}/>
        ))}
      </div>

    </div>
  );
}

export default Table;