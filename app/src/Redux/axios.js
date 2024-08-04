import axios from 'axios';
import fs from 'react-native-fs';
import { Buffer } from 'buffer';
import { store } from '../redux/store';

export const getAccessToken = () => {
    return 'Bearer ' + store.getState().intro.accessToken;
}

export const get = ({
    url, headers
}) => {
    try {
        let mappedHeaders = { 'Content-Type': 'application/json' };
        if(headers)
            for(let i in headers)
                mappedHeaders[i] = headers[i];
        const request = axios.get(url, {
            headers: mappedHeaders
        });
        
        return request;
    } catch(err) {
        return err;
    }
}

export const post = ({
    url, body, headers
}) => {
    try {
        let mappedHeaders = { 'Content-Type': 'application/json' };
        if(headers)
            for(let i in headers)
                mappedHeaders[i] = headers[i];
        const request = axios.post(url, body, {
            headers: mappedHeaders
        });
        
        return request;
    } catch(err) {
        return err;
    }
}

export const axiosDelete = ({
    url, headers
}) => {
    try {
        let mappedHeaders = { 'Content-Type': 'application/json' };
        if(headers)
            for(let i in headers)
                mappedHeaders[i] = headers[i];
        const request = axios.delete(url, {
            headers: mappedHeaders
        });
        
        return request;
    } catch(err) {
        return err;
    }
}

export const uploadFile = async (url, file, recordingUploadingProgress, dispatch) => {
    try {
        const base64 = await fs.readFile(file, 'base64')
        const buffer = Buffer.from(base64, 'base64')
        const request = axios.put(url, buffer, {
            headers: {
                'Content-Type': 'video/mp4',
                'x-amz-acl': 'public-read'
            },
            onUploadProgress: e => {
                recordingUploadingProgress(e, dispatch);
            }
        });
        
        return request;
    } catch(err) {
        return err;
    }
}