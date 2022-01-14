import React, { Component } from "react";
import TicketDataService from '../services/ticket.service';
import UserDataService from '../services/user.service';

export default class TicketAdd extends Component {
    constructor(props) {
        super(props);

        // Eventos
        this.onChangeIdUsuario = this.onChangeIdUsuario.bind(this);
        this.onChangeSelIdUsuario = this.onChangeSelIdUsuario.bind(this);
        this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
        this.saveTicket = this.saveTicket.bind(this);
        this.newTicket = this.newTicket.bind(this);

        // Estado
        this.state = {
            id: null,
            id_usuario: undefined,
            descripcion: '',
            pedido: false,
            activo: false,

            listaUsuarios: [],
            selIdUsuario: undefined,

            errorMessage: '',
            submitted: false
        };
    }

    componentDidMount() {
        this.obtieneUsuarios();
    }

    onChangeIdUsuario(e) {
        this.setState({
            id_usuario: e.target.value
        });
    }

    onChangeSelIdUsuario(e) {
        this.setState({
            selIdUsuario: e.target.value
        });
    }

    onChangeDescripcion(e) {
        this.setState({
            descripcion: e.target.value
        });
    }

    obtieneUsuarios() {
        UserDataService.getAll()
            .then(response => {
                let usuariosApi = response.data.map(usuario => {
                    return { id: usuario.id, nombre: usuario.nombre }
                });
                this.setState({
                    listaUsuarios: [{ id: 0, nombre: '(Asignar usuario)' }].concat(usuariosApi),
                    selIdUsuario: 0
                });
                console.log(this.state.listaUsuarios);
            })
            .catch(e => {
                console.log(e);
            });
    }

    saveTicket() {
        //Validar
        if (this.state.selIdUsuario === 0) {
            this.setState({
                errorMessage: 'Debe asignar un usuario.'
            });
            return;
        }
        else if (this.state.descripcion === '') {
            this.setState({
                errorMessage: 'Debe indicar la descripcion.'
            });
            return;
        } else {
            this.setState({
                errorMessage: ''
            });
        }

        var data = {
            id_usuario: this.state.selIdUsuario,
            descripcion: this.state.descripcion
        };

        TicketDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    id_usuario: response.data.id_usuario,
                    descripcion: response.data.descripcion,
                    pedido: response.data.pedido,
                    activo: response.data.activo,
                    creado: response.data.creado,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        // Reset
        this.setState({
            selIdUsuario: 0
        });
    }

    newTicket() {
        this.setState({
            id: null,
            id_usuario: undefined,
            descripcion: '',
            pedido: false,
            activo: false,

            submitted: false
        });
    }

    render() {
        return (
            <div className='list'>
                <div className="row">
                    <div className="col-md-6">
                        {
                            this.state.submitted ? (
                                <div>
                                    <div className="alert alert-success" role="alert">
                                        Ticket creado exitosamente!
                                    </div>
                                    <br />
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={this.newTicket}>
                                        Agregar nuevo
                                    </button>
                                </div>
                            ) : (
                                    <div className='submit-form'>
                                        <h4>Crear Ticket</h4>
                                        {/* <div className="form-group">
                                            <label htmlFor="id_usuario"><strong>Id Usuario</strong></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="id_usuario"
                                                required
                                                value={this.state.id_usuario}
                                                onChange={this.onChangeIdUsuario}
                                                name="id_usuario"
                                            />
                                        </div> */}
                                        <div className="form-group">
                                            <label htmlFor="selUsuario"><strong>Usuario</strong></label>
                                            <select className="form-control" id="selUsuario" name="selUsuario"
                                                value={this.state.selIdUsuario} onChange={this.onChangeSelIdUsuario}>
                                                {this.state.listaUsuarios.map((usuario) => <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description"><strong>Descripcion</strong></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="descripcion"
                                                required
                                                value={this.state.descripcion}
                                                onChange={this.onChangeDescripcion}
                                                name="descripcion"
                                            />
                                        </div>

                                        <button
                                            onClick={this.saveTicket}
                                            className="btn btn-sm btn-success">
                                            Guardar
                                        </button>
                                        <br />
                                        {
                                            this.state.errorMessage ? (
                                                <div>
                                                    <br />
                                                    <div className="alert alert-danger" role="alert">
                                                        {this.state.errorMessage}
                                                    </div>
                                                </div>
                                            ) : (
                                                    <div></div>
                                                )
                                        }

                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }
}
