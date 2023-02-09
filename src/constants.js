import React from "react";

export let store = {
  urlDBsmall: "https://randomuser.me/api/?results=100",
  // "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
  // urlDBsmall: 'https://user4db.herokuapp.com/small',

  urlDBbig: "https://randomuser.me/api/?results=1000",
  // "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
  //   urlDBbig: "https://user4db.herokuapp.com/big",

  url: "https://github.com/yuraCOM/DataBase/blob/main/db.json",

  start: false,

  currentDB: [], // та что в данный момент показывается на странице
  paginateDB: [], // та что меняется - по ней пагинация, поиск
  originalDB: [], // чистая база при загрузке - ее не меняем

  updCurrenDB(data) {
    this.currentDB = data;
  },

  // pagination
  totalRecords: 1000,
  pageLimit: 50,
  totalPages: 0,
  currentPage: 1,

  //search
  notFound: true,
};

export const Context = React.createContext(store);
