import React, { useEffect, useState } from 'react'
import { CFormSelect, CCol, CRow } from '@coreui/react'
import axios from 'axios'

import Editor from 'react-simple-wysiwyg'

const CMS = () => {
  const [html, setHtml] = useState('')
  const [selectedCms, setSelectedCMS] = useState(1)
  const onChange = (e) => {
    setHtml(e.target.value)
  }

  return (
    <>
      <CRow>
        <CCol className="mb-3 mb-sm-0" sm={6} lg={5}>
          <CFormSelect
            value={selectedCms}
            size="lg"
            className="mb-3"
            onChange={(e) => {
              setSelectedCMS(e.target.value)
            }}
            aria-label="Large select example"
          >
            <option value="1">FAQs</option>
            <option value="2">Terms and Condition</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <Editor value={html} onChange={onChange} style={{height:"300px"}} />
    </>
  )
}
export default CMS
