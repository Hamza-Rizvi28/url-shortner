import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:8080';

export const shortenUrl = async (url : string) => {
    return await axios.post('/url/create', {
            longUrl: url,
        }
    );
};

export const getLongUrl = async (key : string) => {
    try {
        return await axios.get(`/url/${key}`);
    }
    catch (error) {
        console.log(error)
    }
    
};