import React from "react";
import { FC } from "react";
import SearchInput from "../search-input/search-input";
import * as appApi from "../../utils/app-api";
import { DataContext } from "../../contexts/data-context";
import TableLeftCol from "../table-left-col/table-left-col";
import { IArrayDay, IArrayDays, IUserData } from "../../utils/types";
import Table from "../table/table";
import { countTime } from "../../utils/helpers";
import "./app.css";
import TableRightCol from "../table-right-col/table-right-col";

const App: FC = () => {
  const [data, setData] = React.useState({ data: [] });
  const [currentData, setCurrentData] = React.useState({
    data: [] as IUserData[],
  });
  const [pageData, setPageData] = React.useState({ data: [] as IUserData[] });
  const [isLoading, setIsLoading] = React.useState(false);
  const [fullName, setFullName] = React.useState([] as string[]);
  const [fullNameForPage, setFullNameForPage] = React.useState([] as string[]);
  const [timeTotal, setTimeTotal] = React.useState([] as number[]);
  const [timeTotalForPage, setTimeTotalForPage] = React.useState(
    [] as number[]
  );
  const [numberPage, setNumberPage] = React.useState(1);
  const [quantityUsers, setQuantityUsers] = React.useState(0);
  const quantityElementsOnPage = 10;
  const [arrayDays, setArrayDays] = React.useState({
    arrayDays: [],
  } as IArrayDays);
  const [leftColSort, setLeftColSort] = React.useState("none");
  const [rightColSort, setRightColSort] = React.useState("none");

  React.useEffect(() => {
    const resultDays = [];
    for (let i = 1; i < 32; i++) {
      resultDays.push({ day: i, sort: "none" });
    }
    setArrayDays({ arrayDays: resultDays });
  }, []);

  function onSortByDay(data: string) {
    const day = parseInt(data);
    const newArray: IArrayDay[] = [];
    arrayDays.arrayDays.forEach((elem) => {
      if (elem.day === day) {
        if (elem.sort === "none") {
          elem.sort = "inc";
          currentData.data.sort(function (a, b) {
            if (a.data && b.data) {
              return a.data[day - 1].time - b.data[day - 1].time;
            }
            return 0;
          });
          setStatesBeforSort(currentData.data);
        } else if (elem.sort === "inc") {
          elem.sort = "dec";
          currentData.data.sort(function (a, b) {
            if (a.data && b.data) {
              return b.data[day - 1].time - a.data[day - 1].time;
            }
            return 0;
          });
          setStatesBeforSort(currentData.data);
        } else if (elem.sort === "dec") {
          elem.sort = "inc";
          currentData.data.sort(function (a, b) {
            if (a.data && b.data) {
              return a.data[day - 1].time - b.data[day - 1].time;
            }
            return 0;
          });
          setStatesBeforSort(currentData.data);
        }
        newArray.push(elem);
      } else {
        elem.sort = "none";
        newArray.push(elem);
      }
    });
    setArrayDays({ arrayDays: newArray });
    setLeftColSort("none");
    setRightColSort("none");
  }

  function onSortByName() {
    const newArray: IArrayDay[] = [];
    arrayDays.arrayDays.forEach((elem) => {
      elem.sort = "none";
      newArray.push(elem);
    });
    setArrayDays({ arrayDays: newArray });
    setRightColSort("none");
    if (leftColSort === "none") {
      setLeftColSort("inc");
      currentData.data.sort((n1, n2) => {
        if (n1.Fullname > n2.Fullname) {
          return -1;
        }

        if (n1.Fullname < n2.Fullname) {
          return 1;
        }

        return 0;
      });
      setStatesBeforSort(currentData.data);
    } else if (leftColSort === "inc") {
      setLeftColSort("dec");
      currentData.data.sort((n1, n2) => {
        if (n1.Fullname > n2.Fullname) {
          return 1;
        }

        if (n1.Fullname < n2.Fullname) {
          return -1;
        }

        return 0;
      });
      setStatesBeforSort(currentData.data);
    } else if (leftColSort === "dec") {
      setLeftColSort("inc");
      currentData.data.sort((n1, n2) => {
        if (n1.Fullname > n2.Fullname) {
          return -1;
        }

        if (n1.Fullname < n2.Fullname) {
          return 1;
        }

        return 0;
      });
      setStatesBeforSort(currentData.data);
    }
  }

  function onSortByTimeTotal() {
    const newArray: IArrayDay[] = [];
    arrayDays.arrayDays.forEach((elem) => {
      elem.sort = "none";
      newArray.push(elem);
    });
    setArrayDays({ arrayDays: newArray });
    setLeftColSort("none");
    if (rightColSort === "none") {
      setRightColSort("inc");
      currentData.data.sort(function (a, b) {
        if (a.totalTimeInMonth && b.totalTimeInMonth) {
          return a.totalTimeInMonth - b.totalTimeInMonth;
        }
        return 0;
      });
      setStatesBeforSort(currentData.data);
    } else if (rightColSort === "inc") {
      setRightColSort("dec");
      currentData.data.sort(function (a, b) {
        if (a.totalTimeInMonth && b.totalTimeInMonth) {
          return b.totalTimeInMonth - a.totalTimeInMonth;
        }
        return 0;
      });
      setStatesBeforSort(currentData.data);
    } else if (rightColSort === "dec") {
      setRightColSort("inc");
      currentData.data.sort(function (a, b) {
        if (a.totalTimeInMonth && b.totalTimeInMonth) {
          return a.totalTimeInMonth - b.totalTimeInMonth;
        }
        return 0;
      });
      setStatesBeforSort(currentData.data);
    }
  }

  function getData() {
    appApi.getContent().then((result) => {
      const arrayFullName: string[] = [];
      const arrayTimeTotal: number[] = [];
      result.forEach((user: IUserData) => {
        arrayFullName.push(user.Fullname);
        user.data = [];
        user.Days.forEach((day) => {
          let arrayDay = day.Date.split("-");
          const numberDay = parseInt(arrayDay[arrayDay.length - 1]);
          if (user.data) {
            user.data.push({
              numberDay: numberDay,
              time: countTime(day.Start, day.End),
            });
          }
        });
        let totalTimeInMonth = 0;
        for (let i = 1; i < 32; i++) {
          if (user.data.some((day) => day.numberDay === i)) {
            const currentDay = user.data.find((day) => day.numberDay === i);
            if (currentDay) {
              totalTimeInMonth += currentDay.time;
            }
          } else {
            user.data.push({ numberDay: i, time: 0 });
          }
        }
        user.totalTimeInMonth = totalTimeInMonth;
        arrayTimeTotal.push(totalTimeInMonth);
        user.data.sort(function (a, b) {
          return a.numberDay - b.numberDay;
        });
      });
      setData({ data: result });
      setCurrentData({ data: result });
      const arrayUserForPage = result.slice(0, quantityElementsOnPage);
      setPageData({ data: arrayUserForPage });
      setFullName(arrayFullName);
      setTimeTotal(arrayTimeTotal);
      const arrayFullNameForPage = arrayFullName.slice(
        0,
        quantityElementsOnPage
      );
      const arrayTimeTotalForPage = arrayTimeTotal.slice(
        0,
        quantityElementsOnPage
      );
      setTimeTotalForPage(arrayTimeTotalForPage);
      setFullNameForPage(arrayFullNameForPage);
      setIsLoading(true);
      setQuantityUsers(result.length);
    });
  }

  React.useEffect(() => {
    getData();
  }, []);

  function handleClickReducePage() {
    if (numberPage - quantityElementsOnPage > 0) {
      setPageData({
        data: currentData.data.slice(
          numberPage - quantityElementsOnPage - 1,
          numberPage - 1
        ),
      });
      setTimeTotalForPage(
        timeTotal.slice(numberPage - quantityElementsOnPage - 1, numberPage - 1)
      );
      setFullNameForPage(
        fullName.slice(numberPage - quantityElementsOnPage - 1, numberPage - 1)
      );
      setNumberPage(numberPage - quantityElementsOnPage);
    }
  }

  function handleClickAddPage() {
    if (numberPage + quantityElementsOnPage < quantityUsers) {
      setPageData({
        data: currentData.data.slice(
          numberPage + quantityElementsOnPage - 1,
          numberPage - 1 + 2 * quantityElementsOnPage
        ),
      });
      setTimeTotalForPage(
        timeTotal.slice(
          numberPage + quantityElementsOnPage - 1,
          numberPage - 1 + 2 * quantityElementsOnPage
        )
      );
      setFullNameForPage(
        fullName.slice(
          numberPage + quantityElementsOnPage - 1,
          numberPage - 1 + 2 * quantityElementsOnPage
        )
      );
      setNumberPage(numberPage + quantityElementsOnPage);
    }
  }

  function setStatesBeforSort(data: IUserData[]) {
    setCurrentData({ data: data });
    const arrayUserForPage = data.slice(
      numberPage - 1,
      numberPage - 1 + quantityElementsOnPage
    );
    setPageData({ data: arrayUserForPage });
    const arrayFullName: string[] = [];
    const arrayTimeTotal: number[] = [];
    data.forEach((user) => {
      arrayFullName.push(user.Fullname);
      if (user.totalTimeInMonth) {
        arrayTimeTotal.push(user.totalTimeInMonth);
      }
    });
    setFullName(arrayFullName);
    setFullNameForPage(
      arrayFullName.slice(
        numberPage - 1,
        numberPage - 1 + quantityElementsOnPage
      )
    );
    setTimeTotal(arrayTimeTotal);
    setTimeTotalForPage(
      arrayTimeTotal.slice(
        numberPage - 1,
        numberPage - 1 + quantityElementsOnPage
      )
    );
  }
  return isLoading ? (
    <DataContext.Provider value={currentData}>
      <div className="page">
        <SearchInput />
        <div className="content">
          <TableLeftCol
            data={fullNameForPage}
            sort={leftColSort}
            onSortByName={onSortByName}
          />
          <Table
            data={pageData}
            onSortByDay={onSortByDay}
            arrayDays={arrayDays.arrayDays}
          />
          <TableRightCol
            data={timeTotalForPage}
            sort={rightColSort}
            onSortByTimeTotal={onSortByTimeTotal}
          />
        </div>
        <div className="page-number-block">
          <p>{` ${numberPage} - ${
            quantityUsers > numberPage + quantityElementsOnPage - 1
              ? numberPage + quantityElementsOnPage - 1
              : quantityUsers
          } of ${quantityUsers}`}</p>
          <p className="button-select-page" onClick={handleClickReducePage}>
            {"<"}
          </p>
          <p className="button-select-page" onClick={handleClickAddPage}>
            {">"}
          </p>
        </div>
      </div>
    </DataContext.Provider>
  ) : (
    <div>Грузится...</div>
  );
};

export default App;
