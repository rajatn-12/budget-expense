

import React, {useContext, useState} from "react";
import {v4 as uuidV4} from 'uuid';



import useLocalStorage from "../hooks/useLocalStorage";

{/* whenever we want to add a "New Budget" there is a new ID associated with it
thats why we require "UUID" */}

const BudgetsContext = React.createContext()

{/* "Create Context" ise used to pass the data to desired "Components"  directly}*/ }

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {

    {/* Allows us to Use Contexts */}
    {/* in other words it returns "useContext" */ }
     return useContext(BudgetsContext)
}

// {
//     id:
//     name:
//     max
// }

// {
//     id:
//     budgetId:
//     amount:
//     description:
// }
export const BudgetsProvider = ({ children }) => {
    
{/* BudgetsProvider is used to wrap an App which you will see in "index.js" */}




    const [budgets, setBudgets] = useLocalStorage("budgets",[]) //budgets is key
    const [expenses, setExpenses] = useLocalStorage("expenses",[]) // expenses is key

    
    function getBudgetExpenses(budgetId)  
    
    // This is used to get "Expenses" for a particualar Card.
    // For Example :- If you create card (Movies) then by clicking "View Expenses" you will  get the data  
    {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({description, amount, budgetId})
    {
        setExpenses(prevExpenses => {
            
            return [...prevExpenses, {id: uuidV4(), description, amount, budgetId}]
        })
    }


    function addBudget({name, max})

    // This is the function that gets called in "AppBudgetModal.js"
    {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidV4(), name, max}]
        })
    }
     function deleteBudget({id}){
         //Whenver we delete the whole "Budget" it will go to Uncategorized Section
          setExpenses(prevExpenses => {
              return prevExpenses.map(expense => {
                  if (expense.budgetId !== id) return expense
                  return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
              })
          })
        //TODO deal with Expenses 
        // Whenever we delete a "Budget" it will go to "Uncategorized Section"
         setBudgets(prevBudgets => {
             return prevBudgets.filter(budget => budget.id!== id)
         })

     }
    function deleteExpense({id}){
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }
    
    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }} >{children}</BudgetsContext.Provider>
    )



}