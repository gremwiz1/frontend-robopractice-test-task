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

const App: FC = () => {
    const [data, setData] = React.useState({data: []});
    const[currentData, setCurrentData] = React.useState({data: []});
    const[pageData, setPageData] = React.useState({data: []});
    const [isLoading, setIsLoading] = React.useState(false);
    const [fullName, setFullName] = React.useState([] as string[]);
    const [fullNameForPage, setFullNameForPage] = React.useState([] as string[]);
    function getData() {
        appApi.getContent()
        .then((result) => {
            const arrayFullName:string[] = [];
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
              user.data.sort(function
                (a, b) {
                    return a.numberDay - b.numberDay;
                })
            });
            setData({data: result});
            setCurrentData({data: result});
            const arrayUserForPage = result.splice(0,10);
            setPageData({data: arrayUserForPage});
            setFullName(arrayFullName);
            const arrayFullNameForPage = arrayFullName.splice(0,10);
            setFullNameForPage(arrayFullNameForPage);
            setIsLoading(true);
        })
    }
    React.useEffect(() => {
        getData();
    }, []);
    return (
      isLoading ?
      <DataContext.Provider value={currentData}>
      <div>
        <SearchInput />
        <div className="content">
          <TableLeftCol data={fullNameForPage}/>
           <Table data={pageData}/>
        </div>
      </div>
      </DataContext.Provider>
      : <div>Грузится...</div>
    );
  }
  
  export default App;