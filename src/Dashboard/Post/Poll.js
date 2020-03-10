import React from 'react';
import Plot from 'react-plotly.js';
import Cookie from './../../Utility/Cookie';
class Poll extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            seletedCategory: null,
            voted: false,
            content: props.data,
            data: null
        };
        this.getData = this.getData.bind(this);
        this.votePoll = this.votePoll.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.getData();  
    }

    getData(){
        var options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
            }
        };
        fetch("http://"+ process.env.REACT_APP_API_HOST +"/posts/postGetPollVote/" + this.state.content, options).then( result => {
            return result.json();
        }).then(vote => {
            
            if(!vote.voted){
                this.setState({categories: vote.categories, voted: false});
            }else{
                this.setState({voted: true});
                fetch("http://"+ process.env.REACT_APP_API_HOST +"/posts/postGetPoll/" + this.state.content, options).then( result => {
                    return result.json();
                }).then(result => {
                    this.setState({data: result.data});
                });
            }
        });

    }

    selectCategory(category){
        this.setState({seletedCategory: category});
    }

    onChange(event){
        this.setState({seletedCategory: event.target.value});
    }

    votePoll(event){
        event.preventDefault();
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookie.getCookie('HC_JWT')
            },
            body: JSON.stringify({
                pollID: this.state.content,
                category: this.state.seletedCategory
            })
        };
        fetch("http://"+ process.env.REACT_APP_API_HOST +"/posts/postVotePoll", options).then( result => {
            return result.json();
        }).then(result => {
            this.setState({data: result.data});
            window.location.reload();
        });
    }

    render(){
        var layout = {
            autosize: true
        };

        if(!this.state.voted){
            
            return (
                <form onSubmit={this.votePoll} className="pollVote">
                    <ul>
                        {
                            this.state.categories.map((category, i) => {
                                return (
                                <li key={i} onClick={() => this.selectCategory(category.category)}  className="border-lg border-round-small">
                                   <input type="radio"
                                          onChange={this.onChange}
                                          checked={this.state.seletedCategory === category.category} 
                                          value={category.category} />
                                   <label className="d-inline">{category.category}</label>
                                </li>
                                );
                            })
                        }
                        <button className="btn-primary" type="submit">Vote</button>
                    </ul>
                </form>
            );
        }else{
            return (<Plot data={this.state.data} layout={layout}></Plot>);
        }
    }
}
export default Poll;
