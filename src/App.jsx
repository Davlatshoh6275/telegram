import React, { Component } from 'react';
import Content from './Components/Content/Content';
import Slider from './Components/Slider/Slider';
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

export default class App extends Component {

    state = {
        users:[],
        selectedUser: "",
        messeges: [],
        history: []
    };

    sendMesseg = (fromId, toId, text) => {
        let date = new Date();
        let messeg = {
             from: fromId,
             to: toId,
             text: text,
             date: date.getHours() + ":" + date.getMinutes()
        }
        let a = this.state.messeges;
        a.push(messeg)
        this.setState({
            messeges: a
        })
        localStorage.setItem('messeges', JSON.stringify(a))

        this.getMessegHistory(this.state.users.filter(item=>item.id===toId)[0])
    }

    getMessegHistory = (user) =>{
        let b = localStorage.getItem("messeges")
        if(b) {
            let messeges = JSON.parse(b)
            let history = messeges.filter(item => item.from === 3 && item.to === user.id || item.from === user.id && item.to === 3)
            this.setState({
            history
        })
        }
        
    }


    selectUser = (user) => {
        this.setState({
            selectedUser: user
        })
        localStorage.setItem("selectedUser", JSON.stringify(user))
        this.getMessegHistory(user)

    }

    addUser = (name, lastName, phone, icon) => {
        let a = this.state.users
        a.push({id: a.length,name: name, lastName: lastName, phone: phone, icon: icon,})
        this.setState({
            users: a
        })
        localStorage.setItem("users", JSON.stringify(a))

    }

    componentDidMount() {
        let selectedUser = localStorage.getItem("selectedUser")
        if (selectedUser){
            let selectItem = JSON.parse(selectedUser)
            this.setState({
                selectedUser: selectItem
            })
        }
        let userString = localStorage.getItem("users")
        if (userString){
            let usersArray = JSON.parse(userString)
            this.setState({
                users: usersArray
            })
        }
        let messeges = localStorage.getItem("messeges")
        if(messeges) {
            let a = JSON.parse(messeges)
            this.setState({
                messeges:a
            })
            this.getMessegHistory(a)
        }
    }


    inputChanged = (event) => {
        event.preventDefault();
        let eventt = event.target.value;
    
        const { users } = this.state;
    
        for (let item of users) {
          let arr = item.name.split(" ");

          console.log(arr);
    
          for (let tem of arr) {
            if (tem === eventt) {
              this.setState({
                users: [item],
              });
            }
          }
        }
    };



     render() {
        const {users, selectedUser, history} = this.state
        return (
            <div className={"container-fluid bg"}>
                <div className="row">
                    <div className="col-md-3 sider-parent first ">
                        <Slider selectUser={this.selectUser} inputChanged={this.inputChanged} users={users} addUser={this.addUser} selectedUser={selectedUser}/>
                    </div>
                    <div className="col-md-9 content-parent second ">
                        <Content selectedUser={selectedUser} sendMesseg={this.sendMesseg} history={history}/>
                    </div>
                </div>
            </div>
        );
    }






}



