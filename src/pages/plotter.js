import { AppBar, Toolbar, Button, Typography, CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Plot = (checkLogin) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!checkLogin){
            navigate('/');
        }
    })

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
        <CssBaseline>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h2">Plot Your Graphs</Typography>
                </Toolbar>
                <Button onClick={handleLogout}>Logout</Button>
            </AppBar>
        </CssBaseline>
        </>
    )
}

export default Plot;