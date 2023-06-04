const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const fs = require('fs')
const multer = require('multer')
const dotenv = require('dotenv')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


//
const DIR = './uploads/';
app.use('/uploads', express.static('uploads'))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid.v4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});



//videos dir
const VideoDIR = './videos/';
app.use('/videos', express.static('videos'))
const videostorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, VideoDIR);
    },
    filename: (req, file, cb) => {
        const videofileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid.v4() + '-' + videofileName)
    }
});

var videoupload = multer({
    storage: videostorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "video/mp4") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .mp4 format allowed!'));
        }
    }
});

dotenv.config()
app.use(cors())
const FilmSchema = new mongoose.Schema({
    name:String,
    desc:String,
    image:String
})

const VideoSchema = new mongoose.Schema({
    releaseYear:Number,
    title:String,
    video:String,
    filmID:{type:mongoose.Schema.Types.ObjectId,ref:'Films'}
})



const FilmModel =  mongoose.model('Films', FilmSchema)
const VideoModel =  mongoose.model('Videos', VideoSchema)

//post
app.post('/api/films', upload.single('image'), async(req,res)=>{
    const url = req.protocol + '://' + req.get('host');
    const newFilm = new FilmModel({
       name:req.body.name,
       desc:req.body.desc,
       image: url + '/uploads/' + req.file.filename
    })
    newFilm.save()
    res.status(201).send('film created succesfully')
})

//get
app.get('/api/films', async(req,res)=>{
    const {name} = req.query
    const allFilms = await FilmModel.find();
    if(name===undefined){
        res.status(200).send({
            data:allFilms,
            message:'data get succesfully'
        })
    }
    else{
        res.status(200).send({
            data:allFilms.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim())),
            message:'data get successfully'
        })
    }
})

//get by id
app.get('/api/films/:id', async(req,res)=>{
    const id = req.params.id
    FilmModel.findById(id).then((model)=>{
        res.status(200).send({
            data:model,
            message:'data get success'
        })
    }).catch((err)=>{
        res.send('data not found')
    })
})

// delete
app.delete('/api/films/:id', async(req,res)=>{
    const id = req.params.id
    const deletedFilm = await FilmModel.findByIdAndDelete(id)
   const idx = deletedFilm.image.indexOf("uploads/")
   const imageName = deletedFilm.image.substr(idx)
   fs.unlinkSync('./'+imageName)

    if(deletedFilm==undefined){
        res.status(204).send('data not found')
    } 
    
    else{
        res.status(200).send({
            data:deletedFilm,
            message:'data deleted succesfully'
        })
    }
})


app.put('/api/films/:id',async(req,res)=>{
    const id = req.params.id
    const {name,desc,image} = req.body
    const existedFilm = await FilmModel.findByIdAndUpdate(id,{name:name, desc:desc, image:image})
   const idx = existedFilm.image.indexOf("uploads/")
   const imageName = existedFilm.image.substr(idx)
   fs.unlinkSync('./'+imageName)

    if(existedFilm==undefined){
        res.status(204).send('data not found')
    } 
    
    else{
        res.status(200).send({
            data:existedFilm,
            message:'data edited succesfully'
        })
    }
})


//Videos ------------------------------------------
app.get("/api/videos/", async(req,res)=>{
    const videos = await VideoModel.find()

    if(videos == undefined){
        res.status(404).send('videos not found')
    }
    else{
        res.status(200).send(videos)
    }
})

app.get("/api/videos/:id", async(req,res)=>{
    const id = req.params.id
    const videos = await VideoModel.find()
    
    if(videos==undefined){
      res.status(404).send("videos not found!");
    }
    else{
      res.status(200).send(videos.filter((video)=>video.filmID==id))
    }
  })

  

  //djapa9ble
  app.post("/api/videos",videoupload.single('video'),async(req,res)=>{
    const videoURL = req.protocol + '://' + req.get('host')
    
    const newVideo = new VideoModel({
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      video: videoURL + '/videos/'+req.file.filename,
      filmID: req.body.filmID
    })
    await newVideo.save();
    res.status(201).send("video created succesfully")
  })
  
app.delete("/api/videos/:id", async(req,res)=>{
    const id = req.params.id
    const deletedVideo= await VideoModel.findByIdAndDelete(id);
    const videoIDX = deletedVideo.video.substr(videoIDX)
    fs.unlinkSync('./'+videoName)
    if(!deletedVideo){
      res.status(404).send('video not found');
    }
    else{
      res.status(203).send({data:deletedVideo, message:'video deleted succesfully'})
    }
  })

  
DB_CONNECTION = process.env.DB_CONNECTION
DB_PASSWORD = process.env.DB_PASSWORD
mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD)).then(()=>{
    console.log('MongoDB connected!')
})



app.get('/api', (req, res) => {
  res.send('Hello World!')
})

PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

//r6dc1ijl