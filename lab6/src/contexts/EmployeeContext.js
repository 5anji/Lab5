import {createContext, useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

export const EmployeeContext = createContext()

const EmployeeContextProvider  = (props) => {

    const [employees, setEmployees] = useState([
        {id:uuidv4(), title: 'BMW X5', type: 'SUV', millage: '221 000 km', gearBox: 'Automatic', fuelType: "Diesel", price: "29 499 €"},
        {id:uuidv4(), title: 'BMW 3 Series', type: 'Sedan', millage: '88 569 km', gearBox: 'Automatic', fuelType: "Benzine", price: "19 999 €"},
        {id:uuidv4(), title: 'BMW 5 Series', type: 'Sedan', millage: '365 212 km', gearBox: 'Mechanical', fuelType: "Benzine", price: "7 999 €"},
        {id:uuidv4(), title: 'BMW 3 Series', type: 'Sedan', millage: '367 159 km', gearBox: 'Mechanical', fuelType: "Diesel", price: "3 000 €"},
        {id:uuidv4(), title: 'BMW X1', type: 'Crossover', millage: '147 400 km', gearBox: 'Automatic', fuelType: "Diesel", price: "19 250 €"},
])

useEffect(()=> {
    const objects = JSON.parse(localStorage.getItem('employees'));
    if( objects ) {
        setEmployees(JSON.parse(localStorage.getItem('employees')))
    } else {
        localStorage.setItem('employees', JSON.stringify(employees));
    }
    console.log(objects)
},[])

const sortedEmployees = employees.sort((a,b)=>(a.name < b.name ? -1 : 1));

const addEmployee = (title, type, millage, gearBox, fuelType, price) => {
    setEmployees([...employees , {id:uuidv4(), title, type, millage, gearBox, fuelType, price}])
}

const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id))
}

const updateEmployee = (id, updatedEmployee) => {
    setEmployees(employees.map((employee) => employee.id === id ? updatedEmployee : employee))
}

    return (
        <EmployeeContext.Provider value={{sortedEmployees, addEmployee, deleteEmployee, updateEmployee}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider;