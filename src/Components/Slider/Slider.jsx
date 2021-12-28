import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import './Slider.css';

class Index extends Component {

    state = {
        ModalVisible: false
    }

    ModalToggle = () => {
        this.setState({
            ModalVisible: !this.state.ModalVisible
        })
    }
    modalEvent = (event) => {
        event.preventDefault();
        let name = event.target[0].value;
        let lastName = event.target[1].value;
        let phone = event.target[2].value;
        let icon = event.target[3].value;
        this.props.addUser(name, lastName, phone, icon)
        this.ModalToggle()
    }
    clickedItemUser = (user) => {
        this.props.selectUser(user)
    }

    render() {
        const { ModalVisible } = this.state
        const { users, selectedUser, inputChanged } = this.props
        return (
            <div className={"sider bg"}>

                <form action="" >
                    
                    <br />
                    <input
                        type="text"
                        id="input"
                        placeholder="Search"
                        className={"w-100 input-group search"}
                        onChange={inputChanged}
                    />
                </form>

                <Button className={"btn btn-dark w-100 mt-3"} onClick={this.ModalToggle}>Add New User</Button>

                <ul className={"list-group mt-3"}>
                    {users.map((item, index) => (
                        <li onClick={() => this.clickedItemUser(item)} className={`list-group-item mt-1 user fond ${selectedUser.id === item.id ? 'active' : ``}`}>
                            <img src={item.icon} alt="img" className='image' />
                            {item.name + ` ` + item.lastName}
                        </li>
                    ))}
                </ul>


                <Modal isOpen={ModalVisible} toggle={this.ModalToggle}>
                    <ModalHeader>
                        <h1>User Info</h1>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.modalEvent} id={"formAdd"}>
                            <label htmlFor="name">Name</label>
                            <input className={"form-control"} id={"name"} type="text" />
                            <label htmlFor="lastName">Last name</label>
                            <input className={"form-control"} id={"lastName"} type="text" />
                            <label htmlFor="phone"> Phone </label>
                            <input className={"form-control"} id={"phone"} type="text" />
                            <label htmlFor="icon"> Icon </label>
                            <input type="text" className={"form-control"} id={"icon"} />
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className={`btn btn-success`} form={"formAdd"}>save</Button>
                        <Button className={"btn btn-warning"} onClick={this.ModalToggle}>cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Index;