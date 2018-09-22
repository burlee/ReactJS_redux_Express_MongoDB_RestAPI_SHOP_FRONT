import React from 'react';
import classes from './PaymentsMethodTable.css'

const PaymentsMethodTable = ({ availablePayments }) => {

    let availableMethodsDisplay = availablePayments.map((method, i) => {
        return <td key={i}>{method}</td>
    })

    return (
        <div className={classes.availableMethods} style={{ padding: '0px' }}>
            <table>
                <tbody>
                    <tr>
                        <th>Płatność bankowa</th>
                        <th>Płatność Btc</th>
                        <th>Płatność Ltc</th>
                    </tr>
                    <tr>
                        {availableMethodsDisplay}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PaymentsMethodTable;