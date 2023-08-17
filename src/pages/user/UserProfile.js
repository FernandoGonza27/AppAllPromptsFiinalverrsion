import React, { useState } from 'react';
import "./userprofile.css"
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import axios from "../../axiosConfig";
const UserProfile = () => {
    const { user } = useContext(AuthContext);
    //refrescar  informacion
    //const [list, setList] = useState([]);
    //const { data, loading, error } = useFetch("http://localhost:3300/api/users");
  
    //useEffect(() => {
    //  setList(data);
    //}, [data]);    
    const initialUserData = {
        name: user.username,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        isAdmin:user.isAdmin,
        isVerify:user.isVerify,
        auth:user.auth
    };

    const [userData, setUserData] = useState(initialUserData);
    const [isEditMode, setIsEditMode] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(user.auth);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditModeToggle = () => {
        setIsEditMode(!isEditMode);
    };

    const handleTwoFactorToggle = () => {
        setTwoFactorEnabled(!twoFactorEnabled);
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        console.log(user);
    
        try {
            const res = await axios.put(`http://localhost:3300/api/users/${user._id}`, userData);
            // Verificamos si la respuesta contiene el token y los detalles del usuario
            console.log(res.data);
            setIsEditMode();
        } catch (error) {
            // Manejar errores de respuesta
            if (error.response) {
                console.log("Error de respuesta:", error.message);
            } else if (error.request) {
                console.log("Error de solicitud:", error.message);
            } else {
                console.log("Error general:", error.message);
            }
        }
    };

    return (
        <div className='container'>
            <h2>Perfil de Usuario</h2>
            {isEditMode ? (
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Telefono:
                        <input
                            type="text"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Contrasena:
                        <input
                            type="text"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                        />
                    </label>

                    {/* Aquí agregar más campos de formulario para email, contraseña, número de teléfono */}
                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onClick={handleEditModeToggle}>
                        Cancelar
                    </button>
                </form>
            ) : (
                <>
                    <div className='user-info'>
                        <p>Nombre: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <p>Telefono: {userData.phoneNumber}</p>
                        <p>Contrasena: {userData.password}</p>
                        {/* Aquí mostrar los otros atributos */}
                        <button onClick={handleEditModeToggle}>Editar</button>
                    </div>
                    <label>
                        <input
                            type="checkbox"
                            checked={twoFactorEnabled}
                            onChange={handleTwoFactorToggle}
                        />
                        Habilitar Validación de Dos Pasos
                    </label>

                </>
            )}

        </div>
    );
}

export default UserProfile;
