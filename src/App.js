import React from 'react';
import { Button, Form, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import {useState} from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';

const App = () => {

    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    {/* use To call so that we add Budgets by declaring"budgets" */}
   
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    const [addExpenseModalBudgetId, setaddExpenseModalBudgetId] = useState(false)
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
    
    const {budgets, getBudgetExpenses} = useBudgets()

    {/* This is used to call the "useBudgets" hook which we created in "BudgetsContext.js" */}

    function openAddExpenseModal (budgetId){
              setShowAddExpenseModal(true)
              setaddExpenseModalBudgetId(budgetId)
    }
    return (
        <>
        {/* "Container" is already coming from "react-bootstraap" */}
        <Container className="my-4">
            <Stack direction="horizontal" gap="2" className="mb-4">
                  <h1 className='me-auto'>Budgets</h1>
                  <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
                {/* This is used when you click on "Add Budget" Button */}
                  <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
            </Stack>    

            <div 
            style={{ 
            display:"grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
            gap:"1rem", 
            alignItems:"flex-start",
        }} 
            >
                  
            
            {/* Use To add Budgets */}

            {budgets.map(budget =>{
                const amount = getBudgetExpenses(budget.id).reduce(
                    (total, expense) => total + expense.amount, 
                    0
                )
            return(
                 <BudgetCard 
                 key={budget.id} // This is the parameter we get form "BudgetsContext.js"
                 name={budget.name}   // This is the parameter we get form "BudgetsContext.js"
                 
                 amount={amount} //Amount is store in "expenses" so we add "getBudgetExpenses" in above const
                 max={budget.max}   // This is the parameter we get form "BudgetsContext.js"
                 onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                 
                 onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                 
                 /* Use to display the Expense Modal and its a hook */

                 />
            )
            })}

            <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
            
            // This is used so that we click on "Uncategorized" it will display type as "Uncategorized" byDefualt

            onViewExpensesClick={() => 
               setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID) 
            }
            /> 
            
            <TotalBudgetCard />
            
            </div> 
            </Container>
            <AddBudgetModal 
            show={showAddBudgetModal} 
            handleClose={() => setShowAddBudgetModal(false)}
            />

            <AddExpenseModal 
            show={showAddExpenseModal} 
            defaultBudgetId={addExpenseModalBudgetId}
            /* "defaultBudgetId" whenever we pass this we get to see the deserving category when we add expenses on it */
            handleClose={() => setShowAddExpenseModal(false)}
            />


            <ViewExpensesModal
             budgetId={viewExpensesModalBudgetId}
             handleClose={() => setViewExpensesModalBudgetId()}

            />
            </>
    )
}

export default App
