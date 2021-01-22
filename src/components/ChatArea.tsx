import Chip from "@material-ui/core/Chip"
import lang from "data/lang.json"
export const ChatArea = (props) => {
    return (
      <div style={{minHeight:"50vh", maxHeight:"50vh", minWidth:"40vw", maxWidth:"40vw", backgroundColor:"#dfdfdf", overflow:"Hidden", overflowY:"scroll", borderRadius:"25px"}}>
        <div style={{display:"flex", justifyContent:"center"}}>
        <Chip
        style={{marginTop:"10px", marginBottom:"10px"}}
        label={"Please write in " + lang.translation[props.from].nativeName}
        color="primary"/>
        </div>
        {props.list}
      </div>
    )
}