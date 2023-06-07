import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteVideoByID, getFilmById, getFilmsVideosByID } from '../api/requests'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const Detail = () => {
  
  const [film, setFilm] = useState({}) 
  const [videos, setVideos] = useState([])
  const { id } = useParams()
  
  useEffect(() => {
    getFilmById(id).then(res => {
      setFilm(res.data)
      console.log('film: ',res.data);
    })
  }, [id])

  useEffect(()=>{
    getFilmsVideosByID(id).then((res)=>{
      setVideos(res)
      console.log('video: ',res);
    })
  },[id])



  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 300 }}
              image={film.image}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {film.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {film.desc}
              </Typography>
            </CardContent>
            <CardActions>

              <Button size="small"><Link to='/'>Go Back</Link></Button>
            </CardActions>
          </Card>



        </Grid>

        <Grid item xs={6} md={8}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Release Year</TableCell>
            <TableCell align="right">Video</TableCell>
            <TableCell align="right">Operation</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.map((video) => (
            <TableRow
              key={video._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{video.title}</TableCell>
              <TableCell align="right">{video.releaseYear}</TableCell>
             
              <TableCell component="th" scope="row">
                <video controls width={170} height={100}  alt={video.name}>
                  {console.log('VIDEO: ',video.video)}
                <source src={video.video} type="video/mp4"/>
                Sorry, your browser doesn't support embedded videos.
                  </video>
              </TableCell>
             
              {/* <TableCell align="right"><Button onClick={()=>{
                deleteVideoByID(video._id)
                setVideos(video.filter((x)=>x._id!==video._id))
              }} variant='contained' color='error'>Delete</Button></TableCell> */}
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </Grid>
      </Grid>
    </>
  )
}

export default Detail