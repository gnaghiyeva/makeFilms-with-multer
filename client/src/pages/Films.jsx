import React, { useEffect, useState } from 'react'
import { deleteFilm, getAllFilms } from '../api/requests'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
const Films = () => {
  const [films, setFilms] = useState([])

  useEffect(() => {
    getAllFilms().then((res) => {
      setFilms(res.data)
    })
  }, [])
  return (
    <>
      <Grid container spacing={2}>
        {films && films.map((film) => {
          return (
            <Grid item xs={6} md={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 400 }}
                image={film.image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                 <Link to={`/${film._id}`}> {film.name}</Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 {film.desc}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=>{
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteFilm(film._id).then((res)=>{
                        Swal.fire(
                          'Deleted!',
                          'Your file has been deleted.',
                          'success'
                        )

                      })
                      setFilms(films.filter((x)=>x._id!==film._id))
                    }
                  })
                }}>Delete</Button>
                <Button size="small"><Link to={`/edit/${film._id}`}>Edit</Link></Button>
              </CardActions>
            </Card>
          </Grid>
          )
        })}


      </Grid>
    </>
  )
}

export default Films