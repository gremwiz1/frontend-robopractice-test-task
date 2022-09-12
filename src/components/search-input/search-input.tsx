import React, { ChangeEvent } from "react";
import { FC } from "react";
import "./search-input.css";

interface ISearchInput {
  searchUserByName: (name: string) => void;
  clearState: () => void;
}
const SearchInput: FC<ISearchInput> = ({ searchUserByName, clearState }) => {
  const [textInput, setTextInput] = React.useState("");

  function handleChangeInput(e: ChangeEvent) {
    const element = e.target as HTMLInputElement;
    setTextInput(element.value);
  }

  function handleClick() {
    if (textInput.length > 0) {
      searchUserByName(textInput);
      setTextInput("");
    }
  }

  function handleClear() {
    clearState();
  }
  return (
    <div className="search">
      <input
        className="input"
        onChange={handleChangeInput}
        value={textInput}
        type="text"
      />
      <button className="button-search" onClick={handleClick}>
        Искать
      </button>
      <button className="button-search button-clear" onClick={handleClear}>
        Сбросить все
      </button>
    </div>
  );
};

export default SearchInput;
