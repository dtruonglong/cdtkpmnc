
const jwt = require("jsonwebtoken");
import { fetchDataClientSite } from "./axios";

export function decode(token) {

    let promise = new Promise(function (resolve, reject) {
        jwt.verify(token, process.env.JWT_KEY, function (error, decoded) {
            if (error) {
                reject({
                    isError: true,
                    error
                })
            }
            resolve({
                isError: false,
                decoded
            })
        });
    });

    return promise
}

export function allowAccess(currentRole, allowRoles) {
    return allowRoles.includes(currentRole) || allowRoles.includes('all')
}


export function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export async function checkCampaign({ id_group }) {
    const { data, statusText } = await fetchDataClientSite.post("/campaign/check-campaign", { id_group })
    const count = data.result.rows?.[0]?.count
    if (count) return count != 0
    return false
}


export async function deleteCampagin({ id_group }) {
    const { data, statusText } = await fetchDataClientSite.post("/campaign/delete-campaign", { id_group })

    return statusText == "OK"
}

export async function getAllUser() {
    const { data, statusText } = await fetchDataClientSite.post("/user/get-users")
    const users = data.result?.rows;

    return users
}

//https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export const groupBy = (arr, key) => {
    const initialValue = {};
    return arr.reduce((acc, cval) => {
        const myAttribute = cval[key];
        acc[myAttribute] = [...(acc[myAttribute] || []), cval]
        return acc;
    }, initialValue);
};

export async function getUsersInfo() {

    const users = await getAllUser()

    return groupBy(users, 'username')
}

