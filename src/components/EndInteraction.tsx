import { Button } from "@material-ui/core";
import axios  from 'axios';

export const EndInteraction = (props):JSX.Element => {
    const handleClick = () => {
        console.log(props.feedback);
        axios.get("https://fate-warm-interest.glitch.me/save", {
            params:{
                feedback: props.feedback
            }
        }).then((res)=>{}).catch(()=>{});
        var win = window.open('https://ufl.qualtrics.com/jfe/form/SV_3slmjAOwipia4Em','_blank');
        win?.focus();
    }
    return (
        <Button variant="contained" color="secondary" size="large" style={{minWidth:"25%", marginRight:"20px"}} startIcon={<i className="far fa-times-circle"></i>} onClick={handleClick}>
            END INTERACTION
        </Button>
    )
}