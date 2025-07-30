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

const LoginHistory = () => {
  const [data, setData] = useState([
    {
      name: 'Gourav Jhangikhel',
      mobileNumber: '+918440072307',
      date: '2025-07-08T13:39:47.383Z',
      isSucees: true,
      remarks: 'Login Success',
    },
    {
      name: 'Gourav Jhangikhel',
      mobileNumber: '+918440072307',
      date: '2025-07-09T13:39:47.383Z',
      isSucees: false,
      remarks: 'Invalid User name and Password',
    },
  ])

  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    // /setIsLoading(true)
  }

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
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Is Success</CTableHeaderCell>
            <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((d) => {
            return (
              <CTableRow color={d.isSucees ? 'green' : 'red'}>
                <CTableHeaderCell scope="row">{d.name}</CTableHeaderCell>
                <CTableDataCell>{d.mobileNumber}</CTableDataCell>
                <CTableDataCell>{moment(d.date).format('MM-DD-YYYY HH:mm')}</CTableDataCell>
                <CTableDataCell>{d.isSucees ? 'Yes' : 'No'}</CTableDataCell>
                <CTableDataCell>{d.remarks}</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}
export default LoginHistory
