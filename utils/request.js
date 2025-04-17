import axios from "axios";

const request = axios.create({
    timeout:20000,
})

export let $get = async (url, params) => {
    let {data} = await request.get(url, {params});
    return data;
}

export let $post = async (url, body) => {
    let {data} = await request.post(url, body);
    return data;
}