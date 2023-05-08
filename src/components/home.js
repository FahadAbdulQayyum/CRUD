import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Context } from '../index'

const Home = () => {

    const navigate = useNavigate();

    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const { user, setUser } = useContext(Context)
    const { userId, setUserId } = useContext(Context)
    const data = useContext(Context)
    // console.log(isAuthenticated, setIsAuthenticated);
    console.log('data', data);
    console.log('isAuth', isAuthenticated);

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [img, setImg] = useState('')
    const [about, setAbout] = useState('')
    const [update, setUpdate] = useState(false)
    const [index, setIndex] = useState()
    const [table, setTable] = useState([
        {
            name: 'Fahad',
            address: 'Garden West',
            phone: '03232846250',
            img: 'google.com',
            about: 'Fahad is coincidence name'
        },
        {
            name: 'Aftab',
            address: 'Male',
            phone: '03232846250',
            img: 'google.com',
            about: 'Aftab is my High School friend.'
        },
    ])


    useEffect(() => {
        let auth = localStorage.getItem('IsAuthenticated')
        let userData = JSON.parse(localStorage.getItem('userData'))
        if (JSON.parse(auth)) return setIsAuthenticated(true)
        if (!isAuthenticated) return navigate('/login')
    }, [])


    const Logout = () => {
        console.log('logged out')
        navigate('/login')
        setIsAuthenticated(false)
        localStorage.setItem('IsAuthenticated', false)
    }

    const onClick = e => {
        e.preventDefault();
        let obj = {
            name: name,
            address: address,
            phone: phone,
            img: img,
            about: about
        }
        table.push(obj)
        setTable(...[table])
        setName('')
        setAddress('')
        setPhone('')
        setImg('')
        setAbout('')
        console.log('obj', obj);
    }

    const updateFunc = i => {
        setName(table[i].name)
        setAddress(table[i].address)
        setPhone(table[i].phone)
        setAbout(table[i].about)
        setUpdate(true)
        setIndex(i)
    }

    const onUpdate = e => {
        e.preventDefault();
        // let obj = {
        //     name: name,
        //     address: address,
        //     phone: phone,
        //     img: img,
        //     about: about
        // }
        // table.push(obj)
        // setTable(...[table])
        // setName('')
        // setAddress('')
        // setPhone('')
        // setImg('')
        // setAbout('')
        // console.log('obj', obj);

        // table[index].name = name
        // table[index].address = address
        // table[index].phone = phone
        // table[index].about = about
        // setTable(...[table])
        let objUpd = {
            name: name,
            address: address,
            phone: phone,
            img: img,
            about: about
        }
        table[index] = objUpd
        setTable(...[table])
        setName('')
        setAddress('')
        setPhone('')
        setAbout('')
        setIndex('')
        setUpdate(false)
    }

    const onCancel = () => {
        setName('')
        setAddress('')
        setPhone('')
        setImg('')
        setAbout('')
        setUpdate(false)
        setIndex('')
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className='div'>
                <ul>
                    {/* <h4>Welcome, {`${userData.name}`}</h4> */}
                    <h4>Welcome, {`${JSON.parse(localStorage.getItem('userData')).name}`}</h4>
                    {!isAuthenticated ? <li>
                        <Link to={'/login'}>Login</Link>
                    </li> :
                        <li onClick={Logout}>
                            Logout
                        </li>
                    }
                </ul>
            </div>
            <form className="form"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '30px',
                    width: '50%'
                }}
            >
                <input type="text" placeholder='Enter the name' value={name} onChange={e => setName(e?.target?.value)} />
                <input type="text" placeholder='Enter the address' value={address} onChange={e => setAddress(e?.target?.value)} />
                <input type="number" placeholder='Enter the phone' value={phone} onChange={e => setPhone(e?.target?.value)} />
                <input type="file" accept='images/*' />
                <input type="text" placeholder='Enter the About' value={about} onChange={e => setAbout(e?.target?.value)} />
                {!update ? <input type="submit" value={'Add'} onClick={onClick} /> :
                    <span>
                        <input type="submit"
                            style={{ width: '50%' }}
                            value={'Update'} onClick={onUpdate} />
                        <input type="submit"
                            style={{ width: '50%' }}
                            value={'Cancel'} onClick={onCancel} />
                    </span>
                }
            </form>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Image</th>
                        <th scope="col">About</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {table.map((v, i) =>
                        <tr key={i}>
                            <th scope='row'>{i + 1}</th>
                            <td>{v.name}</td>
                            <td>{v.address}</td>
                            <td>{v.phone}</td>
                            <td>{v.img}</td>
                            <td>{v.about}</td>
                            <td>
                                <button onClick={() => updateFunc(i)}>Update</button>
                            </td>
                        </tr>
                    )}
                    {/* <tr>
                        <th scope="row">1</th>
                        <td>Fahad</td>
                        <td>Garden West</td>
                        <td>03232846250</td>
                        <td>Image Uploaded</td>
                        <td>About Fahad</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Ahmed</td>
                        <td>Garden West</td>
                        <td>03232846250</td>
                        <td>Image Uploaded</td>
                        <td>About Ahmed</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Asadullah</td>
                        <td>Garden West</td>
                        <td>03232846250</td>
                        <td>Image Uploaded</td>
                        <td>About Asadullah</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Aftab</td>
                        <td>Malir</td>
                        <td>03232846250</td>
                        <td>Image Uploaded</td>
                        <td>About Aftab</td>
                    </tr> */}
                </tbody>
            </table >
        </div >
    )
}

export default Home
