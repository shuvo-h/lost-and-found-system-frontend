import { Container } from '@mui/material';


const Layout = ({children}:{children:React.ReactNode}) => {
    return (
        <Container sx={{ marginTop: "20px" }}>
            {children}
        </Container>
    );
};

export default Layout;