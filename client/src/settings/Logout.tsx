import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate('/');
    };

    return (
        <Button variant="contained" color="success" onClick={handleLogout}>
            Logout 
        </Button>
    );
};

export default Logout;
