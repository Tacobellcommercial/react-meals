
const starter_path = "http://localhost:3001"

export async function fetchApi(path, authentication, body_data, type){
    try{
        if (!authentication){
            const response = await fetch(starter_path + path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body_data)
            })

            const data = await response.json();
            return data;
        }else{
            if (type == "GET"){
                const response = await fetch(starter_path + path, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + authentication
                    }
                })

                const data = await response.json();
                return data;
            }else{
                const response = await fetch(starter_path + path, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + authentication
                    },
                    body: JSON.stringify(body_data)
                })

                const data = await response.json();
                return data;
            }
        }

    }catch (e){
        console.log(e);
    }
}