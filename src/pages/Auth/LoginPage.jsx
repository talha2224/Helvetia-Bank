import Logo from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import Bg from '../../assets/auth/cover.svg'


const LoginPage = () => {
    const nav  = useNavigate()
    return (


        <div style={{backgroundImage:`url(${Bg})`}} className='flex justify-center items-center w-screen h-screen bg-blue flex-col'>

            <div className='w-[25rem] bg-white p-5 rounded-md'>

                <div className='flex justify-center items-center flex-col'>

                    <img src={Logo} alt="" />
                    <h1 className='text-[1.7rem] font-semibold mt-2'>Welcome back!</h1>
                    <p  className='text-gray mt-1'>Log in to access your personalized music</p>

                    <div className='mt-5 w-[100%]'>
                        <button className='block w-[100%] bg-[#F4F4FF] py-3 rounded-md text-sm cursor-pointer font-medium'>Continue With Google</button>
                        <button className='block w-[100%] bg-[#F4F4FF] py-3 rounded-md text-sm cursor-pointer mt-2 font-medium'>Continue With Apple</button>
                    </div>


                    <div className='flex justify-center items-center mt-3 gap-x-3'>
                        <p className='text-sm text-gray'>Or Signin With</p>
                    </div>

                    <input type="text" placeholder='Email address' className='bg-[#F4F6F9] w-[100%] px-3 h-[2.8rem] rounded-md mt-3 outline-none border-none' />
                    <input type="text" placeholder='Password' className='bg-[#F4F6F9] w-[100%] px-3 h-[2.8rem] rounded-md mt-3 outline-none border-none' />

                    <button onClick={()=>nav("/dashboard/home")} className='mt-2 text-white bg-blue w-[100%] h-[2.5rem] rounded-md'>Sign in</button>
                    <button className='mt-3 text-blue'>Forgot Password</button>
                    <button className='mt-3 text-gray'>Don't have an account ? <Link to={"/register"} className='text-blue'>Signup</Link></button>



                </div>

            </div>



        </div>
    );
};

export default LoginPage;
