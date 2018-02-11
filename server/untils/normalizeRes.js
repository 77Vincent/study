const normalizeRes = async(ctx,fn)=> {
    try{
        let data = await fn(ctx)
        ctx.status = 200
        ctx.body = {
            code:200,
            data,
            message:'OK'
        }
    }catch(err){
        ctx.status = 500
        ctx.body = {
            code: 500,
            message: ''
        }
        console.log(err)
    }
}

export default normalizeRes