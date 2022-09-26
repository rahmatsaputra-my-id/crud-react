import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const App = ({ className }) => {
   const [state, setState] = useState({
      name: '',
      email: '',
      phone: '',
      gender: '',
      data: []
   });
   const {
      name,
      email,
      phone,
      gender,
      data
   } = state;
   const arryEmailExist = data.filter(inputText => inputText.email === email);
   const lengthEmailExist = arryEmailExist.length;
   const isEmailExist = lengthEmailExist !== 0;
   const isAllFieldEmpty = !name || !email || !phone || !gender;
   const payload = {
      name,
      email,
      phone,
      gender
   }
   const joined = data.concat(payload);
   const regexOnlyNumber = /[^0-9]+/;


   const onEditData = (selectedEmail) => {

      //Initailize array of objects.
      let datum = state.data;
      //Find index of specific object using findIndex method.  
      let objIndex = datum.findIndex((obj => obj.email === selectedEmail));

      // When specific item is not found and input not valid
      if (objIndex === -1 || !_handlerValidateInput()) {
         return;
      }

      // make new object of updated object.   
      const updatedObj = {
         ...datum[objIndex],
         name: name,
         email: email,
         phone: phone,
         gender: gender,
      };

      const updateData = [
         ...datum.slice(0, objIndex),
         updatedObj,
         ...datum.slice(objIndex + 1),
      ];

      setState({
         data: updateData
      })
   }

   const onDeleteData = async (selectedId) => {

      let datum = state?.data;
      datum.splice(selectedId, 1);

      setState({
         ...state,
         data: datum
      })
   }

   const onSubmitForm = async (e) => {
      e.preventDefault();

      // Input validation alert :
      if (isAllFieldEmpty) {
         alert('All input must be filled !');
      } else if (isEmailExist) {
         alert('Your email has been registered, please login !');
      } else {
         setState({
            data: joined,
            name: '',
            email: '',
            phone: '',
            gender: ''
         })
      }

   };

   const onResetForm = (e) => {
      e.preventDefault();

      setState({
         ...state,
         name: '',
         email: '',
         phone: '',
         gender: '',
      });
   };

   useEffect(() => {
      // console.log('state.data', state.data)
   })

   const _handlerValidateInput = (fieldType, text) => {
      const isFieldName = fieldType === "nameUser" && text;
      const isFieldEmail = fieldType === "emailUser" && text;
      const isFieldPhone = fieldType === "phoneUser" && text;
      const isFieldGender = fieldType === "genderUser" && text;
      const isUpdateDataValid = name.length !== 0 && email.length !== 0 && phone.length !== 0 && gender.length !== 0;

      if (isUpdateDataValid || text) {
         if (isFieldName) {
            setState({ ...state, name: text.target.value })
         } else if (isFieldEmail) {
            setState({ ...state, email: text.target.value })
         } else if (isFieldPhone) {
            setState({ ...state, phone: text.target.value })
         } else if (isFieldGender) {
            setState({ ...state, gender: text.target.value })
         }
      } else {
         alert('All input must be filled !');
      }

   }


   return <>
      <div className={className}>
         <h1>Users</h1>
         <form onSubmit={onSubmitForm} onReset={onResetForm}>
            <div className="form-group">
               <label>Name :</label>
               <input
                  aria-label="name-input"
                  type="text"
                  placeholder="User Example"
                  className="form-control"
                  value={state.name}
                  onChange={(text) => { _handlerValidateInput('nameUser', text) }}
               />
            </div>
            <div className="form-group">
               <label>Email :</label>
               <input
                  aria-label="email-input"
                  type="email"
                  placeholder="username@example.com"
                  className="form-control"
                  value={state.email}
                  onChange={(text) => { _handlerValidateInput('emailUser', text) }}
               />
            </div>
            <div className="form-group">
               <label>Phone :</label>
               <input
                  aria-label="phone-input"
                  type="tel"
                  placeholder="081123123123"
                  className="form-control"
                  value={state.phone}
                  onChange={(text) => { _handlerValidateInput('phoneUser', text) }}
               />
            </div>
            <p>Gender : </p>
            <select
               aria-label="gender-input"
               className="form-control"
               value={state.gender}
               onChange={(text) => { _handlerValidateInput('genderUser', text) }}
            >
               <option value="">Pick a gender</option>
               <option value="male">Male</option>
               <option value="female">Female</option>
            </select>
            <div className='button-group'>
               <button className='btn btn-secondary' type='reset'>Clear</button>
               <button className='btn btn-secondary' type='submit'>Create</button>
            </div>
         </form>
         <br />
         <table aria-label="table-output">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {
                  state?.data && state?.data?.map((value, index) => {
                     return (
                        <tr key={index}>
                           <td>{index + 1}</td>
                           <td>{state.data[index].name}</td>
                           <td>{state.data[index].email}</td>
                           <td>{state.data[index].phone}</td>
                           <td>{state.data[index].gender}</td>
                           <td className='action-buttons'>
                              <button className='btn btn-success btn-edit' onClick={() => { onEditData(value.email) }}>Edit</button>
                              <button className='btn btn-danger btn-delete' onClick={() => { onDeleteData(index) }}>Delete</button>
                           </td>
                        </tr>
                     );
                  })
               }
            </tbody>
         </table>
      </div>
   </>;
};

export default styled(App)`
   margin: 100px auto;
   width: 470px;

   input, select {
     margin-bottom: 10px;
     display: block;
     width: 100%;
   } 

   table, th, td {
     border: 1px solid black;
   }

   table {
     width: calc(100%);
     border-collapse: collapse;
   }

   td:not(:first-child) {
     max-width: 100px;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
   }

   p {
     margin-bottom: 2px;
   }

   .button-group {
     display: flex;
     justify-content: space-between;
     margin-top: 25px;
     button {
       width: 100px;
       height: 35px;
       cursor: pointer;
     }
   }

   select:invalid {
     color: #666;
   }
   select.grey {
     color: grey;
   }
   option[value=""][disabled] {
     color: grey;
   }
   option {
     color: #000;
   }

   td.action-buttons {
     text-align: center;
     padding: 3px 0px;
     max-width: initial;
     button {
       cursor: pointer;
       margin: 0px 3px;
     }
   }
 `;