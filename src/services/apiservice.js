
const baseurl = 'https://customerrest.herokuapp.com/api'

export class ApiService {
    static fetchAllCustomers() {
        return fetch(`${baseurl}/customers`)
            .then(response => response.json())
            .then(data => {
                // The returned data is missing the id field, so add it
                // to have a proper customer object
                return data.content.map(c => {
                    const id = c.links[0].href.split('/').pop()
                    c.id = id;
                    return c;
                })
            })
    }

    static fetchSingleCustomer(id) {
        return fetch(`${baseurl}/customers/${id}`)
            .then(response => response.json())
            .then(data => {
                return data
            })
    }

    static fetchAllTrainings() {
        return fetch(`${baseurl}/trainings`)
            .then(response => response.json())
            .then(data => {
                return data.content.map(c => {
                    const id = c.links[0].href.split('/').pop()
                    c.id = id;
                    return c;
                })
            })
    }

    static fetchCustomersTrainings(id) {
        return fetch(`${baseurl}/customers/${id}/trainings`)
            .then(response => response.json())
            .then(data => {
                return data
            })
    }

    static fetchAllTrainingsWithCustomerInfo() {
        return fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => {
                return data;
            })
    }

    static createCustomer(customer) {
        return fetch(`${baseurl}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.status === 201) {
                    return response.json()
                }
                throw new Error(JSON.stringify(response))
            })
            .then(added => {
                const id = added.links[0].href.split('/').pop();
                added.id = id;
                return added
            })
    }

    static deleteCustomer(id) {
        return fetch(`${baseurl}/customers/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.status === 204)
                    return true;
                if (response.status === 404) // Already deleted
                    return false;
                throw new Error(response.status)
            })
    }

    static updateCustomer(customer) {
        return fetch(`${baseurl}/customers/${customer.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                throw new Error(JSON.stringify(response))
            })
    }

    static deleteTraining(id) {
        return fetch(`${baseurl}/trainings/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.status === 204)
                    return true;
                if (response.status === 404) // Already deleted
                    return false;
                throw new Error(response.status)
            })
    }
}

