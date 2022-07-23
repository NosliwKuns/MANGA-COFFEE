import { SetState } from 'immer/dist/internal';
import React from 'react'

const AdminTable = ({setPag}:any)=> {
  return (
    <>
      <button
        onClick={() => {
          window.localStorage.setItem("pagAdmin", "3");
          setPag("3");
        }}
      >
        All Users
      </button>
      <button
        onClick={() => {
          window.localStorage.setItem("pagAdmin", "4");
          setPag("4");
        }}
      >
        Advertising
      </button>
      <button
        onClick={() => {
          window.localStorage.setItem("pagAdmin", "5");
          setPag("5");
        }}
      >
        Create Manga
      </button>
      <button
        onClick={() => {
          window.localStorage.setItem("pagAdmin", "6");
          setPag("6");
        }}
      >
        Create Product
      </button>
    </>
  )
}

export default AdminTable