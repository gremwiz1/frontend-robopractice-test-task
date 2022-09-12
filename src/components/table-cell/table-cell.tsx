import { FC } from "react";
import  "./table-cell.css";

interface ITableCell {
    data: string;
    onClick?: () => void;
}

const TableCell: FC<ITableCell> = ({data, onClick}) => {

    function handleClick() {
        if(onClick) {
            onClick();
        }
    }

    return (
      <div className="cell" onClick={handleClick}>
        {data}
      </div>
    );
  }
  
  export default TableCell;