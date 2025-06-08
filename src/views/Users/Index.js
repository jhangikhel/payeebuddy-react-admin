import React, { useState } from 'react'
import { CButton, CForm, CFormCheck, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react'
import axios from 'axios'

const Video = () => {
  const [validated, setValidated] = useState(false)
  const [selectedFileThumbNail, setSelectedThumbNail] = useState(null)
  const [selectedFileVideo, setSelectedVideo] = useState(null)
  const [videoName, setvideoName] = useState('')
  const [isSponsored, setIsSponsored] = useState(false);
  const [isLoading ,setIsLoading]= useState(false);
  const handleFileChange = (event) => {
    setSelectedThumbNail(event.target.files[0])

  }
  const handleFileChangeVideo = (event) => {
    setSelectedVideo(event.target.files[0])

  }
  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      saveVideo(form)
      setValidated(false)
    }
  }
  const saveVideo = (form1) => {
    setIsLoading(true);
    var form = new FormData()
    console.log(selectedFileThumbNail)
    console.log(selectedFileVideo)
    form.append('files', selectedFileThumbNail)
    form.append('files', selectedFileVideo)
    form.append('videoName', videoName)

    form.append('sponsored', isSponsored.toString())
    axios
      .post('http://localhost:3000/api/videos/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Upload success:', response.data)
         setIsLoading(false);
      })
      .catch((error) => {
        console.error('Upload error:', error);
         setIsLoading(false);
      })
  }
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <div className="mb-3">
        <CFormInput
          type="text"
          feedbackInvalid="Please Enter Video Name"
          id="videoName"
          label="Name"
          value={videoName}
          onChange={(e) => {
            setvideoName(e.target.value)
          }}
          required
        />
      </div>
      <CFormCheck
        className="mb-3"
        checked={isSponsored}
        onChange={(e) => {
          setIsSponsored(e.target.checked)
        }}
        id="validationFormCheck1"
        label="Is Sponsored"
      />
      <div className="mb-3">
        <CFormInput
          type="file"
          label="Upload Thumbnail Image"
          id="videoUplaodThumbnail"
          feedbackInvalid="Please upload a Thumbnail Image"
          aria-label="Thumbnail Image"
          required
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-3">
        <CFormInput
          type="file"
          id="videoFile"
          label="Upload Video"
          feedbackInvalid="Please upload a Video"
          aria-label="Uplaod Video"
          required
          accept="video/mp4"
          onChange={handleFileChangeVideo}

        />
      </div>
      <div className="mb-3">
        <CButton type="submit" disabled={isLoading} color="primary">
          Submit form
        </CButton>
      </div>
    </CForm>
  )
}
export default Video
