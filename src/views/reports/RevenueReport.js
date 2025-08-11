import React, { useEffect, useState } from 'react'
import {
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'

import moment from 'moment'

const RevenueReport = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('https://payebuddy.xyz/api/transactions/tranasactionReport').then((r) => {
      setData(r.data)
    })
  }, [])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <CSpinner />
        </div>
      )}
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Total Debit</CTableHeaderCell>
            <CTableHeaderCell scope="col">Total Credit</CTableHeaderCell>
            <CTableHeaderCell scope="col">Total Tranasaction</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((d) => {
            return (
              <CTableRow>
                <CTableHeaderCell scope="row">{d.sender_details[0]?.email}</CTableHeaderCell>
                <CTableHeaderCell scope="row">
                  {d.sender_details[0]?.firstName} {d.sender_details[0]?.lastName}
                </CTableHeaderCell>
                <CTableHeaderCell scope="row">{d.sender_details[0]?.phoneNumber}</CTableHeaderCell>
                <CTableDataCell>{d.totalSent}</CTableDataCell>
                <CTableDataCell>{d.totalReceived}</CTableDataCell>
                <CTableDataCell>{d.totalAmount}</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}
export default RevenueReport
