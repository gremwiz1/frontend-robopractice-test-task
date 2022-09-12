import { FC } from "react";
import { IArrayDay, IData } from "../../utils/types";
import TableCell from "../table-cell/table-cell";
import TableCol from "../table-col/table-col";
import "./table.css";
import { v4 as makeUUID } from "uuid";

interface ITable {
  data: IData;
  arrayDays: IArrayDay[];
  onSortByDay: (data: string) => void;
}
const Table: FC<ITable> = ({ data, arrayDays, onSortByDay }) => {
  function onClick(data: string) {
    onSortByDay(data);
  }

  return (
    <div className="table">
      <div className="table-content">
        <div className="table-row-content">
          {arrayDays.map((day) => (
            <TableCell
              data={day.day.toString()}
              key={makeUUID()}
              sort={day.sort}
              onSort={onClick}
            />
          ))}
        </div>
        {data.data.map((user) => (
          <TableCol data={user.data} key={user.id} />
        ))}
      </div>
    </div>
  );
};

export default Table;
