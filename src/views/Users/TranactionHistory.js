import React, { useEffect, useState } from 'react'
import { CAvatar, CBadge, CSmartTable } from '@coreui/react-pro'
import axios from 'axios'
import moment from 'moment'
const getStatus = (item, userId) => {
  if (item.type.toLowerCase() === 'reward') {
    return { type: 'Reward', color: 'success' }
  } else {
    if (userId === item.senderId._id) {
      return { type: 'Sent', color: 'danger' }
    } else if (userId === item.receiverId._id) {
      return { type: 'Recieved', color: 'success' }
    }
  }
}
export const TranactionHistory = ({ userId }) => {
  const [transactionsData, setTransactionData] = useState([])
  useEffect(() => {
    if (userId) {
      axios
        .get(`https://payebuddy.xyz/api/transactions/historyAdmin/${userId}?limit=all&offset=0`)
        .then((res) => {
          setTransactionData(res.data)
        })
        .catch((err) => {})
    }
  }, [userId])
  const columns = [
    {
      key: 'amount',
      label: 'Amount',
      sorter: false,
    },
    {
      key: 'senderId',
      label: 'Sender Phone Number',
    },
    {
      key: 'receiverId',
      label: 'Reciever Phone Number',
    },
    {
      key: 'receiverName',
      label: 'Reciever Name',
    },
    {
      key: 'receiverEmail',
      label: 'Reciever Email',
    },
     {
      key: 'date',
      label: 'Date And Time',
    },
    {
      key: 'status',
      label: 'Type',
    },
   
  ]

  return (
    <CSmartTable
      columns={columns}
      columnSorter={{
        multiple: true,
        resetable: true,
      }}
      items={transactionsData}
      itemsPerPageSelect
      itemsPerPage={5}
      pagination
      scopedColumns={{
        amount: (item) => <td>${item.amount}</td>,
        date: (item) => <td>{moment(item.date).format('MM-DD-YYYY HH:mm:ss')}</td>,
        receiverId: (item) => <td>{item.receiverId.phoneNumber}</td>,
        receiverName: (item) => (
          <td>{`${item.receiverId.firstName} ${item.receiverId.lastName}`}</td>
        ),
        receiverEmail: (item) => <td>{item.receiverId.email}</td>,
        senderId: (item) => <td>{item.senderId.phoneNumber}</td>,
        status: (item) => (
          <td>
            <CBadge color={getStatus(item, userId).color}>{getStatus(item, userId).type}</CBadge>
          </td>
        ),
      }}
      sorterValue={[
        { column: 'role', state: 'asc' },
        { column: 'registered', state: 'desc' },
      ]}
      tableBodyProps={{
        className: 'align-middle',
      }}
    />
  )
}
