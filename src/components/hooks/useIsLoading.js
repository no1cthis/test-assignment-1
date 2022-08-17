import { useState } from "react"

import Loader from '../components/UI/Loader/Loader'


export const useIsLoading = (callback) =>{
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const action = async() =>{
        try{
            setIsLoading(true)
            await callback()
        }
        catch(e){
            setError(e.message)
            console.error(e.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    return [action, isLoading, error]
}

export const useDisplay = (element, isLoading, error, loader = <Loader/>) =>{
    
    if(error){
        let result = isLoading 
        ? <div style={{display: 'flex', justifyContent: 'center'}}>{loader}</div>
        : error
                ? <div style={{display: 'flex', justifyContent: 'center'}}>{error}</div>
                : element
        return result
    }
        let result = isLoading 
        ? <div style={{display: 'flex', justifyContent: 'center'}}>{loader}</div>
        : element
        return result
}

