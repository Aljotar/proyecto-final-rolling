import React, { useState } from 'react'
import { Card, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap'
import './myProfileView.css'
import swal from 'sweetalert';

import moment from 'moment';
import 'moment/locale/es';
import { FiSettings } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { leerDeLocalStorage } from '../../utils/localStorage';

import { ModalEditProfile } from './ModalEditProfile';
import { ModalEditPassword } from './ModalEditPassword';
import axios from 'axios';
import { SpinnerRW } from '../spinner/SpinnerRW';

moment.locale('es');

export const MyProfileView = ({ user, requestUserData }) => {

    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalPassword, setShowModalPassword] = useState(false);

    const handleCloseModalEditar = () => setShowModalEditar(false);
    const handleShowModalEditar = () => setShowModalEditar(true);

    const handleCloseModalPassword = () => setShowModalPassword(false);
    const handleShowModalPassword = () => setShowModalPassword(true);



    const alertaBorrar = (_id) => {
        swal({
            title: "¿ Esta seguro ?",
            text: "Al eliminar su cuenta perdera el historial de compras y favoritos", icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Fue un gusto, gracias por visitar nuestra web!", {
                        text: "Usted elimino su cuenta con exito",
                        icon: "success",
                      });
                     deleteUser(_id)
                }
            });
    }
    // trae de la API por usuario para borrar.
    const deleteUser = async (_id) => {
        setIsLoading(true);
        const tokenLocal = leerDeLocalStorage('token') || {};
        const headers = { 'x-auth-token': tokenLocal.token };
        localStorage.removeItem('token');
        await axios.delete(`http://localhost:4000/api/usuarios/${user._id}`, { headers });
        history.push('/');;
        setIsLoading(false);
        window.location.reload();
    };

    const birthdayUser = new Date(user.birthday);
    const day = birthdayUser.getUTCDate();
    const month = birthdayUser.getUTCMonth();
    const year = birthdayUser.getUTCFullYear();

    return (
        <>
            <div className="card-profile row  ">
                <Card.Img variant="top" className=" col-12 col-lg-6 img-avatar my-2 mx-auto"
                    src={user.image || 'https://res.cloudinary.com/dcx1rcwvu/image/upload/v1634755567/th_ji3jqh.jpg'} />
                <div className="col-12 col-lg-6  d-flex flex-column aling-items-between card-body-container mx-auto">
                    <Card.Body>
                        <Card.Title className="text-center my-3">{user.name} {user.lastName}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Cumpleaños: {day}/{month + 1}/{year}</ListGroup.Item>
                            <ListGroup.Item>
                                {user.role === 'admin' ? "Administrador " : "Cliente "}
                                {moment(user.register).fromNow()}
                            </ListGroup.Item>
                            <ListGroup.Item>{user.email}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    <div className="my-2 d-flex justify-content-end">
                        <button className="m-auto btn-admin " onClick={handleShowModalEditar}>
                            <h5 className="text-center m-0 py-2  ">Editar perfil</h5>
                        </button>
                        <OverlayTrigger
                            trigger="focus"
                            placement="bottom"
                            overlay={
                                <Popover id="popover-basic">
                                    <Popover.Header as="h3">Configurar Cuenta</Popover.Header>
                                    <Popover.Body>
                                        <ListGroup>
                                            <ListGroup.Item>
                                                <button onClick={handleShowModalPassword} className="btn-config">Cambiar Contraseña</button>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <button className="btn-config" onClick={() => alertaBorrar(user._id)} >Eliminar Cuenta</button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Popover.Body>
                                </Popover>
                            }>
                            <button className="m-auto my-2 p-0 circle-btn">
                                <FiSettings className="p-0 mb-1" />
                            </button>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>

            {user.name && <ModalEditProfile
                closeModal={handleCloseModalEditar}
                user={user}
                showModalEditar={showModalEditar}
                requestUserData={requestUserData}
            />}

            {user.name && <ModalEditPassword
                closeModal={handleCloseModalPassword}
                user={user}
                showModalPassword={showModalPassword}
                requestUserData={requestUserData}
            />}

            {isLoading && (
                <SpinnerRW />
            )}


        </>

    )
}
