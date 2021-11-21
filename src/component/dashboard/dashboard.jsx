import React from 'react'
import { Asrtolist } from '../astrolist/astrolist'
import {Card} from "../card/card"
import { Inputcontainer } from '../inputcontainer/inputcontainer'
import "./dashbroad.css"
import {CssBaseline, Paper,Typography} from "@mui/material"
import { Draggable, Droppable } from 'react-beautiful-dnd'




function Dashboard ({list, index}){
  
    return(
        <Draggable  draggableId={list.id} index={index}>
    {(provided)=>(
        <div
        {...provided.draggableProps}
        ref={provided.innerRef}
        >
<Paper 
{...provided.dragHandleProps}
className="dashboard"
style={{backgroundColor:"#eee",
       padding:"0.5em",
       display:"inline-block",
       marginRight:"1rem",
       }}
>
    <CssBaseline/>
    <Asrtolist title={list.title} listId={list.id} x={list}/>
    <Droppable droppableId={list.id}>
        {(provided)=>(
            <div ref={provided.innerRef}{...provided.droppableProps} style={{marginTop:"2em"}}>

   {list.cards.map((card ,index)=>{
   return <Card card={card} key={card.id} index={index} />
     })}

     {provided.placeholder}
            </div>
        )}
    </Droppable>
     <Inputcontainer listId={list.id}  type="card"/>
</Paper>
    </div>

    )}
        
</Draggable>
    )
}
export {Dashboard}
