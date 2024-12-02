import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CardExpandable from '../Cards/Cards';

export default function HomeContainer() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container >
                <CardExpandable />
            </Container>
        </React.Fragment>
    );
}