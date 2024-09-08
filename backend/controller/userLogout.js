function userLogout (req,res){
    try {

        const tokenOption = {
            httpOnly :true,
            secure: true,
            sameSite : 'None'
           }

        res.clearCookie("token",tokenOption)
        //res.clearCookie("token") is used to delete a cookie from the client’s browser, effectively logging out the user or invalidating their session.

        res.json({
            message: "Logout successfull",
            error : false ,
            success : true,
            data : []
        })

        
    } catch (err) {

        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
        
    }
}

module.exports = userLogout