import { SET_TRANSACTION } from './actionTypes.js'

export function setTransaction(payload) {
    return {
        type: SET_TRANSACTION,
        payload
    }
}

export function postTransaction(payload) {
    return async (dispatch) => {
        try {
            // console.log(payload, 'dari action')
            let res = await fetch('http://localhost:3000/transactions', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                // body: JSON.stringify(payload),
                body: payload
            })
            res = await res.json()
            console.log('Success:', res);
        } catch (error) {
            console.error('Error:', error)
        }
    }
}

export function fetchTransaction(TransactionId) {
    return async (dispatch) => {
        try {
            let res = await fetch(`http://localhost:3000/transactions/expense/${TransactionId}`, {
                method: 'GET', // or 'PUT'
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                // body: JSON.stringify(payload),
            })
            res = await res.json()
            dispatch(setTransaction(res))

            console.log('Success:', res);
        } catch (error) {
            console.error('Error:', error)
        }
    }
}