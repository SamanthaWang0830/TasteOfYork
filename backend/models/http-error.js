class HttpError extends Error{
    constructor (message, errorCode){
        super(message) //call the constructor of the basic class (Error), 把messga这个property加入
        this.code=errorCode
    }
}
module.exports= HttpError