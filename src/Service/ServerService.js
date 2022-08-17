import axios from 'axios'

export default class ServerService{

    static async getUsersByPage(page, count = 6){
        let response = await axios.get(`https://jsonplaceholder.typicode.com/users?_limit=${count}&_page=${page}`)    
         return await response         //[] in response
    }
    static async getPhotos(page, count = 6){
        let response = await axios.get(`https://jsonplaceholder.typicode.com/albums/1/photos?_limit=${count}&_page=${page}`)    
         return await response         //[] in response
    }
    
    static async post(file){
        
        let result
        const token = 'fakeToken'

        result = axios.post('https://jsonplaceholder.typicode.com/posts', file, {
            Token: token,
            validateStatus: function (status) {
              return status < 500; // Resolve only if the status code is less than 500
            }
        })

         return result        //
    }
}