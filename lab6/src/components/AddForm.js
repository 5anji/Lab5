import { Form, Button } from "react-bootstrap"

import {EmployeeContext} from '../contexts/EmployeeContext';
import {useContext, useState} from 'react';

const AddForm = () =>{

    const {addEmployee} = useContext(EmployeeContext);

    const [newEmployee, setNewEmployee] = useState({
        title:"", type:"", millage:"", gearBox:"", fuelType:"", price:""
    });

    const onInputChange = (e) => {
        setNewEmployee({...newEmployee,[e.target.name]: e.target.value})
    }

    const {title, type, millage, gearBox, fuelType, price} = newEmployee;

    const handleSubmit = (e) => {
        e.preventDefault();
        addEmployee(title, type, millage, gearBox, fuelType, price);
    }

     return (

        <Form onSubmit={handleSubmit} style={{display: "grid", gap: "20px", justifyContent: "center"}}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Title *"
                    name="title"
                    value={title}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Type *"
                    name="type"
                    value={type}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Millage *"
                    name="millage"
                    value={millage}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Gear Box *"
                    name="gearBox"
                    value={gearBox}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Fuel Type *"
                    name="fuelType"
                    value={fuelType}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Price *"
                    name="price"
                    value={price}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Button variant="success" type="submit" block style={{backgroundColor: "#DC5F00", border: "solid", borderColor: "#686D76", borderRadius: "8px"}}>
                Add New Car
            </Button>
        </Form>

     )
}

export default AddForm;