import React, { useEffect, useState } from 'react'
import { CFormSelect, CCol, CRow, CButton } from '@coreui/react'
import axios from 'axios'

import Editor from 'react-simple-wysiwyg'
import { data } from 'react-router-dom'

const CMS = () => {
    const [html, setHtml] = useState('')
    const [selectedCms, setSelectedCMS] = useState(1)
    const onChange = (e) => {
        setHtml(e.target.value)
    }
    useEffect(() => {
        axios.get(`https://payebuddy.xyz/api/cms/${selectedCms}`).then((r) => {
            setHtml(r.data.text)
        })
    }, [selectedCms])
    const saveData = () => {
        alert(html)
        if (!html) {
            alert("Please enter text");
            return;
        }
        axios.put(`https://payebuddy.xyz/api/cms/${selectedCms}`, {

            text: html,

        })
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
            <Editor value={html} onChange={onChange} style={{ height: '300px' }} />
            <CRow className="mt-3 justify-content-center">
                <CCol xs={4}>
                    <CButton color="primary" onClick={saveData} size="md">
                        Submit
                    </CButton>
                </CCol>
            </CRow>
        </>
    )
}
export default CMS
