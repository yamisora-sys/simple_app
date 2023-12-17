const baseUrl = 'https://fakestoreapi.com/'

export const getProduction = async () => {
    let res =  await fetch(baseUrl + 'products').then(res => res.json());
    return res;
}

export const getLatestProduction = async () => {
    let res =  await fetch(baseUrl + 'products?sort=desc').then(res => res.json());
    // get 5 item 
    res = res.slice(0, 6);
    return res;
}

export const getOldestProduction = async () => {
    let res =  await fetch(baseUrl + 'products?sort=asc').then(res => res.json());
    // get 5 item
    res = res.slice(0, 6);
    return res;
}

export const getCategories = async () => {
    let res =  await fetch(baseUrl + 'products/categories').then(res => res.json());
    return res;
}

export const getProductionByCategory = async (category) => {
    let res =  await fetch(baseUrl + 'products/category/' + category).then(res => res.json());
    return res;
}

export const createUser = async (user) => {
    let res = await fetch(baseUrl + 'users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json());
    return res;
}

export const login = async (username, password) => {
    let res = await fetch(baseUrl + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then(res => res.json());
    return res;
}