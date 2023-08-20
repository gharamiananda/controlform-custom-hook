import './App.css';
import AddForm from './components/AddForm';
import UserLogin from './components/global/UserLogin';
import UserRegister from './components/global/UserRegister';

function App() {



  return (
    <>
    {/* <>
      <input required name='fName' value={formValues.fName.value} onChange={e=>handleChange(e)}  placeholder='ENter fName name' />
      <input required name='lLame' value={formValues.lLame.value} onChange={e=>handleChange(e)} placeholder='ENter lLame name' />
      <input required type='password' name='password' value={formValues.password.value} onChange={e=>handleChange(e)} placeholder='ENter password name' />


   


</> */}



{/* <AddForm /> */}
{/* <UserLogin /> */}

<UserRegister />
    </>
  );
}

export default App;
