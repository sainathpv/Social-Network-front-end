import React from 'react';
class PostPanel extends React.Component{


    render(){
        return (
        <div>
            <nav>
                <ul className="d-flex">
                    <li className="active">Home</li>
                    <li>Chats</li>
                    <li>Events</li>
                </ul>
            </nav>
            {/*TODO: POSTS */}
        </div>
        );
    }
}
export default PostPanel;