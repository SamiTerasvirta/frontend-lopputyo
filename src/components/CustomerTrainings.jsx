import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { ApiService } from '../services/apiservice'

export const CustomerTrainings = (props) => {
    const { custid } = props.match.params
    const [customer, setCustomer] = useState(null)
    const [state, setState] = useState({
        columns: [
            { title: 'Date', field: 'date', type: 'datetime' },
            { title: 'Activity', field: 'activity' },
            { title: 'Duration', field: 'duration', type: 'numeric' },
        ],
        data: [
            { date: '2020-03-24T11:30:00', activity: 'Circling', duration: 10 }
        ]
    })
    const fetchCustomerTrainings = () => {
        ApiService
            .fetchCustomersTrainings(props.match.params.custid)
            .then(data => {
                setState(prevState => {
                    return { ...prevState, data: data.content }
                })
            })
    }

    const fetchCustomer = () => {
        ApiService
            .fetchSingleCustomer(props.match.params.custid)
            .then(c => {
                setCustomer(c)
            })
    }

    // addNewTraining


    // deleteTraining
    const deleteTraining = (id) => {
        ApiService
            .deleteTraining(id)
            .then((deleted) => {
                if (deleted)
                    console.log("Deleted fine")
                else
                    console.log("Not deleted, but not restoring old state")
            })
            .catch(err => {
                alert('Failed: ' + err.message)

                setState(prevState => {
                    const resetdata = [...prevState.preServerCallCustomers]
                    return { ...prevState, customers: resetdata }
                })
            })
    }





    useEffect(() => {
        fetchCustomerTrainings()
        fetchCustomer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <MaterialTable
            title={`Trainings for ${customer ? customer.firstname + ' ' + customer.lastname : 'customer #' + custid}`}
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                            // addNewTraining(newData)
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            if (oldData) {
                                newData.id = oldData.id
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                                // updateTraining(newData)
                                resolve();
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                            deleteTraining(oldData)
                            resolve();
                        }, 600);
                    }),
            }}
        />
    )
}

export default CustomerTrainings