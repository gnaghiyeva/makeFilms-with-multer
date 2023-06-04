import { BASE_URL } from "./base_url";
import axios from 'axios'

export const getAllFilms = async(name)=>{
    let globalData
    let URL;
    if(!name){
        URL=BASE_URL+"/films"
    }
    else{
        URL=BASE_URL+"/films/"+`?name=${name}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })
    return globalData
}


export const getFilmById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/films/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deleteFilm= async(id)=>{
    let deletedFilm
     await axios.delete(`${BASE_URL}/films/${id}`).then((res)=>{
        deletedFilm=res.data
     })
     return deletedFilm
 }

 export const postFilm = (newModel)=>{
    axios.post(`${BASE_URL}/films`,newModel)
}

export const editFilm = (updatedFilm)=>{
    axios.put(`${BASE_URL}/films`,updatedFilm)
}


//Videos requests
export const getFilmsVideosByID = async(id)=>{
    let globalData
    await axios.get(`${BASE_URL}/videos/${id}`).then((res) => {
      globalData = res.data;
      });
      return globalData
  }


  export const getAllVideos = async()=>{
    let globalData
    await axios.get(`${BASE_URL}/videos/`).then((res) => {
      globalData = res.data;
      });
      return globalData
  }

  export const postVideo = (payload)=>{
    axios.post(`${BASE_URL}/videos`, payload);
  }
  
  export const deleteVideoByID = async(id)=>{
    let deletedVideo;
    await axios.delete(`${BASE_URL}/videos/${id}`)
    .then(res=>{
        deletedVideo = res.data.data;
    })
    return deletedVideo
  }
  