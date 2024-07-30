import React from "react";
import { useSelector } from "react-redux";
import MealObject from "../components/MealObject";

function Meals(){

    const mealsList = useSelector(state=>{
        console.log(state);
        console.log(state.meals);
        return state.meals;
    })

    function ReturnMealItems(){
        const itemsToReturn = []

        mealsList.forEach(e=>{
            itemsToReturn.push(<MealObject name={e.name} price={e.price}/>)
        })

        return itemsToReturn;
    }
    return(
        <div className="meals-container">
            <ReturnMealItems/>
        </div>
    )
}

export default Meals;