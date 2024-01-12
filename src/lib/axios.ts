import axios from "axios";
export default axios.create({
    baseURL: process.env.BASE_URL_PTIT,
    headers: {
        Accept: "application/json, text/plain, */*",
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: process.env.BASE_URL_PTIT + "/",
        "Sec-Ch-Ua":
            '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
    },
});

export const clientAxios = axios.create({
    baseURL: "https://qldt.ptit.edu.vn",
    headers: {
        Accept: "application/json, text/plain, */*",
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: "https://qldt.ptit.edu.vn/",
        "Sec-Ch-Ua":
            '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "Access-Control-Allow-Origin": "http://localhost:3000",
    },
});
