
import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";

export default function AddExpenseModal({show, handleClose, defaultBudgetId }) {

    // "defaultBudgetId" is used when we click on "Add Expense" it should display the category of it
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()

    //The above 3 are the input parameters we add as " Inputs" while adding the Expenses

    const {addExpense, budgets} = useBudgets()
    
    function handleSubmit(e) {
        e.preventDefault()
        addExpense(
        {
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            // USed to convert a "String" into "Number"
            budgetId: budgetIdRef.current.value
        })

        handleClose()
    }

    
    return (
        <Modal show={show} onHide={handleClose} >
             <Form onSubmit={handleSubmit} autocomplete="off">
                 {/* "AutoComplete is kept "off" so that whever we enter a new budget
                      it wont get get cached */}
                   <Modal.Header closeButton>
                       <Modal.Title>New Expense</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       <Form.Group class="mb-3" controlId="description">
                           <Form.Label>Description</Form.Label>
                           <Form.Control ref={descriptionRef} type="text" required />
                       </Form.Group>

                       <Form.Group class="mb-3" controlId="amount">
                           <Form.Label>Amount</Form.Label>
                           <Form.Control ref={amountRef} type="number" required min={0} step={0.01} />
                       </Form.Group>

                       <Form.Group class="mb-3" controlId="budgetId">
                           <Form.Label>Budget</Form.Label>
                           <Form.Select
                           defaultValue={defaultBudgetId}
                            ref={budgetIdRef} 
                             >
                             <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                             {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                             ))}
                            </Form.Select>     
                       </Form.Group>

                       <div className="d-flex justify-content-end">
                           <Button variant="primary" type="submit">
                               Add
                           </Button>
                       </div>
                   </Modal.Body>
             </Form>
        </Modal>
    )
}