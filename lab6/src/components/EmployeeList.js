import {Modal, Button, Alert} from 'react-bootstrap';
import {useContext, useEffect, useState} from 'react';
import {EmployeeContext} from '../contexts/EmployeeContext';
import Employee from './Employee';
import AddForm from './AddForm';
import Pagination from './Pagination';

const EmployeeList = ({toggleTheme, theme}) => {

    const {sortedEmployees} = useContext(EmployeeContext);

    const [showAlert, setShowAlert] = useState(false);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //const handleShowAlert = () =>setShowAlert(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(2)

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000)
    }

    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();
        }
    }, [sortedEmployees])

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPagesNum = Math.ceil(sortedEmployees.length / employeesPerPage);
    const role = localStorage.getItem('role');

    return (
        <>
            <div className={`table-title ${theme === "true" ? 'table-titleDark' : ''}`} >
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Manage <b>Cars</b></h2>
                    </div>
                    <div className="col-sm-6">
                        {role === "ADMIN" &&
                            <Button onClick={handleShow} className="btn btn-success" style={{backgroundColor: "#DC5F00", border: "solid", borderColor: "#686D76", borderRadius: "8px"}} data-toggle="modal"><span>Add New Car</span></Button>
                        }
                        <button onClick={toggleTheme} className={`btn ${theme === "true" ? 'btnDark' : ''}`} style={{backgroundColor: "#DC5F00", border: "solid", borderColor: "#686D76", borderRadius: "8px"}}>Change Theme</button>
                    </div>
                </div>
            </div>

            <Alert show={showAlert} variant="success">
                List Updated Succefully!
            </Alert>

            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Millage</th>
                    <th>Gear-box</th>
                    <th>Fuel type</th>
                    <th>Price</th>
                    {role === "ADMIN" &&
                    <th>Actions</th>
                    }
                </tr>
                </thead>
                <tbody>

                {
                    currentEmployees.map(employee => (
                        <tr key={employee.id}>
                            <Employee employee={employee} theme={theme}/>
                        </tr>
                    ))
                }


                </tbody>
            </table>

            <Pagination pages={totalPagesNum}
                        setCurrentPage={setCurrentPage}
                        currentEmployees={currentEmployees}
                        sortedEmployees={sortedEmployees}/>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Car
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddForm/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EmployeeList;