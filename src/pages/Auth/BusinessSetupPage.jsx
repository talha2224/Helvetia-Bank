import React, { useState } from 'react';
import { MdEditSquare, MdLoop } from 'react-icons/md';
import { TiTick } from "react-icons/ti";
import Mobile from '../../assets/landing/animated.svg'
import Gif from '../../assets/auth/gif.svg'
import { Link } from 'react-router-dom';

const steps = [
    { id: 0, label: 'Email verification' },
    { id: 1, label: 'Profile info' },
    { id: 2, label: 'Personal info' },
    { id: 3, label: 'Business info' },
    { id: 4, label: 'Documents' },
    { id: 5, label: 'Preferences' },
    { id: 6, label: 'Submit' },
];

const BusinessSetupPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [accountType, setAccountType] = useState('');
    const inputRefs = Array(6).fill(null).map(() => React.createRef());
    const [address, setAddress] = useState('');
    const [unit, setUnit] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [showQrCode, setShowQrCode] = useState(false);
    const [verificationComplete, setverificationComplete] = useState(false)

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5 && inputRefs[index + 1].current) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && !otp[index] && index > 0 && inputRefs[index - 1].current) {
            inputRefs[index - 1].current.focus();
        }
    };

    const handleNext = () => {
        console.log('OTP submitted:', otp.join(''));
        setCurrentStep(1);
    };

    const handleResend = () => {
        console.log('Resend code clicked');
    };


    const handleStepClick = (id) => {
        setCurrentStep(id);
    };

    const handleIncrementStepClick = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleAccountTypeChange = (type) => {
        setAccountType(type);
    };


    return (

        <div>

            {
                currentStep !== 6 && (
                    <div className='w-[100%] px-5 py-11 bg-[#F4F6F9] flex items-center overflow-x-auto'>
                        {steps?.map((i) => (
                            <div onClick={() => handleStepClick(i.id)} key={i.id} className='flex items-center'>

                                <button className={`px-5 text-nowrap py-2 rounded-full flex items-center gap-x-2 font-medium ${i?.id == currentStep ? "border border-blue text-blue" : "border border-[#DADADA] text-gray"}`}><TiTick />{i?.label}</button>

                                <div className={`w-[3rem] h-[.3rem] ${i?.id == currentStep ? "bg-blue" : "bg-gray"}`}></div>

                            </div>
                        ))}
                    </div>
                )
            }

            {/* ADD OTP HERE IF CURRENT STEP IS  0  */}

            {
                currentStep === 0 && (
                    <div className='p-5 mt-10'>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm your email address</h2>
                        <p className="text-gray mb-3">We sent a verification code to <span className="font-medium">yourcompany@gmail.com</span> <MdEditSquare className="inline-block text-blue" /></p>
                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-gray-700 text-sm  mb-2">Enter your code here</label>
                            <div className="flex space-x-2">
                                {otp.map((digit, index) => (
                                    <input key={index} type="text" maxLength="1" className="w-12 h-12 border border-[#DADADA] rounded text-center text-xl font-mono outline-blue mt-3" value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} ref={inputRefs[index]} />
                                ))}
                            </div>
                        </div>
                        <button className="bg-blue text-white py-2 px-12 w-[18rem] block rounded-md cursor-pointer" onClick={handleNext} disabled={otp.some(digit => !digit)}>Next</button>
                        <button className="mt-3 text-sm text-blue-500 hover:underline focus:outline-none" onClick={handleResend}>Resend code <MdLoop className="inline-block text-blue" /></button>
                    </div>
                )
            }

            {
                currentStep === 1 && (
                    <div className='p-5 mt-10'>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">What type of investment account are you applying for?</h2>
                        <p className="text-gray mb-3">Pick sole proprietorship if your business isn’t registered with the state</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <label className={`inline-flex items-center rounded-md border p-3 cursor-pointer ${accountType === 'Sole proprietorship' ? 'border-blue' : 'border-[#DADADA]'}`}>
                                <input type="radio" className="form-radio h-4 w-4" name="accountType" value="Sole proprietorship" checked={accountType === 'Sole proprietorship'} onChange={(e) => handleAccountTypeChange(e.target.value)} />
                                <span className="ml-2 text-gray">Sole proprietorship</span>
                            </label>
                            <label className={`inline-flex items-center rounded-md border p-3 cursor-pointer ${accountType === 'Single Member LLC' ? 'border-blue' : 'border-[#DADADA]'}`}>
                                <input type="radio" className="form-radio h-4 w-4" name="accountType" value="Single Member LLC" checked={accountType === 'Single Member LLC'} onChange={(e) => handleAccountTypeChange(e.target.value)} />
                                <span className="ml-2 text-gray-700">Single Member LLC</span>
                            </label>
                            <label className={`inline-flex items-center rounded-md border p-3 cursor-pointer ${accountType === 'LLC' ? 'border-blue' : 'border-[#DADADA]'}`}>
                                <input type="radio" className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#DADADA]" name="accountType" value="LLC" checked={accountType === 'LLC'} onChange={(e) => handleAccountTypeChange(e.target.value)} />
                                <span className="ml-2 text-gray-700">LLC</span>
                            </label>
                            <label className={`inline-flex items-center rounded-md border p-3 cursor-pointer ${accountType === 'General Partnership' ? 'border-blue' : 'border-[#DADADA]'}`}>
                                <input type="radio" className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#DADADA]" name="accountType" value="General Partnership" checked={accountType === 'General Partnership'} onChange={(e) => handleAccountTypeChange(e.target.value)} />
                                <span className="ml-2 text-gray-700">General Partnership</span>
                            </label>
                            <label className={`inline-flex items-center rounded-md border p-3 cursor-pointer ${accountType === 'Corporation' ? 'border-blue' : 'border-[#DADADA]'}`}>
                                <input type="radio" className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#DADADA]" name="accountType" value="Corporation" checked={accountType === 'Corporation'} onChange={(e) => handleAccountTypeChange(e.target.value)} />
                                <span className="ml-2 text-gray-700">Corporation</span>
                            </label>
                            <label className={`inline-flex items-center rounded-md border p-3 cursor-pointer ${accountType === 'Non-resident premium' ? 'border-blue' : 'border-[#DADADA]'}`}>
                                <input type="radio" className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#DADADA]" name="accountType" value="Non-resident premium" checked={accountType === 'Non-resident premium'} onChange={(e) => handleAccountTypeChange(e.target.value)} />
                                <span className="ml-2 text-gray-700">Non-resident premium</span>
                            </label>
                            <label className={`inline-flex items-center rounded-md border p-3 cursor-pointer ${accountType === 'Checking Premium' ? 'border-blue' : 'border-[#DADADA]'}`}>
                                <input type="radio" className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#DADADA]" name="accountType" value="Checking Premium" checked={accountType === 'Checking Premium'} onChange={(e) => handleAccountTypeChange(e.target.value)} />
                                <span className="ml-2 text-gray-700">Checking Premium</span>
                            </label>
                            <label className={`inline-flex items-center rounded-md border p-3 cursor-pointer ${accountType === 'Savings Premium' ? 'border-blue' : 'border-[#DADADA]'}`}>
                                <input type="radio" className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#DADADA]" name="accountType" value="Savings Premium" checked={accountType === 'Savings Premium'} onChange={(e) => handleAccountTypeChange(e.target.value)} />
                                <span className="ml-2 text-gray-700">Savings Premium</span>
                            </label>
                        </div>
                        <button className="bg-blue text-white py-2 px-12 w-[18rem] block rounded-md cursor-pointer" onClick={handleIncrementStepClick}>Next</button>
                    </div>
                )
            }

            {
                currentStep === 2 && (
                    <div className='p-5 mt-10'>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Where do you live?</h2>
                        <p className="text-gray mb-3">For security reasons, we can’t accept P.O. Boxes or post offices</p>
                        <div className="flex items-center w-fit gap-x-6 flex-wrap md:flex-nowrap">

                            <div className='w-[100%]'>
                                <label htmlFor="personalAddress" className="block text-gray-700 text-sm  mb-2">Personal Address</label>
                                <input type="text" id="personalAddress" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>

                            <div className='w-[100%]'>
                                <label htmlFor="unit" className="block text-gray-700 text-sm  mb-2">Unit (Optional)</label>
                                <input type="text" id="unit" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" placeholder="Enter unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
                            </div>
                        </div>
                        <div className='my-4 flex items-center gap-x-6 flex-wrap md:flex-nowrap w-fit'>
                            <div className='w-[100%]'>
                                <label htmlFor="city" className="block text-gray-700 text-sm  mb-2">City</label>
                                <input type="text" id="city" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>

                            <div className='w-[100%]'>
                                <label htmlFor="state" className="block text-gray-700 text-sm  mb-2">State</label>
                                <div className="relative">
                                    <select id="state" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" value={state} onChange={(e) => setState(e.target.value)}>
                                        <option value="" disabled>Enter state</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                    </select>
                                </div>
                            </div>

                            <div className='w-[100%]'>
                                <label htmlFor="zipCode" className="block text-gray-700 text-sm  mb-2">Zip code</label>
                                <input type="text" id="zipCode" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" placeholder="Enter code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                            </div>
                        </div>
                        <button className="bg-blue text-white py-2 px-12 w-[18rem] block rounded-md cursor-pointer" onClick={handleIncrementStepClick}>Next</button>
                    </div>
                )
            }

            {
                currentStep === 3 && (
                    <div className='p-5 mt-10'>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Let’s know about your business</h2>
                        <p className="text-gray mb-3">We’ll like to know more about your business</p>

                        <div className="flex items-center w-fit gap-x-6 flex-wrap md:flex-nowrap">

                            <div className='w-[100%]'>
                                <label htmlFor="personalAddress" className="block text-gray-700 text-sm  mb-2">What’s the name of your business?</label>
                                <input type="text" id="personalAddress" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" placeholder="Business name" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>

                            <div className='w-[100%]'>
                                <label htmlFor="unit" className="block text-gray-700 text-sm  mb-2">What’s role in the business?</label>
                                <input type="text" id="unit" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" placeholder="Position in business" value={unit} onChange={(e) => setUnit(e.target.value)} />
                            </div>
                        </div>

                        <div className='my-4 flex items-center w-fit gap-x-6 flex-wrap md:flex-nowrap'>
                            <div className='w-[100%]'>
                                <label htmlFor="city" className="block text-gray-700 text-sm  mb-2">How much of the business do you own?</label>
                                <input type="number" id="city" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" placeholder="In percentage" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>

                            <div className='w-[100%]'>
                                <label htmlFor="state" className="block text-gray-700 text-sm  mb-2">Where’s your business registered?</label>
                                <div className="relative">
                                    <select id="state" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" value={state} onChange={(e) => setState(e.target.value)}>
                                        <option value="" disabled>Enter state</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center w-fit gap-x-6 flex-wrap md:flex-nowrap">

                            <div className='w-[100%]'>
                                <label htmlFor="personalAddress" className="block text-gray-700 text-sm  mb-2">Business Address</label>
                                <input type="text" id="personalAddress" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>

                            <div className='w-[100%]'>
                                <label htmlFor="unit" className="block text-gray-700 text-sm  mb-2">Unit (Optional)</label>
                                <input type="text" id="unit" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" placeholder="Enter unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
                            </div>
                        </div>
                        <div className='my-4 flex items-center w-fit gap-x-6 flex-wrap md:flex-nowrap'>
                            <div className='w-[100%]'>
                                <label htmlFor="city" className="block text-gray-700 text-sm  mb-2">City</label>
                                <input type="text" id="city" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>

                            <div className='w-[100%]'>
                                <label htmlFor="state" className="block text-gray-700 text-sm  mb-2">State</label>
                                <div className="relative">
                                    <select id="state" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" value={state} onChange={(e) => setState(e.target.value)}>
                                        <option value="" disabled>Enter state</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                    </select>
                                </div>
                            </div>

                            <div className='w-[100%]'>
                                <label htmlFor="zipCode" className="block text-gray-700 text-sm  mb-2">Zip code</label>
                                <input type="text" id="zipCode" className="rounded md:w-[25rem] w-[100%] px-3 py-2 border border-[#dadada] outline-blue" placeholder="Enter code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                            </div>
                        </div>
                        <button className="bg-blue text-white py-2 px-12 w-[18rem] block rounded-md cursor-pointer" onClick={handleIncrementStepClick}>Next</button>
                    </div>
                )
            }

            {
                currentStep === 4 && (
                    <div className='p-5 mt-10'>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload your ID </h2>
                        <p className="text-gray mb-3">We’ll like to know more about your business</p>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Accepted form of Identification </h2>

                        <div className='mb-2 flex items-center gap-x-3'>
                            <div className='w-5 h-5 flex justify-center items-center rounded-full bg-[#14AE5C] text-white'>
                                <TiTick />
                            </div>
                            <p>Driver License</p>
                        </div>

                        <div className='mb-2 flex items-center gap-x-3'>
                            <div className='w-5 h-5 flex justify-center items-center rounded-full bg-[#14AE5C] text-white'>
                                <TiTick />
                            </div>
                            <p>Sate Id</p>
                        </div>

                        <div className='mb-2 flex items-center gap-x-3'>
                            <div className='w-5 h-5 flex justify-center items-center rounded-full bg-[#14AE5C] text-white'>
                                <TiTick />
                            </div>
                            <p>Passport</p>
                        </div>

                        <div className='flex items-center gap-x-7 mb-3 mt-6 bg-[#F4F6F9] p-5 w-fit rounded-xl flex-wrap'>
                            <img src={Mobile} alt="" className='mt-2' />
                            <div>
                                <h1 className='text-lg font-medium mt-2'>This shouldn’t take too long</h1>
                                <p className='text-gray'>Scan and upload your ID using your smartphone</p>
                                <button className="bg-blue text-white py-2 px-12 w-[18rem] block rounded-md cursor-pointer mt-3" onClick={() => { setShowQrCode(true); setCurrentStep(null) }}>Verify your identity</button>
                            </div>
                        </div>


                    </div>
                )
            }

            {
                currentStep === 5 && (
                    <div className='p-5 mt-10'>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Get Helvetia Debit card</h2>
                        <p className="text-gray mb-3">Let’s know your preferred location to get your card delivered</p>

                        <div className="mt-10 flex items-start">

                            <div className=' border-r border-r-[#dadada] pr-10'>

                                <div className='flex items-center'>
                                    <input id="getDebitCard" type="checkbox" className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer" />
                                    <label htmlFor="getDebitCard" className="ml-2 text-gray-700">Get a Helvetia Debit card</label>
                                </div>
                                <div className='bg-[#dadada] w-[19rem] h-[16rem] rounded-lg mt-3'></div>
                                <p className='my-2'>We’ll send you the debit card to this address</p>
                                <input type="text" placeholder='Enter Email Address' className='outline-none w-[19rem] px-3 py-3 border border-[#dadada] mb-2 rounded-md' />
                                <button className="bg-blue text-white py-2 px-12 w-[18rem] block rounded-md cursor-pointer mt-3" onClick={handleIncrementStepClick}>Next</button>
                            </div>

                            <div className='pl-10'>

                                <h1 className='font-semibold text-lg mb-2'>Debit Card Details</h1>
                                <p className='my-2'>Name on Debit card</p>
                                <input type="text" placeholder='Name' className='outline-none w-[19rem] px-3 py-3 border border-[#dadada] mb-2 rounded-md' />
                                <p className='my-2'>Business Name on Debit card</p>
                                <input type="text" placeholder='Business Name' className='outline-none w-[19rem] px-3 py-3 border border-[#dadada] mb-2 rounded-md' />
                            </div>


                        </div>




                    </div>
                )
            }

            {
                currentStep === 6 && (

                    <div className='p-5 mt-10'>


                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Application is being reviewed</h2>
                        <p className="text-gray mb-3">You can setup your account while you await our response</p>

                        <div className='p-5 rounded-lg border border-[#dadada] md:w-[60%] mt-7'>

                            <div className='flex items-center gap-x-3 mb-4'>
                                <img src={Gif} alt="" />
                                <div>
                                    <h1 className='text-lg font-semibold'>Start setting up while you wait</h1>
                                    <p>Setup your account</p>
                                </div>
                            </div>


                            <div className='mb-2 flex items-center gap-x-3'>
                                <div className='w-5 h-5 flex justify-center items-center rounded-full bg-[#14AE5C] text-white'>
                                    <TiTick />
                                </div>
                                <p className='text-[#14AE5C]'>Confirm card preference</p>
                            </div>

                            <div className='w-[1px] h-[2rem] border border-r-[#dadada] ml-2'></div>

                            <div className='my-2 flex items-center gap-x-3'>
                                <div className='w-5 h-5 flex justify-center items-center rounded-full border'>
                                </div>
                                <p className=''>Connect external account</p>
                            </div>

                            <div className='w-[1px] h-[2rem] border border-r-[#dadada] ml-2'></div>

                            <h1 className='mt-2 font-medium text-lg'>Setup your first deposit</h1>
                            <p>Connect your bank account to make your first deposit</p>

                            <Link to={"/dashboard/home"}><button className="bg-blue text-white py-2 px-12  block rounded-md cursor-pointer mt-3">Connect to an external account</button></Link>


                        </div>



                    </div>
                )
            }


            {
                showQrCode && (
                    <div className='p-5 mt-10'>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Scan QR code</h2>

                        <p className="text-gray mb-3">Scan the QR code below to continue your verification</p>

                        <h2 className="text-gray-800 mb-2">Scan QR code below with your smart phone</h2>


                        <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"} alt="" className='mt-2 -ml-5 h-[15rem]' />
                        <button className="bg-blue text-white py-2 px-12 w-[18rem] block rounded-md cursor-pointer mt-3" onClick={() => { setShowQrCode(false); setverificationComplete(true) }}>Next</button>


                    </div>
                )
            }

            {
                verificationComplete && (
                    <div className='p-5 mt-10'>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Complete the verification</h2>
                        <p className="text-gray mb-3">Begin the verification step on your phone and come back here when you’re done!</p>



                        <div className='flex items-center gap-x-7 mb-3 mt-6 bg-[#F4F6F9] p-5 w-fit rounded-xl flex-wrap'>
                            <img src={Mobile} alt="" className='mt-2' />
                            <div>
                                <h1 className='text-lg font-medium mt-2'>Nicely done! Upload successful</h1>
                            </div>
                        </div>

                        <button className="bg-blue text-white py-2 px-12 w-[18rem] block rounded-md cursor-pointer mt-3" onClick={() => { setverificationComplete(false); setCurrentStep(5) }}>Next</button>



                    </div>
                )
            }



        </div>


    );
};

export default BusinessSetupPage;