import _ from 'axios'

const axios = _.create({
    baseURL:"http://yoyo.qiliaokj.com",
    headers:{
        "Content-Type":"multipart/form-data"
    }
})

export default axios