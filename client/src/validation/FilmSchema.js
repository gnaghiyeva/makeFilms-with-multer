import * as yup from 'yup'

export const FilmSchema = yup.object().shape({
    name:yup.string().min(4).required('name is required'),
    desc:yup.string().required('desc is required'),
    image:yup.mixed().required('image is required')
})