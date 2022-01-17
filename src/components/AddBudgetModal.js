
import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({show, handleClose }) {
    const nameRef = useRef()
    const maxRef = useRef()

    //The above 2 are the input parameters we add as " Inputs" while adding the Budget
    
    const {addBudget} = useBudgets()
    function handleSubmit(e) {
        e.preventDefault()
        addBudget(
        {
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
            
        })

        handleClose()
    }

    
    return (
        <Modal show={show} onHide={handleClose} >
             <Form onSubmit={handleSubmit} autocomplete="off">
                 {/* "AutoComplete is kept "off" so that whever we enter a new budget
                      it wont get get cached */}
                   <Modal.Header closeButton>
                       <Modal.Title>New Budget</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                       <Form.Group class="mb-3" controlId="name">
                           <Form.Label>Name</Form.Label>
                           <Form.Control ref={nameRef} type="text" required />
                       </Form.Group>

                       <Form.Group class="mb-3" controlId="max">
                           <Form.Label>Maximum Spending</Form.Label>
                           <Form.Control ref={maxRef} type="number" required min={0} step={0.01} />
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