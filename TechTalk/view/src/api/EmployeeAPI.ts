import axios, { AxiosResponse } from 'axios'
import { IEmployee } from '../Model/activity';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response : AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms))

const requests = {
    get: (url: string) => axios.get(url).then().then(responseBody),
    post: (url: string, body: {}) => axios.post(url,body).then().then(responseBody),
}

const Employees = {
    list: (): Promise<IEmployee[]> => requests.get('/Employee'),
    create: (activity : IEmployee) => requests.post('/Employee/CreateEmployee',activity)
}

export default{
    Employees
}