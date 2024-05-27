import {useContext, useState, useEffect} from 'react';
import {EmployeeContext} from '../contexts/EmployeeContext';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditForm'



const Employee = ({employee}) => {
    const {deleteEmployee} = useContext(EmployeeContext)
    const [show, setShow] = useState(false);
    const role = localStorage.getItem('role');
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [employee])

    return (
        <>
            <td>{employee.title}</td>
            <td>{employee.type}</td>
            <td>{employee.millage}</td>
            <td>{employee.gearBox}</td>
            <td>{employee.fuelType}</td>
            <td>{employee.price}</td>
            {role === "ADMIN" &&
            <td>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }>
                    <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">edit</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                    <button onClick={() => deleteEmployee(employee.id)}  className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">delete</i></button>
                </OverlayTrigger>
            </td>
            }
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Edit Car
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditForm theEmployee={employee} />
        </Modal.Body>
    </Modal>
        </>
    )
}

export default Employee;