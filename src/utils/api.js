import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzM4ZjFhNGE0MGI1OWYzZjk1NTU0ODRmOThkZDQwMyIsInN1YiI6IjY2MDNhNjFjMWIxZjNjMDE2MzlhNTMwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i9IdOncW9rHSIL1JJhmyGPXLa8iwoO8dmq42O7isob0";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        })
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};