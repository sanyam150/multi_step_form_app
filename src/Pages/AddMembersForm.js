import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import '../App.css';
import { MdDeleteSweep } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

const AddMembersForm = () => {
  const navigate = useNavigate();
  const storedData = localStorage.getItem('userInformation');
  const userData = storedData ? [JSON.parse(storedData)] : [];
  const allMembers = localStorage.getItem('membersInformation');
  const allMembersData = allMembers ? JSON.parse(allMembers) : [];
  const [familyMembersData, setFamilMembersData] = useState(allMembersData);
  const email = userData.length > 0 ? userData[0].email : '';
  const membersAllFinalList = localStorage.getItem(email)
    ? JSON.parse(localStorage.getItem(email))
    : [];

  const [finalMembersList, setFinalMembersList] = useState(membersAllFinalList);
  const formSchema = yup.object().shape({
    membersName: yup.string().required('Members Name  is required'),
  });
  useEffect(() => {
    if (!userData.length) navigate('/');
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (formData) => {
    const memberId = uuidv4();
    setFamilMembersData([...familyMembersData, { id: memberId, ...formData }]);
    localStorage.setItem(
      'membersInformation',
      JSON.stringify([...familyMembersData, { id: memberId, ...formData }])
    );
  };

  const handleRemoveMembers = (id) => {
    const removedMember = familyMembersData.filter(
      (member) => member.id !== id
    );
    setFamilMembersData(removedMember);
    localStorage.setItem('membersInformation', JSON.stringify(removedMember));
  };
  const handleFinalSubmit = () => {
    alert('Form has been submitted');
    localStorage.setItem(userData[0].email, JSON.stringify(allMembersData));
    setFamilMembersData(allMembersData);
    setFinalMembersList(allMembersData);
  };
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>
        Add Members Form and Users Information
      </h2>
      <div className='user_info_members_container'>
        <div>
          <h3>User Information</h3>
          {userData.map((info, index) => (
            <div key={index}>
              <div>First Name: {info.firstName}</div>
              <div>Last Name: {info.lastName}</div>
              <div>Parents Name: {info.parentsName}</div>
              <div>phoneNumber: {info.phoneNumber}</div>
              <div>Email: {info.email}</div>
            </div>
          ))}
        </div>
        <div style={{ margin: '10px 0px 0px 0px' }}>
          <button
            style={{
              fontSize: '1rem',
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '5%',
              cursor: 'pointer',
            }}
            onClick={handleFinalSubmit}
            disabled={!familyMembersData.length}
          >
            {!allMembersData.length
              ? 'Add one member to proceed '
              : 'Final Submit'}
          </button>
        </div>
      </div>
      <div className='AddMembersForm_Container'>
        <div className='AddMembersForm_wrapper'>
          <h3> Members Form</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className='userInfoContainer_inputValues'
              type='text'
              placeholder='Add members name...'
              {...register('membersName')}
            />
            <p>{errors.membersName?.message}</p>
            <input
              className='userInfoContainer_inputValues'
              type='submit'
              style={{ width: '100%' }}
            />
          </form>
        </div>
        <div className='MembersForm_wrapper'>
          <h2 style={{ textAlign: 'center' }}>
            {familyMembersData.length ? 'Current Members' : 'Add Member'}
          </h2>
          {familyMembersData.map((member, index) => (
            <div key={index} style={{ display: 'flex' }}>
              <div style={{ width: '51%', textAlign: 'center' }}>
                <span>{` S.No:${index + 1})`}</span> {member.membersName}
              </div>
              <div style={{ width: '49%', textAlign: 'center' }}>
                {familyMembersData.length > 1 && (
                  <MdDeleteSweep
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                    onClick={() => handleRemoveMembers(member.id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='resultDisplay_container'>
        <h2>Result</h2>
        {finalMembersList.map((members) => (
          <div>{members.membersName}</div>
        ))}
      </div>
    </>
  );
};

export default AddMembersForm;
