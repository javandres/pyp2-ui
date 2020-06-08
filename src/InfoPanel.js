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

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0)
  ];
  

export default class InfoPanel extends PureComponent {
  //const classes = useStyles();
  render() {
       
    if (!this.props.data) {
        return <div />;
    }
    const data = [
        {
          subject: 'Caminable', 
          usosw: this.props.data.usosw_w,
          cantuso: this.props.data.cantuso_w,
          usouniq: this.props.data.usosuniq_w,
          area: this.props.data.area_w,
        },
        {
          subject: 'Cicleable', 
          usosw: this.props.data.usosw_b,
          cantuso: this.props.data.cantuso_b,
          usouniq: this.props.data.usouniq_b,
          area: this.props.data.area_b,
        },  
        {
          subject: 'T.Público', 
          usosw: this.props.data.usosw_b,
          cantuso: this.props.data.cantuso_tp,
          usouniq: 0,
          area: 0,
        }
      ];
    return (
      <div className="control-panel">
        <h3>Indice de movilidad sustentable: </h3>
        {/* <p>
          Haga clic en el mapa para consultar el índice de movilidad
        </p> */}
         <RadarChart width={320} height={220} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" >
            </PolarAngleAxis>   
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="usosw" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
    
    <TableContainer component={Paper}>
      <Table  aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell className='info-table-cell-title' align="right">Cant. Usos</TableCell>
            <TableCell className='info-table-cell-title' align="right">Usos Unicos</TableCell>
            <TableCell className='info-table-cell-title' align="right">Area</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.subject}  >
              <TableCell component="th" scope="row" className='info-table-cell'>
                {row.subject}
              </TableCell>
              <TableCell className='info-table-cell' align="right">{row.cantuso}</TableCell>
              <TableCell className='info-table-cell' align="right">{row.usouniq}</TableCell>
              <TableCell className='info-table-cell' align="right">{row.area}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    );
  }
}