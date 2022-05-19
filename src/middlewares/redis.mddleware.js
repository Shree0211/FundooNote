import { client } from "../config/redis";

export async function redis(req,res,next){
try{
const data = await client.get('getnotes');
if(data==null)
{
    next();
}
else
{
    res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: JSON.parse(data),
        message: 'Notes fetched from redis'
      });
}
}
catch(error){
console.log(error);
}
}