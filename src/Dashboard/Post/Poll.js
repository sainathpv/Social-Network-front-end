import React from 'react';
import Plot from 'react-plotly.js';

class Poll extends React.Component{
    constructor(props){
        super(props);
        this.state = {content: props.data, data: null};
        this.getData();  
    }

    getData(){
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch("http://"+ process.env.REACT_APP_API_HOST +"/posts/postGetPoll/" + this.state.content, options).then( result => {
            return result.json();
        }).then(result => {
            this.setState({data: result.data});
        });
    }
    

    render(){
        var layout = {
            autosize: true
        };

        if(this.state.data === null){
            return (<div></div>);
        }else{
            return (<Plot data={this.state.data} layout={layout}></Plot>);
        }
    }
}
export default Poll;
