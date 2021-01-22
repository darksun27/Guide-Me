import { Button } from "@material-ui/core";

export const EndInteraction = ():JSX.Element => {
    const handleClick = () => {
        var win = window.open('https://ufl.qualtrics.com/jfe/form/SV_3slmjAOwipia4Em','_blank');
        win?.focus();
    }
    return (
        <Button variant="contained" color="secondary" size="large" style={{minWidth:"25%", marginRight:"20px"}} onClick={handleClick}>
            END INTERACTION
        </Button>
    )
}