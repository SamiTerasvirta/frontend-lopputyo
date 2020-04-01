import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import DirectionsRun from '@material-ui/icons/DirectionsRun'
import { ApiService } from '../services/apiservice';
import { CircularProgress, Paper } from '@material-ui/core';

export const Customers = (props) => {
    // When passing an array to the table, it will only 
    // re-render if the array reference is changed because 
    // it is based on the principle of using an immutable data array.
    // So instead of using 
    // const [customers, setCustomers] = useState([])
    // we'll wrap it to a 'state' - along with the columns that
    // otherwise could be just a const array
    const [state, setState] = useState({
        columns: [
            { title: 'Firstname', field: 'firstname' },
            { title: 'Lastname', field: 'lastname' },
            { title: 'Street', field: 'streetaddress' },
            { title: 'ZIP', field: 'postcode' },
            { title: 'City', field: 'city' },
            { title: 'Email', field: 'email' },
            { title: 'Phone', field: 'phone' },
            { title: 'Trainings', render: (rowdata) => 
                    <IconButton onClick={()=>props.history.push(`/customers/${rowdata.id}`)}>
                        <DirectionsRun/>
                    </IconButton> },
          ],
        customers: [],
        preServerCallCustomers: []  // just in case our server call is failure
      });
    const [loading, setLoading] = useState(false)

    const fetchAllCustomers = () => {
        setLoading(true)
        ApiService
            .fetchAllCustomers()
            .then(data => {
                setLoading(false)
                setState(prevState=> {
                    return { ...prevState, customers: data };
                })
        })
    }
    const addNewCustomer = (customer) => {
        // Add a new customer by calling the ApiService
        // The UI is optimistically updated as if the call would be instantateous
        // if server call in fact fails, return customer state to preServerCallCustomers
        // and disply a notification. 
        // With multiple users it might not be a bad idea to update the customer
        // list after every change by calling the fetchAllCustomers. After all,
        // the server call may fail e.g. due to someone else having deleted 
        // a customer we are trying to delete..
        ApiService
            .createCustomer(customer)
            .then(added=> {
                customer.id = added.id;
            })
            .catch(err=>{
                alert('Failed: ' + err.message)
                setState(prevState => {
                    const resetdata = [...prevState.preServerCallCustomers]
                    return {...prevState, customers: resetdata}
                })
            })
    }
    const updateCustomer = (customer) => {
        ApiService
            .updateCustomer(customer)
            .then(updated => {
                // No need to do anything.., UI already updated
                // Still nice to know everything is fine
            })
            .catch(err=>{
                // This might be because of a number of reasons.
                // To play it safe, let's reset our UI by re-fetching all
                // customers, just log the error to the console
                alert('Failed to update: ' + err.message)
                fetchAllCustomers()
            })

    }

    const deleteCustomer = (customer) => {
        ApiService
            .deleteCustomer(customer.id)
            .then((deleted)=> {
                if (deleted)
                    console.log("Deleted fine")
                else
                    console.log("Not deleted, but not restoring old state")
            })
            .catch(err=>{
                alert('Failed: ' + err.message)
                
                setState(prevState => {
                    const resetdata = [...prevState.preServerCallCustomers]
                    return {...prevState, customers: resetdata}
                })
            })
    }

    useEffect(()=> {
        fetchAllCustomers()
    }, [])
    
    if (loading) return <Paper style={{padding: '1em'}}><div>Loading customers <CircularProgress /></div></Paper>
    else
        return (
        <MaterialTable
            title="Customers"
            columns={state.columns}
            data={state.customers}
            editable={{
            onRowAdd: newData =>
                new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                    setState(prevState => {
                        const data = [...prevState.customers];
                        const preServerCallCustomers = data.slice()
                        data.push(newData);
                        return { ...prevState, customers: data, preServerCallCustomers };
                    });
                    addNewCustomer(newData)
                }, 600);
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                setTimeout(() => {
                    if (oldData) {
                        newData.id = oldData.id
                        setState(prevState => {
                            const data = [...prevState.customers];
                            const preServerCallCustomers = data.slice()
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, customers: data, preServerCallCustomers };
                            });
                        updateCustomer(newData)
                        resolve();
                    }
                }, 600);
                }),
            onRowDelete: oldData =>
                new Promise(resolve => {
                setTimeout(() => {
                    setState(prevState => {
                        const data = [...prevState.customers];
                        const preServerCallCustomers = data.slice()
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, customers: data, preServerCallCustomers };
                    });
                    deleteCustomer(oldData)
                    resolve();
                }, 600);
                }),
            }}
        />
    );
}

export default Customers