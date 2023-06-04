import React, { useEffect, useRef, useState } from 'react'
import { useFilmContext } from '../context/FilmContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editFilm, getFilmById } from '../api/requests'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'

const EditFilm = () => {
    // const[selectedImages, setSelectedImages] = useState({})
    // const buttonRef = useRef()


    const [films, setFilms] = useFilmContext()
    const {id} = useParams()
    const navigate = useNavigate();
    const [film,setFilm] = useState({});

    useEffect(()=>{
        getFilmById(id).then((res)=>{
          setFilm(res);
          formik.values.name = res.name;
          formik.values.desc = res.desc;
        //   formik.values.image = res.image;
         
        })
      },[id]);

    const handleEdit = async(values, actions) => {
        
        setFilms(values);
        console.log(values)
        await editFilm(id,values);
        navigate('/films');
        actions.resetForm();
      };

      const formik = useFormik({
        initialValues: {
          name: film.name,
          desc:film.desc,
        //   image:film.image
          
        },
        onSubmit: handleEdit,
      });

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

  {/* <Button ref={buttonRef} variant="contained" component="label" >
    Edit File

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
  {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)}  */}
  </div>

<div style={{textAlign:'center', marginTop:'20px'}}>
  <Button type='submit' variant='contained' color='success'>Edit</Button>
  </div>
 </form>
  </>
  )
}

export default EditFilm


