import axios from 'axios'

export default class ServerService{

    static async getUsersByPage(page, count = 6){
        let response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`)    
         return await response.data         //[] in response.users
    }
    static async getPostitons(){
        let response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)    
         return await response.data.positions         //[]
    }
    static async getToken(){
        let response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/token`)    
         return await response.data.token         
    }
    static async post(file){
        
        let result
        const token = await ServerService.getToken()
        // const token = 'fakeToken'

        let formData = new FormData(); 

        formData.append('position_id', file.position_id); formData.append('name', file.name); formData.append('email', file.email); formData.append('phone', file.phone); formData.append('photo', file.photo);

        result = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', { method: 'POST', body: formData, headers: { 'Token': token}})
        .then(response =>response.json())
        .catch(err => {
            result = err
            console.error(err)
        })

         return result        //
    }
}