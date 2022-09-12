import React from "react";
import { FC } from "react";
import SearchInput from "../search-input/search-input";
import * as appApi from "../../utils/app-api";
import { DataContext } from "../../contexts/data-context";
import TableLeftCol from "../table-left-col/table-left-col";
import { IUserData } from "../../utils/types";
import Table from "../table/table";
import { countTime } from "../../utils/helpers";
import "./app.css";
import TableRightCol from "../table-right-col/table-right-col";

const App: FC = () => {
    const [data, setData] = React.useState({data: []});
    const[currentData, setCurrentData] = React.useState({data: []});
    const[pageData, setPageData] = React.useState({data: []});
    const [isLoading, setIsLoading] = React.useState(false);
    const [fullName, setFullName] = React.useState([] as string[]);
    const [fullNameForPage, setFullNameForPage] = React.useState([] as string[]);
    const [timeTotal, setTimeTotal] = React.useState([] as number[]);
    const [timeTotalForPage, setTimeTotalForPage] = React.useState([] as number[]);
    const [numberPage, setNumberPage] = React.useState(1);
    const [quantityUsers, setQuantityUsers] = React.useState(0);
    const quantityElementsOnPage = 10;
    function getData() {
        appApi.getContent()
        .then((result) => {
            const arrayFullName:string[] = [];
            const arrayTimeTotal:number[] = [];
            result.forEach((user:IUserData) => {
              arrayFullName.push(user.Fullname);
              user.data= [];
              user.Days.forEach((day) => {
                let arrayDay = day.Date.split('-');
                const numberDay = parseInt(arrayDay[arrayDay.length-1]);
                if(user.data) {
                  user.data.push({numberDay: numberDay, time: countTime(day.Start, day.End)});
                } 
              });
              let totalTimeInMonth = 0;
              for(let i=1;i<32;i++) {
                if(user.data.some(day => day.numberDay === i)) {
                  const currentDay = user.data.find(day => day.numberDay === i);
                  if(currentDay) {
                    totalTimeInMonth += currentDay.time;
                  }  
                }
                else {
                  user.data.push({numberDay: i, time: 0})
                }
              };
              user.totalTimeInMonth = totalTimeInMonth;
              arrayTimeTotal.push(totalTimeInMonth);
              user.data.sort(function
                (a, b) {
                    return a.numberDay - b.numberDay;
                })
            });
            setData({data: result});
            setCurrentData({data: result});
            const arrayUserForPage = result.slice(0,quantityElementsOnPage);
            setPageData({data: arrayUserForPage});
            setFullName(arrayFullName);
            setTimeTotal(arrayTimeTotal);
            const arrayFullNameForPage = arrayFullName.slice(0,quantityElementsOnPage);
            const arrayTimeTotalForPage = arrayTimeTotal.slice(0,quantityElementsOnPage);
            setTimeTotalForPage(arrayTimeTotalForPage);
            setFullNameForPage(arrayFullNameForPage);
            setIsLoading(true);
            setQuantityUsers(result.length);
        })
    }
    React.useEffect(() => {
        getData();
    }, []);
    function handleClickReducePage() {
      if((numberPage-quantityElementsOnPage)>0) {
        setPageData({data: currentData.data.slice(numberPage-quantityElementsOnPage-1,numberPage-1)});
        setTimeTotalForPage(timeTotal.slice(numberPage-quantityElementsOnPage-1,numberPage-1));
        setFullNameForPage(fullName.slice(numberPage-quantityElementsOnPage-1,numberPage-1));
        setNumberPage(numberPage-quantityElementsOnPage)
      }
    }
    function handleClickAddPage() {
      if((numberPage+quantityElementsOnPage)<quantityUsers) {
        setPageData({data: currentData.data.slice(numberPage+quantityElementsOnPage-1,numberPage-1+2*quantityElementsOnPage)});
        setTimeTotalForPage(timeTotal.slice(numberPage+quantityElementsOnPage-1,numberPage-1+2*quantityElementsOnPage));
        setFullNameForPage(fullName.slice(numberPage+quantityElementsOnPage-1,numberPage-1+2*quantityElementsOnPage));
        setNumberPage(numberPage+quantityElementsOnPage)
      }
    }
    return (
      isLoading ?
      <DataContext.Provider value={currentData}>
      <div className="page">
        <SearchInput />
        <div className="content">
          <TableLeftCol data={fullNameForPage}/>
           <Table data={pageData}/>
           <TableRightCol data={timeTotalForPage}/>
        </div>
        <div className="page-number-block">
        
        <p>{` ${numberPage} - ${quantityUsers>numberPage+quantityElementsOnPage-1 ? numberPage+quantityElementsOnPage-1 : quantityUsers} of ${quantityUsers}`}</p>
        <p className="button-select-page" onClick={handleClickReducePage}>{'<'}</p>
        <p className="button-select-page" onClick={handleClickAddPage}>{'>'}</p>
        </div>
      </div>
      </DataContext.Provider>
      : <div>Грузится...</div>
    );
  }
  
  export default App;