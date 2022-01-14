import http from '../http-common';

class UserDataService {

    getAll() {
        return http.get('/user');
    }

    get(id) {
        return http.get(`/user/${id}`);
    }

    create(data) {
        return http.post('/user', data);
    }

    logIn(data) {
        return http.post("/user/login", data);
    }

}

export default new UserDataService();