import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";

const Tablebox = () => {
    const [todo, setTodo] = useState('')
    const [toDoid, setToDoid] = useState('')
    const [toDotitle, setToTitle] = useState('')
    const [userid, setUserId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        getlist()
    }, [])

    const getData = async (e) => {
        let id = e.target.value;
        if (!id) {
            getlist()
        }
        else {
            let data = await fetch(`https://jsonplaceholder.typicode.com/todos/?id=${id}`);
            data = await data.json();
            if (data) {
                setTodo(data)
            }
        }
    }
    const getlist = () => {
        fetch(`https://jsonplaceholder.typicode.com/todos`).then((res) => {
            return res.json()
        }).then((res) => {
            setTodo(res)
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    const userDetails = (id, title, userid) => {
        let data = fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        data.then((res) => res.json()).then((res) => {
            setToDoid(res.id);
            setToTitle(title);
            setUserId(userid);
            setName(res.name);
            setEmail(res.email)
        })

    }
    return (
        <div>

            <div className="container-fluid text-center mt-5">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <p style={{ fontWeight: "bold", fontSize: "20px" }}>Todos</p>
                            <input onChange={getData} type='text' placeholder='Search here' style={{ borderRadius: "5px" }} />

                        </div>
                        <Table bordered className='mt-3'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    todo && todo.length > 0 ?
                                        todo.map((item) => (
                                            <tr key={item.id}>
                                                <td >{item.id}</td>
                                                <td >{item.title}</td>
                                                <td >{item.completed}</td>
                                                <button className='btn btn-primary bg-red' style={{ color: "black" }} onClick={() => userDetails(item.id, item.title, item.userId)}>View user</button>
                                            </tr>

                                        )) : <span>No data</span>
                                }

                            </tbody>
                        </Table>

                    </div>

                    <div className="col-lg-4 col-lg-4 col-sm-12 col-12 mt-3" >
                        <p style={{ fontWeight: "bold" }}>UserDetails</p>
                        <div style={{ border: "2px solid black" }}>
                            <div style={{ display: "flex", justifyContent: "space-around", padding: "5px" }}>
                                <h6>ToDo id :</h6>
                                <p>{toDoid}</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-around", padding: "5px" }}>
                                <h6>toDo Title :</h6>
                                <p>{toDotitle}</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-around", padding: "5px" }}>
                                <h6>User Id :</h6>
                                <p>{userid}</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-around", padding: "5px" }}>
                                <h6>Name :</h6>
                                <p>{name}</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-around", padding: "5px" }}>
                                <h6>Email :</h6>
                                <p>{email}</p>
                            </div>
                        </div>
                    </div>




                </div>

            </div>
        </div>
    )
}
export default Tablebox;