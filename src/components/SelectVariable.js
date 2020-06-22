import * as React from 'react';
import {PureComponent} from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

export default class SelectVariable extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            variable:"InMovSos"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({
            variable: event.target.value
        })
        this.props.onChange(event.target.value)
    }

    render(){
        const state = this.state
        return(
            <FormControl >
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.variable}
                onChange={this.handleChange}
                >
                    <MenuItem value={"InMovSos"}>Índice de Movilidad Sustentable</MenuItem>
                    <MenuItem value={"subi_walk"}>Índice de Caminabilidad</MenuItem>
                    <MenuItem value={"subi_bike"}>Índice de Cicleabilidad</MenuItem>
                    <MenuItem value={"subi_tpubl"}>Índice de Transporte Público</MenuItem>
                </Select>
            </FormControl>
        );
    }
}