import React, { useState, useEffect } from 'react'
import { ApiService } from '../services/apiservice';
import MaterialTable from 'material-table';
import { Paper, Link, CircularProgress } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'

export const Trainings = () => {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        columns: [
            { title: 'Date', field: 'date', type: 'datetime' },
            { title: 'Activity', field: 'activity' },
            { title: 'Duration', field: 'duration', type: 'numeric' },
            { title: 'Customer',  editable: 'never', 
                render: (rowdata) => {
                if (rowdata){
                    const {customer} = rowdata
                    if (customer)
                        return `${customer.firstname} ${customer.lastname}`
                };
                return 'Customer'
            }
            },
          ],
        data: [],
      });
      const fetchAllTrainings = () => {
          setLoading(true)
        ApiService
        .fetchAllTrainingsWithCustomerInfo()
        .then(data=> {
            setLoading(false)
            setState(prevState => {
                return { ...prevState, data };
            })
        })
      }
    
      useEffect(()=> {
        fetchAllTrainings()
      }, [])
    
      if (loading) 
        return <Paper style={{padding: '1em'}}><div>Loading trainings <CircularProgress /></div></Paper>
      else
          return (
          <div>
            <MaterialTable
                title="Trainings"
                columns={state.columns}
                data={state.data}
                editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                    setTimeout(() => {
                        if (oldData) {
                            setState(prevState => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data};
                                });
                            // updateCustomer(newData)
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
                        // deleteCustomer(oldData)
                        resolve();
                    }, 600);
                    }),
                }}
            />
            <div style={{height: '1em'}}></div>
            <Paper elevation={3}>
                <div style={{padding: '1em'}}>
                  To <b>add</b> a training goto to <Link component={RouterLink} to="/customers">Customers</Link> page,
                  and choose your preferred customer's trainings. There you will find the
                  add-functionality.
                </div> 
            </Paper>
          </div>
    );
}

export default Trainings