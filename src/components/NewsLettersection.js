import React, { useEffect, useRef, useState } from 'react';

const featuresArray = [
    'Exclusive access to new abstract images and collections',
    'Unlock special promotions only for subscribers',
    'Regular doses of artistic inspiration',
]

const NewsLettersection = () => {

    const searchEmail = useRef('')
    const [emailError, setEmailError] = useState('')
    const [emailvalue, setEmailValue] = useState('')
    const [responseData, setResponseData] = useState('')

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    useEffect(() => {
        if (emailvalue != "") {
            setEmailError('')
            if (!validateEmail(emailvalue)) {
                setEmailError('Please enter a valid email')
            }
        } else if (emailvalue === "") {
            setEmailError('')
        }
    }, [emailvalue])

    useEffect(() => {
        if (responseData) {
            setTimeout(() => {
                setResponseData('')
                setEmailValue('')
            }, 3000)
        }
    },[responseData])

    const onSubmit = async () => {
        const email = searchEmail.current.value;
        if (email === '') {
            setEmailError('Email id is required!');
        } else if (!validateEmail(email)) {
            setEmailError('Invalid email format!');
        } else {
            try {
                const response = await fetch('https://www.greatfrontend.com/api/projects/challenges/newsletter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if(data) {
                    setResponseData(data.message)
                }
                // Handle success (e.g., show a success message)
            } catch (error) {
                console.error('Error:', error);
                // Handle error (e.g., show an error message)
            }
        }
    };

    return (
        <div className='h-screen'>
        <div className='flex flex-col items-center justify-center'>
            {responseData && <div className='bg-green-400 text-center inline-block mt-5 p-1 rounded-lg text-slate-50'>{responseData}</div>}
            </div>
            <div className="flex flex-row mt-5">
                {/* Your component code here */}
                <div className='w-1/2 h-full m-10 p-10'>
                    <div className='text-3xl font-semibold mt-16'>
                        Get the finest curated abstracts delivered weekly to your inbox
                    </div>
                    <ul className='mt-10'>
                        {featuresArray.map((feature, index) => (
                            <div className='flex items-center' key={index}>
                                <img
                                className='w-6 h-6 inline-block'
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXlwndYQDmWUL-65h2Rblh2HAy6nBweQksFw&s'
                                alt='checkmark'
                                />
                                <li className='text-slate-600 ml-1 mt-1' key={index}>{feature}</li>
                            </div>
                        ))}
                    </ul>
                    <div className='flex justify-start mt-14'>
                        <div>
                            <input
                                ref={searchEmail}
                                type='text'
                                placeholder='Enter your email'
                                value={emailvalue}
                                onChange={(e) => setEmailValue(e.target.value)}
                                className='border-2 border-black rounded-lg p-2'
                            />
                            <div className='text-red-600 m-2'>{emailError}</div>
                        </div>
                        <div>
                            <button className='bg-blue-700 text-white rounded-lg p-2 ml-2' onClick={onSubmit}>Subscribe</button>
                        </div>
                    </div>
                    <div className='mt-2 text-slate-600'>We only send you the best! No spam.</div>
                </div>
                <div className='w-1/2 flex items-center mt-12'>
                    <div className='mr-10 rounded-lg'>
                        <img
                            className='rounded-xl'
                            src={`${process.env.PUBLIC_URL}/abstract.jpg`}
                            alt='mainLogo'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLettersection;
