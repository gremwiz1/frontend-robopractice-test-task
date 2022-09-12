import { FC } from "react";
import "./table-cell.css";

interface ITableCell {
  data: string;
  onSort?: any;
  sort?: string; //('dec' | 'inc' | 'none')
}

const TableCell: FC<ITableCell> = ({ data, onSort, sort }) => {
  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (onSort) {
      onSort(data);
    }
  };

  return (
    <div className="cell" onClick={handleClick}>
      {data}
      {sort === "inc" ? "↑" : ""}
      {sort === "dec" ? "↓" : ""}
    </div>
  );
};

export default TableCell;
