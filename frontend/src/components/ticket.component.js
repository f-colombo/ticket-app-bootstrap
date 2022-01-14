import React, { Component } from "react";
import TicketDataService from '../services/ticket.service';

export default class Ticket extends Component {
    constructor(props) {
        super(props);

        // Enventos
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeIdUsuario = this.onChangeIdUsuario.bind(this);
        this.onChangeNombreUsuario = this.onChangeNombreUsuario.bind(this);
        this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
        this.onChangePedido = this.onChangePedido.bind(this);
        this.onChangeActivo = this.onChangeActivo.bind(this);
        this.obtieneTicket = this.obtieneTicket.bind(this);
        this.actualizaPedido = this.actualizaPedido.bind(this);
        this.actualizaActivo = this.actualizaActivo.bind(this);
        this.actualizaTicket = this.actualizaTicket.bind(this);
        this.eliminaTicket = this.eliminaTicket.bind(this);

        // Estados
        this.state = {
            actualTicket: {
                id: undefined,
                id_usuario: undefined,
                descripcion: '',
                pedido: false,
                activo: false,
                nombre_usuario: ''
            },
            message: ''
        };

    }

    componentDidMount() {
        this.obtieneTicket(this.props.match.params.id);
    }

    onChangeId(e) {
        const id = e.target.value;

        this.setState(function (prevState) {
            return {
                actualTicket: {
                    ...prevState.actualTicket,
                    id: id
                }
            };
        });
    }

    onChangeIdUsuario(e) {
        const id_usuario = e.target.value;

        this.setState(function (prevState) {
            return {
                actualTicket: {
                    ...prevState.actualTicket,
                    id_usuario: id_usuario
                }
            };
        });
    }

    onChangeNombreUsuario(e) {
        const nombre_usuario = e.target.value;

        this.setState(function (prevState) {
            return {
                actualTicket: {
                    ...prevState.actualTicket,
                    nombre_usuario: nombre_usuario
                }
            };
        });
    }

    onChangeDescripcion(e) {
        const descripcion = e.target.value;

        this.setState(function (prevState) {
            return {
                actualTicket: {
                    ...prevState.actualTicket,
                    descripcion: descripcion
                }
            };
        });
    }

    onChangePedido(e) {
        const pedido = e.target.value;

        this.setState(function (prevState) {
            return {
                actualTicket: {
                    ...prevState.actualTicket,
                    pedido: pedido
                }
            };
        });
    }

    onChangeActivo(e) {
        const activo = e.target.value;

        this.setState(function (prevState) {
            return {
                actualTicket: {
                    ...prevState.actualTicket,
                    activo: activo
                }
            };
        });
    }

    obtieneTicket(id) {
        TicketDataService.get(id)
            .then(response => {
                this.setState({
                    actualTicket: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    actualizaPedido(valor) {
        var data = {
            id: this.state.actualTicket.id,
            id_usuario: this.state.actualTicket.id_usuario,
            descripcion: this.state.actualTicket.descripcion,
            pedido: valor,
            activo: this.state.actualTicket.activo
        };

        TicketDataService.update(this.state.actualTicket.id, data)
            .then(response => {
                this.setState(prevState => ({
                    actualTicket: {
                        ...prevState.actualTicket,
                        pedido: valor
                    },
                    message: ''
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    actualizaActivo(valor) {
        var data = {
            id: this.state.actualTicket.id,
            id_usuario: this.state.actualTicket.id_usuario,
            descripcion: this.state.actualTicket.descripcion,
            pedido: this.state.actualTicket.pedido,
            activo: valor
        };

        TicketDataService.update(this.state.actualTicket.id, data)
            .then(response => {
                this.setState(prevState => ({
                    actualTicket: {
                        ...prevState.actualTicket,
                        activo: valor
                    },
                    message: ''
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    actualizaTicket() {
        TicketDataService.update(
            this.state.actualTicket.id,
            this.state.actualTicket
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: 'Ticket actualizado exitosamente!'
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    eliminaTicket() {
        TicketDataService.delete(this.state.actualTicket.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/tickets');
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {

        const { actualTicket, message } = this.state;

        return (
            <div className='list'>
                <div className="row">
                    <div className="col-md-6">
                        {
                            actualTicket ? (
                                <div className="edit-form">
                                    <h4>Editar Ticket</h4>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="id"><strong>Id</strong></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="id"
                                                value={actualTicket.id || ''}
                                                onChange={this.onChangeId}
                                                readOnly
                                            />
                                        </div>
                                        {/* <div className="form-group">
                                            <label htmlFor="id_usuario"><strong>Id Usuario</strong></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="id_usuario"
                                                value={actualTicket.id_usuario || ''}
                                                onChange={this.onChangeIdUsuario}
                                                name="id_usuario"
                                            />
                                        </div> */}
                                        <div className="form-group">
                                            <label htmlFor="nombre_usuario"><strong>Usuario</strong></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nombre_usuario"
                                                value={actualTicket.nombre_usuario || ''}
                                                onChange={this.onChangeNombreUsuario}
                                                name="nombre_usuario"
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="descripcion"><strong>Descripcion</strong></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="descripcion"
                                                value={actualTicket.descripcion || ''}
                                                onChange={this.onChangeDescripcion}
                                                name="descripcion"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                <strong>Pedido:</strong>
                                            </label>{" "}
                                            {actualTicket.pedido ? "Si" : "No"}
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                <strong>Activo:</strong>
                                            </label>{" "}
                                            {actualTicket.activo ? "Si" : "No"}
                                        </div>
                                    </form>
                                    <div>
                                        {
                                            actualTicket.pedido ? (
                                                <button
                                                    className="btn btn-sm btn-dark"
                                                    onClick={() => this.actualizaPedido(0)}>
                                                    Sin pedir
                                                </button>
                                            ) : (
                                                    <button
                                                        className="btn btn-sm btn-light"
                                                        onClick={() => this.actualizaPedido(1)}>
                                                        &nbsp;Pedir&nbsp;&nbsp;
                                                    </button>
                                                )
                                        }
                                        &nbsp;
                                        {
                                            actualTicket.activo ? (
                                                <button
                                                    className="btn btn-sm btn-light"
                                                    onClick={() => this.actualizaActivo(false)}>
                                                    Desactivar
                                                </button>
                                            ) : (
                                                    <button
                                                        className="btn btn-sm btn-dark"
                                                        onClick={() => this.actualizaActivo(true)}>
                                                        Activar
                                                    </button>
                                                )
                                        }
                                    </div><br />
                                    <button
                                        type="submit"
                                        className="btn btn-sm btn-success"
                                        onClick={this.actualizaTicket}>
                                        Actualizar
                                    </button>
                                    {" "}
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={this.eliminaTicket}>
                                        Eliminar
                                    </button>
                                    {
                                        message ? (
                                            <div>
                                                <br />
                                                <div className="alert alert-success" role="alert">
                                                    {message}
                                                </div>
                                            </div>
                                        ) : (
                                                <div><br /></div>
                                            )
                                    }
                                </div>
                            ) : (
                                    <div>
                                        <br />
                                        <p>Por favor hacer click sobre un ticket...</p>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

// function Ticket() {
//     return (
//         <div>
//             Ticket
//         </div>
//     );
// }

// export default Ticket;