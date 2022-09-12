const BASE_URL = "http://localhost:8080/api/users/";
export function getContent() {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },   
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });

}