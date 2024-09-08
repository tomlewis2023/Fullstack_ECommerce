//upload image cloudinary


const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadimage = async(image) =>{

    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset",import.meta.env.VITE_UPLOAD_PRESET)
    

    const dataresp = await fetch(url,{

        method: "post",        
        body: formData

    })

    return dataresp.json()
    

}

export default uploadimage