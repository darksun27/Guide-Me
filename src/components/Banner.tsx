import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import guideMeLogo from 'assets/guideMeLogo.png'

export const Banner = (props):JSX.Element => {
    const handleSelectA = (e) => {
        props.setCodeA(e.target.value);
        props.clearMessages();
    }
    const handleSelectB = (e) => {
        props.setCodeB(e.target.value)
        props.clearMessages();
    }
    return (
        <Box display="flex" flexDirection="column" alignItems="center" style={{height:"200"}}>
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <img src={guideMeLogo} alt="Guide Me Logo" />
            </Grid>
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
            <Typography variant="h5" gutterBottom>
                Communicate and help between  
                <select onChange={handleSelectA} defaultValue={'en'}>
                    {props.menuItems}
                </select>
                and   
                <select onChange={handleSelectB} defaultValue={'fr'}>
                    {props.menuItems}
                </select>
            </Typography>
            </Grid>
        </Box>
    )
}
