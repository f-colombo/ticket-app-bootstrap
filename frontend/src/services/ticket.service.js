import http from '../http-common';

class TicketDataService {

    getAll() {
        return http.get('/ticket');
    }

    get(id) {
        return http.get(`/ticket/${id}`);
    }

    create(data) {
        return http.post('/ticket', data);
    }

    update(id, data) {
        return http.put(`/ticket/${id}`, data);
    }

    delete(id) {
        return http.delete(`/ticket/${id}`);
    }

    deleteAll() {
        return http.delete('/ticket');
    }

}

export default new TicketDataService();
