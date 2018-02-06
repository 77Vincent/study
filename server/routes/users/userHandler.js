import User from '../../models/user';

let getAllUserInfos = async(ctx) => {
    let userInfo = await User.findAndCount({
        where:{}
    })
    return userInfo
}

let createUserInfo = async(ctx) => {
    try {
        let {userInfo} = ctx.request.body
        await User.create(userInfo)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

let checkPassword = async(ctx) => {
    let {body} = ctx.request
    console.log('body', ctx.request)
    return User.findOne({
        where:{
            name: body.name,
            password: body.password
        }
    })
}
export {
    getAllUserInfos,
    createUserInfo,
    checkPassword
}