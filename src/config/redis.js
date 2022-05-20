import { createClient } from 'redis';

export const client = createClient();

export async function connectredis(){
    try {
        await client.connect();
        console.log("Connection successfull with Redis");
    }
    catch(err){
        console.log("Cannot connect");
        console.error(err);
    }   
}
