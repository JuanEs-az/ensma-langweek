const apiUrl = "https://langweek-backend.herokuapp.com"

const save = async(title, author, link) => {
    let json = {title, author, link}
    try{
       const resp = await fetch(apiUrl + "/text/save", {
        method: "POST",
        body: JSON.stringify(json),
        headers: {'Content-Type': 'application/json'}
        })
        return await resp.json()
    }catch(err){
        throw err
    }
}

const getAll = async() => {
    try{
        const resp = await fetch(apiUrl + "/text/get")
        let {got} = await resp.json()
        return got
    }catch(err){
        throw err
    }
}
export {
    save, getAll
}