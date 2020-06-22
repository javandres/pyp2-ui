import * as React from 'react';
import {PureComponent} from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Label
  } from 'recharts';

import { styled } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Chip, IconButton, Avatar } from '@material-ui/core';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import CancelIcon from '@material-ui/icons/Cancel';
import * as d3 from "d3";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700
    },
    tablecell: {
        fontSize: '40pt'
    }
});   

const sequentialScale = d3.scaleSequential()
  .domain([1, 0])
  .interpolator(d3.interpolateYlGnBu);
  
// function getContrast50($hexcolor)
// { 
//   return (hexdec($hexcolor) > 0xffffff/2) ? 'white':'black'; 
// }  

export default class InfoPanel extends PureComponent {

  constructor(props){
    super(props)
    this.state = {
      showPanel: false,
    } 
    this.handleClose = this.handleClose.bind(this);

    
  }
  
  handleClose(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({showPanel:false})
 
    
  }

  componentDidUpdate(prevProps) {
   if (this.props.data !== prevProps.data) {
    this.setState({showPanel:true})
   }
   
  }

  
  render() {
    const { showPanel} = this.state;
    console.log("showpanel", showPanel)
    if (!showPanel || !this.props.data) {
        return <div />;
    }
    const data = [
        {
          subject: 'Caminable', 
          usosw: this.props.data.usosw_w,
          cantuso: this.props.data.cantuso_w,
          usouniq: this.props.data.usosuniq_w,
          area: Math.round(this.props.data.area_w / 1000000, 2),
          subi: this.props.data.subi_walk.toFixed(2),
          icon: <DirectionsWalkIcon style={{color: sequentialScale(this.props.data.subi_walk)  }} />
        },
        {
          subject: 'Cicleable', 
          usosw: this.props.data.usosw_b,
          cantuso: this.props.data.cantuso_b,
          usouniq: this.props.data.usouniq_b,
          area: Math.round(this.props.data.area_b / 1000000, 2),
          subi: this.props.data.subi_bike.toFixed(2),
          icon: <DirectionsBikeIcon style={{color: sequentialScale(this.props.data.subi_bike)  }} />
        },  
        {
          subject: 'T.Público', 
          usosw: this.props.data.usosw_b,
          cantuso: this.props.data.cantuso_tp,
          usouniq: this.props.data.usouniq_tp,
          area: Math.round(this.props.data.area_tp / 1000000, 2 ),
          subi: this.props.data.subi_tpubl.toFixed(2),
          icon: <DirectionsBusIcon style={{color: sequentialScale(this.props.data.subi_tpubl)  }} />
        }
      ];
    return (
      <Paper elevation={3} className="control-panel" >
        <IconButton className='closeInfoPanelBtn' onClick={this.handleClose} aria-label="delete" color="secondary">
              <CancelIcon  size="small" />
        </IconButton>
        <h3>
        
        Indice de movilidad sustentable:
        <br/>
          <Chip avatar={<Avatar style={{color:'black' ,backgroundColor: sequentialScale(this.props.data.InMovSos)  }}> </Avatar>}
                color='secondary'
                label={this.props.data.InMovSos.toFixed(2)} />
              
    
        </h3>
        <RadarChart width={300} height={175} data={data}>
           <PolarGrid />
             <PolarAngleAxis dataKey="subject" >
            </PolarAngleAxis>   
            <PolarRadiusAxis />
            <Radar name="SUBI" dataKey="subi" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
    
     <TableContainer component={Paper}>
       <Table  aria-label="simple table" >
        <TableHead>
           <TableRow>
             <TableCell></TableCell>
             <TableCell className='info-table-cell-title' align="right">Cant. Usos</TableCell>
             <TableCell className='info-table-cell-title' align="right">Usos Unicos</TableCell>
             <TableCell className='info-table-cell-title' align="right">Indice</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {data.map((row) => (
             <TableRow key={row.subject}  >
               <TableCell component="th" scope="row" className='info-table-cell'>
                 {row.icon}
               </TableCell>
               <TableCell className='info-table-cell' align="right">{row.cantuso}</TableCell>
               <TableCell className='info-table-cell' align="right">{row.usouniq}</TableCell>
               <TableCell className='info-table-cell-subi' align="right">
                 <Chip  
                     color="primary" label={row.subi} 
                     avatar={<Avatar style={{backgroundColor: sequentialScale(row.subi)  }}> </Avatar>}
                 />
                </TableCell>
            </TableRow>
           ))}
         </TableBody>
       </Table>

     </TableContainer>
 
      </Paper>  

    );
  }
}