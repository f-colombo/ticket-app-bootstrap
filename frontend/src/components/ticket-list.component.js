import React, { Component } from "react";
import { Link } from 'react-router-dom';
import TicketDataService from '../services/ticket.service';

export default class TicketList extends Component {
    constructor(props) {
        super(props);

        // Envetos
        this.onChangeTextoDescripcion = this.onChangeTextoDescripcion.bind(this);
        this.obtieneTickets = this.obtieneTickets.bind(this);
        this.refrescaLista = this.refrescaLista.bind(this);
        this.estableceTicketActivo = this.estableceTicketActivo.bind(this);
        this.remueveTickets = this.remueveTickets.bind(this);
        this.buscaTextoDescripcion = this.buscaTextoDescripcion.bind(this);

        // Estado
        this.state = {
            listaTickets: [],
            actualTicket: null,
            actualIndex: -1,
            textoDescripcion: ''
        };
    }

    componentDidMount() {
        this.obtieneTickets();
    }

    onChangeTextoDescripcion(e) {
        this.setState({
            textoDescripcion: e.target.value
        });
    }

    obtieneTickets() {
        TicketDataService.getAll()
            .then(response => {
                this.setState({
                    listaTickets: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refrescaLista() {
        this.obtieneTickets();
        this.setState({
            actualTicket: null,
            actualIndex: -1
        });
    }

    estableceTicketActivo(ticket, index) {
        this.setState({
            actualTicket: ticket,
            actualIndex: index
        });
    }

    remueveTickets() {
        TicketDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refrescaLista();
            })
            .catch(e => {
                console.log(e);
            });
    }

    buscaTextoDescripcion() {
        console.log('textoDescripcion: ', this.state.textoDescripcion);
        // TicketDataService.getByDescription(this.state.textoDescripcion)
        //     .then(response => {
        //         this.setState({
        //             listaTickets: response.data
        //         });
        //         console.log(response.data);
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     });
    }

    render() {
        const { textoDescripcion, listaTickets, actualTicket, actualIndex } = this.state;

        return (
            <div className='list'>
                <div className="row">
                    <div className='col-md-6'>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="textoDescripcion"
                                placeholder="Buscar por descripcion"
                                value={textoDescripcion}
                                onChange={this.onChangeTextoDescripcion}
                                name="textoDescripcion"
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={this.buscaTextoDescripcion}>
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Lista de tickets</h4>

                        <ul className="list-group">
                            {listaTickets &&
                                listaTickets.map((ticket, index) => (
                                    <li className={
                                        "list-group-item " +
                                        (index === actualIndex ? "active" : "")
                                    }
                                        onClick={() => this.estableceTicketActivo(ticket, index)}
                                        key={index}
                                    >
                                        {/* {ticket.id} {ticket.id_usuario} {ticket.descripcion} {ticket.pedido} {ticket.activo} {ticket.creado} */}
                                        {ticket.descripcion}
                                        &nbsp;
                                        {
                                            ticket.pedido ? (
                                                <span className="badge badge-info">Pedido</span>
                                            ) : ('')
                                        }
                                    </li>
                                ))}
                        </ul>
                        <br />
                        <button className="btn btn-sm btn-danger" onClick={this.remueveTickets}>
                            Borrar todos
                        </button>
                        <br />&nbsp;
                    </div>
                    <div className="col-md-6">
                        {
                            actualTicket ? (
                                <div>
                                    <div className="card">
                                        <div className="card-header">
                                            Ticket Detalle
                                        </div>
                                        <div className="card-body">
                                            {/* <h5 className="card-title"></h5> */}
                                            <div className="card-text">
                                                <div>
                                                    <label>
                                                        <strong>Id:</strong>
                                                    </label>{" "}
                                                    {actualTicket.id}
                                                </div>
                                                <div>
                                                    <label>
                                                        <strong>Usuario:</strong>
                                                    </label>{" "}
                                                    {actualTicket.nombre_usuario}
                                                </div>
                                                <div>
                                                    <label>
                                                        <strong>Descripcion:</strong>
                                                    </label>{" "}
                                                    {actualTicket.descripcion}
                                                </div>
                                                <div>
                                                    <label>
                                                        <strong>Pedido:</strong>
                                                    </label>{" "}
                                                    {actualTicket.pedido ? "Si" : "No"}
                                                </div>
                                                <div>
                                                    <label>
                                                        <strong>Activo:</strong>
                                                    </label>{" "}
                                                    {actualTicket.activo ? "Si" : "No"}
                                                </div>
                                                <div>
                                                    <label>
                                                        <strong>Creado:</strong>
                                                    </label>{" "}
                                                    {actualTicket.creado}
                                                </div>
                                                <Link to={"/tickets/" + actualTicket.id}
                                                    className="btn btn-sm btn-warning">
                                                    Editar
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                    <div>
                                        <div className="card">
                                            <div className="card-header">
                                                Ticket Detalle
                                            </div>
                                            <div className="card-body">
                                                <div className="card-text">Por favor hacer click sobre un ticket...</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }
}
