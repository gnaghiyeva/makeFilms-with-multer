import React, { useRef, useState } from 'react'
import { useFormik } from "formik";
import { FilmSchema } from '../validation/FilmSchema';
import { Button, TextField } from '@mui/material';
import { postFilm } from '../api/requests';

const AddFilm = () => {
  
  const[selectedImages, setSelectedImages] = useState(null)
  const buttonRef = useRef()

  function handleSubmit(values,actions){
  const formData = new FormData()
  formData.append("image", selectedImages)
  formData.append("name", values.name)
  formData.append("desc", values.desc)

  postFilm(formData)
  buttonRef.current.style.background = '#1976D2';
  buttonRef.current.textContent = 'Upload File';

  setSelectedImages(null)
  actions.resetForm()
 
  }
  const formik = useFormik({
    initialValues:{
      name:'',
      desc:'',
      image:''
    },

    validationSchema: FilmSchema,
    onSubmit:handleSubmit
  })
  return (
  <>
  <form onSubmit={formik.handleSubmit}>
  <div style={{textAlign:'center',display:'flex', flexDirection:'column',alignItems:'center'}}>
  <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' type='text' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" />
  <br/>
  {formik.errors.name && formik.touched.name && (<span>{formik.errors.name}</span>)} 
  
  <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='desc' type='text' value={formik.values.desc} id="outlined-basic" label="desc" variant="outlined" />
  <br/>
  {formik.errors.desc && formik.touched.desc && (<span>{formik.errors.desc}</span>)}
  
  {/* <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='image' type='file' hidden value={formik.values.image} id="outlined-basic" label="image" variant="outlined" />
  {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)} */}

  <Button ref={buttonRef} variant="contained" component="label" >
    Upload File

    <input value={formik.values.image} 
    onChange={(e)=>{
      buttonRef.current.style.background = 'red'
      buttonRef.current.textContent = e.target.files[0].name;
      formik.handleChange(e)
      setSelectedImages(e.target.files[0])
    }}
    onBlur={formik.handleBlur} name='image' type='file' accept="image/*" hidden
    />
  </Button>
  {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)} 
  </div>

<div style={{textAlign:'center', marginTop:'20px'}}>
  <Button type='submit' variant='contained' color='success'>Add</Button>
  </div>
 </form>
  </>
  )
}

export default AddFilm