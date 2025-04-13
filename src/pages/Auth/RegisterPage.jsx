import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import Bg from '../../assets/auth/cover.svg'



const RegisterPage = () => {


  return (

    <div style={{ backgroundImage: `url(${Bg})` }} className='flex justify-center items-center w-screen h-screen bg-blue flex-col'>

      <div className='w-[25rem] bg-white p-5 rounded-md'>

        <div className='flex justify-center items-center flex-col'>

          <img src={Logo} alt="" />
          <h1 className='text-[1.7rem] font-semibold mt-2'>Create an account</h1>
          <p className='text-gray mt-1 text-center'>Please fill out this form, and we'll send you a welcome email so you can verify your email address and sign in.</p>

          <input type="text" placeholder='Your full name' className='bg-[#F4F6F9] w-[100%] px-3 h-[2.8rem] rounded-md mt-3 outline-none border-none' />
          <input type="text" placeholder='Email address' className='bg-[#F4F6F9] w-[100%] px-3 h-[2.8rem] rounded-md mt-3 outline-none border-none' />

          <Link to={"/business/setup"} className='w-[100%]'><button className='mt-2 text-white bg-blue w-[100%] h-[2.5rem] rounded-md'>Sign up</button></Link>
          <button className='mt-3 text-gray'>Already have an account ? <Link to={"/login"} className='text-blue'>Signin</Link></button>

        </div>

      </div>



    </div>
  );
};

export default RegisterPage;