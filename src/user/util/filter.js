import { React, useState } from "react";

const Filter = () => {

  const ListItem = ({ type = "checkbox", name, htmlFor, label, onChange, checked }) => {
    console.log(checked)
    return (
      <li>
        <input type={type} name={name} checked={checked} onChange={onChange}/>
        <label htmlFor={htmlFor}>{label}</label>
      </li>
    )
  };

  const [isChecked, setIsChecked] = useState({
    all: false,
    without: false,
    one: false,
    two: false,
    three: false,
  })

  const handleChange = ({ target : { name, checked } }) => {
    setIsChecked({ 
      ...isChecked, 
      [name]: checked 
    })
  }

  const checkboxes = [
    {
      key: "all",
      name: "all",
      htmlFor: "all",
      label: "Все"
    },
    {
      key: "without",
      name: "without",
      htmlFor: "without",
      label: "Без пересадок"
    },
    {
      key: "one",
      name: "one",
      htmlFor: "one",
      label: "1 пересадка"
    },
    {
      key: "two",
      name: "two",
      htmlFor: "two",
      label: "2 пересадки"
    },
    {
      key: "three",
      name: "three",
      htmlFor: "three",
      label: "3 пересадки"
    },
  ];
  return (
    <div className="content__filter">
      <div className="content__filter__name">
        Количество пересадок
      </div>
      <div className="content__filter__list">
        <ul>
          {checkboxes.map(item => (
            <ListItem 
              key={item.key}
              name={item.name} 
              htmlFor={item.htmlFor} 
              label={item.label}
              checked={isChecked[item.name]}
              onChange={handleChange}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;