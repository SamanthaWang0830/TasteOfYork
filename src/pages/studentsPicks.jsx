import "./studentsPicks.css";
import { useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import PickItem from "../components/pickItem";

const DUMMY_PICKS = [
  {
    id: "p1",
    name: "Wendy's Cheeseburger",
    description: "the best burger in the world",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn3OWGFMaMFqNrGVS9uWuMcArGBApGOESM6g&usqp=CAU",
    like: 100,
    dislike: 99,
  },
  {
    id: "p2",
    name: "Tortilla Soup in z-teca Mexican Eatery",
    description: "the best soup in the world",
    image:
      "https://images.sirved.com/ChIJAb34zTouK4gR_ulVKGVTgOU/5aaa847a36820.jpg",
    like: 10,
    dislike: 1,
  },
  {
    id: "p3",
    name: "Sandwich in Aroma Espresso Bar",
    description: "the best Sandwich in the world",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5TzOBxCllODUX5xk_WVuXasbXkTEvCvOdeg&usqp=CAU",
    like: 21,
    dislike: 0,
  },
  {
    id: "p4",
    name: "Donut from Tim Hortons",
    description: "the best donut in the world",
    image:
      "https://canadify.com/wp-content/uploads/2021/06/Tim-Hortons-Offers-Free-Donut-With-Any-Beverage-Purchase-In-The-App-On-June-4-2021-678x381.jpg",
    like: 10,
    dislike: 0,
  },
];
const StudentsPicks = () => {
  const [form, setForm] = useState(false);
  const clickHandler = () => {
    setForm(true);
  };
  const sumbitHanlder = (e) => {
    e.preventDefault();
    setForm(false);
  };

  return (
    <div className="page-container">
      <div id="first-container">
        <h1 id="title" >Student Picks</h1>
        <h2> See what others are eating!</h2>
      </div>

      <div id="content">
        {/* <button onClick={clickHandler} className="clickButton">
          <BiBookAdd />
        </button>
        {form && (
          <form onSubmit={sumbitHanlder}>
            <input type="text" placeholder="enter the name" />
            <input type="text" placeholder="enter the description" />
            <button type="submit">ADD YOUR PICK</button>
          </form>
        )} */}
        <div class="items">
          {DUMMY_PICKS.map((pick) => (
            <PickItem key={pick.id} pick={pick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentsPicks;
