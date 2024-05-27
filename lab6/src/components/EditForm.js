import { Form, Button } from "react-bootstrap"

import {EmployeeContext} from '../contexts/EmployeeContext';
import {useContext, useState} from 'react';

const EditForm = ({theEmployee}) =>{

    const id = theEmployee.id;

    const [title, setTitle] = useState(theEmployee.title);
    const [type, setType] = useState(theEmployee.type);
    const [millage, setMillage] = useState(theEmployee.millage);
    const [gearBox, setGearBox] = useState(theEmployee.gearBox);
    const [fuelType, setFuelType] = useState(theEmployee.fuelType);
    const [price, setPrice] = useState(theEmployee.price);


    const {updateEmployee} = useContext(EmployeeContext);

    const updatedEmployee = {id, title, type, millage, gearBox, fuelType, price}

    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployee(id, updatedEmployee)
    }

     return (

        <Form onSubmit={handleSubmit} style={{display: "grid", gap: "20px", justifyContent: "center"}}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Title *"
                    name="title"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Type *"
                    name="type"
                    value={type}
                    onChange={(e)=> setType(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Millage *"
                    name="millage"
                    value={millage}
                    onChange={(e)=> setMillage(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Gear Box *"
                    name="gerBox"
                    value={gearBox}
                    onChange={(e)=> setGearBox(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Fuel Type *"
                    name="fuelType"
                    value={fuelType}
                    onChange={(e)=> setFuelType(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Price *"
                    name="price"
                    value={price}
                    onChange={(e)=> setPrice(e.target.value)}
                />
            </Form.Group>
            <Button variant="success" type="submit" block style={{backgroundColor: "#DC5F00", border: "solid", borderColor: "#686D76", borderRadius: "8px"}}>
                Edit Car
            </Button>
        </Form>

     )
}

export default EditForm;