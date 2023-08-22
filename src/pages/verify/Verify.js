import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.put(`http://localhost:3300/api/auth/verify/${id}`);
        console.log(response.data);
        if (response.data) {
          console.log("Usuario verificado exitosamente");
          navigate("/login");
        } else {
          console.log("Error al verificar el usuario");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    verifyUser();
  }, [id]);

  return (
    <div>
      <h3>Estás siendo verificado...</h3>
    </div>
  );
}

export default VerifyUser;




    