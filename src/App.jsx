import axios from 'axios'
import { useState, useEffect } from 'react'
import Users from './Users';
import './App.css'

export default function App() {
  let [users, setUsers] = useState([]);
  let [ID, setID] = useState('');
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [updatedName, setUpdatedName] = useState('');
  let [updatedEmail, setUpdatedEmail] = useState('');

  async function getUsers() {
    const res = await axios.get('http://localhost:5000/users');
    setUsers(res.data);
    console.log(users);
  }

  useEffect(() => {
    getUsers()
  }, []);

  async function addUser(e) {
    e.preventDefault();
    await axios.post('http://localhost:5000/users', {name: name, email: email});
    setName('');
    setEmail('');
    getUsers();
  }

  async function deleteUser(id) {
    await axios.delete(`http://localhost:5000/users/${id}`);
    getUsers();
  }

  async function updateUser(id) {
    await axios.put(`http://localhost:5000/users/${id}`, {name: updatedName, email: updatedEmail});
    setID('');
    setUpdatedName('');
    setUpdatedEmail('');
    getUsers();
  }

  return (
    <div className="">
      <div className="flex items-center justify-center mb-8 gap-10">  
        <div className="add flex flex-col items-center justify-center">
            <h1 className='text-4xl'>Add User</h1>
          <form onSubmit={(e)=>(addUser(e))}>
            <div className="flex flex-col items-center">
              <div className="inputs">
                <input 
                  className='p-3 bg-gray-200 m-2' 
                  type="text" 
                  placeholder='name' 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                  />
                <input 
                  className='p-3 bg-gray-200 m-2' 
                  type="email" 
                  placeholder='email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  />
              </div>
              
              <button type="submit" className='bg-yellow-500 rounded-2xl p-4 w-100 '>Submit</button>
          </div>
          </form>
        </div>

        <div className="update flex flex-col items-center justify-center">
          <h1  className='text-4xl'>Update User</h1>
          <form onSubmit={(e) => {e.preventDefault();updateUser(ID);}}>
            <div className="flex flex-col items-center justify-center">
              <div className="inputs">
                <input 
                  className='p-3 bg-gray-200 m-2' 
                  type="text" 
                  placeholder='ID' 
                  value={ID} 
                  onChange={(e) => setID(e.target.value)} 
                  required
                  />
                <input 
                  className='p-3 bg-gray-200 m-2' 
                  type="text" 
                  placeholder='name' 
                  value={updatedName} 
                  onChange={(e) => setUpdatedName(e.target.value)} 
                  required
                  />
                <input 
                  className='p-3 bg-gray-200 m-2' 
                  type="email" 
                  placeholder='email' 
                  value={updatedEmail} 
                  onChange={(e) => setUpdatedEmail(e.target.value)} 
                  required
                  />
              </div>
            
              <button type='submit' className='col-start-5 bg-indigo-500 rounded-2xl p-4 w-100'>Update</button>
            </div>
          </form>
        </div>
      </div>
      
      <hr />
      <div className="Display">
        <h1 className="text-4xl m-5 pl-5">USERS</h1>
        <div className='grid grid-cols-4 gap-2 mx-10'>
          {users.map((user) => (
            <div key={user.id} className="contents">
              <div className="mt-2 col-span-3">
              <Users id={user.id} name={user.name} email={user.email}/>
              </div>
              <button className='col-start-4 bg-red-500 rounded-2xl mt-2' onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      </div>
  );
}