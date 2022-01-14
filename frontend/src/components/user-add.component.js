import React, { Component } from "react";
// import UserDataService from '../services/user.service';

export default class UserAdd extends Component {
    constructor(props) {
        super(props);

        //Eventos

        // Estado
        this.state = {
            id: null,
            id_tipo: undefined,
            nombre: '',
            email: '',
            pass: '',
            activo: false,

            errorMessage: '',
            submitted: false
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='list'>
                <div className="row">
                    <div className="col-md-6">
                        <div className='submit-form'>
                            <h4>Crear Usuario</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}