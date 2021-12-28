import React, { Component } from 'react';
import "./Content.css";

class Index extends Component {


    state = {
        inputValue: ``,

    }


    changeMessegeInput = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }


    sendMesseg = () => {
        let from = 3;
        let to = this.props.selectedUser.id;
        let text = this.state.inputValue
        this.props.sendMesseg(from, to, text)
    }
    render() {
        const { selectedUser, history } = this.props;
        const { inputValue } = this.state
        return (
            <div className={"row"}>
                <div className="col-md-12 content text-white py-3  text">
                    {
                        selectedUser ?    <h1> <img src={selectedUser.icon } alt="img" className={"imageSt"} />  { selectedUser.name + " " + selectedUser.lastName + " " + selectedUser.phone}</h1> : ""
                    }
                </div>
                <hr />
                <div className="col-md-9 position">
                    <div className="input-group ">

                        
                            <input type="text" required className={"form-control"} value={inputValue} onChange={this.changeMessegeInput} />

                            <button className={"input-group-append btn btn-info"} onClick={this.sendMesseg} >Send</button>
                        
                    </div>
                </div>
                <div className="col-md-12 bg-white mt-5" style={{ height: "720px", overflow: "hidden",  overflowY: "scroll" }} className={"massageArea"}>
                    {console.log(history)}
                    {
                        history.map((item, index) => {
                            return <div className={"row"} key={index} >
                                {console.log(item.id)}
                                <div className={`col-md-7 ${item.from === 3 ? "offset-10" : ""}`}>
                                    <div className="messages px-3 textStyle">
                                        <p>{item.text}</p>
                                        <span className={"close"}>{item.date}</span>
                                    </div>

                                    <div className='boxImage'>
                                        <img src="https://phonoteka.org/uploads/posts/2021-06/1624944636_10-phonoteka_org-p-gori-v-tumane-oboi-krasivo-10.jpg" alt="img" className='imageStyle' />
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Index;

