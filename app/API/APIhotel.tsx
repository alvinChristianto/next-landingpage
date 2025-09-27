import Axios from 'axios';


async function hotel() {
    let response;
    let headers = {
        //  'Content-Type': 'application/json',
        Accept: "application/json",
        Authorization_hotel: "test12345",
        // 'Access-Control-Allow-Methods': "POST, PUT, PATCH, GET, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*",
        // 'Access-Control-Allow-Headers': "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
    };

    //console.log(BE_URL + VERS + 'blogs');
    await Axios.get('http://127.0.0.1:8000/api/v1/hotel', {
        headers,
        withCredentials: true,
    })
        .then((res) => {
            const data = res;
            response = data;
        })
        .catch((error) => {
            console.log("err " + error);
            response = error.response;
        });
    return response;
    console.log(response);
}


async function room_hotel() {
    let response;
    let headers = {
        //  'Content-Type': 'application/json',
        Accept: "application/json",
        Authorization_hotel: "test12345",
        // 'Access-Control-Allow-Methods': "POST, PUT, PATCH, GET, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*",
        // 'Access-Control-Allow-Headers': "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
    };

    //console.log(BE_URL + VERS + 'blogs');
    await Axios.get('http://127.0.0.1:8000/api/v1/room_type', {
        headers,
        withCredentials: true,
    })
        .then((res) => {
            const data = res;
            response = data;
        })
        .catch((error) => {
            console.log("err " + error);
            response = error.response;
        });
    return response;
    console.log(response);
}


export {
    hotel, room_hotel
}