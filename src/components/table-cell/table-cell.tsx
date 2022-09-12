import { FC } from "react";
import "./table-cell.css";

interface ITableCell {
  data: string;
  onSort?: any;
  sort?: string; //('dec' | 'inc' | 'none')
  clickable?: boolean;
}

const TableCell: FC<ITableCell> = ({ data, onSort, sort, clickable }) => {
  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    if (onSort) {
      onSort(data);
    }
  };

  return (
    <div className={clickable ? "cell cell-up" : "cell"} onClick={handleClick}>
      {data}
      {sort === "inc" ? "↑" : ""}
      {sort === "dec" ? "↓" : ""}
    </div>
  );
};

export default TableCell;
