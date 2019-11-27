import React from 'react';
import Plot from 'react-plotly.js';

class Poll extends React.Component{
    constructor(props){
        super(props);
        this.state = {data: props.data};

    }

    render(){
        return (
            <Plot data={this.state.data} />
        );
    }
}
export default Poll;
