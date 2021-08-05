import React, { useState, useEffect } from "react";
import { fetchSearchResult } from "../user/helper/userapicalls";
import { ListGroup } from "react-bootstrap";
import _ from "lodash";
import { useHistory } from "react-router-dom";


const SearchBox = (props) => {
  const history = useHistory();
  const [search, setSearch] = useState({
    keyword: "",
    error: false,
    result: [],
    loading: false,
    message: "",
  });

  const { keyword, result } = search;

const changehandler = _.debounce((event) => {
    props.setName(event.target.value)
    //   let keyword = event.target.value
//   if(keyword){
//     fetchSearchResult({keyword: keyword}).then((data) => {
//       if (data.error) {
//         setSearch({
//           ...search,
//           error: data.error,
//         });
//       } else {
//         setSearch({ ...search, result: data });
//       }
//     })
//   }
//   else{
//     setSearch({ ...search, result: [] });
//   }
},1)

  const clickHandler = (event) => {
    alert("ff");
    // history.push({
    //   companyId: event.target.getAttribute("value"),
    //   pathname: "/Detailpage",
    // });
  };

  const ListItems = () => (
    <ListGroup>
      {result.map((list, idx) => (
        <li
          key={idx}
          value={list._id}
          onClick={clickHandler}
          className="text-left  list-group-item"
        >
          {list.market_cap}
        </li>
      ))}
    </ListGroup>
  );

  return (
    <div className="col-md-8  mx-auto mt-5 ">
      <input
        type="text"
        className="form-control searchBox"
        placeholder="Search Employee ..."
        onChange={changehandler}
        defaultValue={props.keyword}
        name="search"
      />
      <ListItems />
    </div>
  );
}; 
export default SearchBox;