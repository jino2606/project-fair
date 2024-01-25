import axios from "axios"



export const commomAPI = async (httpRequest, url, reqBody, reqHeaders)=>{

    const reqConfig = {
                        method: httpRequest,
                        url,
                        data: reqBody,
                        headers: reqHeaders?reqHeaders: {"Content-Type": "application/json"}
                    }

    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((error)=>{
        return error
    })
}