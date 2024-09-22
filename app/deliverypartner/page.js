'use client'
import { useRouter } from "next/navigation";
import DeliveryHeader from "../DeliveryHeader";
import { useEffect, useState } from "react";

const Page = () => {
    const [loginmobile, setLoginMobile] = useState('');
    const [loginpassword, setLoginPassword] = useState('');
    const [errors, setErrors] = useState({});

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');

    const router = useRouter();


    useEffect(()=>{
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if(delivery)
        {
            router.push('/deliverydashboard')
        }
    },[])

    // Validation function
    const validateForm = () => {
        let formErrors = {};

        if (!name) formErrors.name = "Name is required";
        if (!password) formErrors.password = "Password is required";
        if (!confirmpassword) formErrors.confirmpassword = "Confirm Password is required";
        if (password && confirmpassword && password !== confirmpassword) {
            formErrors.confirmpassword = "Passwords do not match";
        }
        if (!city) formErrors.city = "City is required";
        if (!address) formErrors.address = "Address is required";
        if (!mobile) {
            formErrors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(mobile)) {
            formErrors.mobile = "Mobile number must be 10 digits";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    // Updated handleSignUp function with Content-Type header
    const handleSignUp = async () => {
        // First validate the form
        if (!validateForm()) {
            return;
        }
        try {
            let response = await fetch('http://localhost:3000/api/deliverypartners/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Set the content type to JSON
                },
                body: JSON.stringify({ name, password, city, address, mobile }) // Send JSON data
            });

            response = await response.json();

            if (response.success) {
                const { result } = response;
                delete result.password;
                localStorage.setItem('delivery', JSON.stringify(result));
                router.push('deliverydashboard');
            } else {
                alert('Sign up failed: ' + response.message);  // Display the error message
            }
        } catch (error) {
            console.error('Sign up error:', error);  // Log any network or server errors
            alert('Sign up failed due to a network error.');
        }
    };

    // Login function
    const handleLogin = async () => {
        try {
            let response = await fetch('http://localhost:3000/api/deliverypartners/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Set the content type to JSON
                },
                body: JSON.stringify({ mobile: loginmobile, password: loginpassword })
            });

            response = await response.json();

            if (response.success) {
                const { result } = response;
                delete result.password;
                localStorage.setItem('delivery', JSON.stringify(result));
                router.push('deliverydashboard');
            } else {
                alert("Please enter correct login details");
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed due to a network error.');
        }
    };

    return (
        <div>
            <DeliveryHeader />
            <h1>Delivery Partner</h1>
            <div className="auth-container">
                <div className="login-wrapper">
                    <br />
                    <div className="input-wrapper">
                        <input
                            type="text"
                            className="input-field"
                            value={loginmobile}
                            onChange={(event) => setLoginMobile(event.target.value)}
                            placeholder="Enter Mobile"
                        />
                        {errors.loginmobile && <p style={{ color: 'red' }}>{errors.loginmobile}</p>}
                    </div>
                    <br />
                    <div className="input-wrapper">
                        <input
                            type="password"
                            className="input-field"
                            value={loginpassword}
                            onChange={(event) => setLoginPassword(event.target.value)}
                            placeholder="Enter Password"
                        />
                        {errors.loginpassword && <p style={{ color: 'red' }}>{errors.loginpassword}</p>}
                    </div>
                    <br />
                    <div className="input-wrapper">
                        <button className="input-field" onClick={handleLogin}>Login</button>
                    </div>
                    <br />
                </div>

                <div className="signup-wrapper">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            className="input-field"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter Name"
                        />
                        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                    </div>
                    <br />
                    <div className="input-wrapper">
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter Password"
                        />
                        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                    </div>
                    <br />
                    <div className="input-wrapper">
                        <input
                            type="password"
                            className="input-field"
                            value={confirmpassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            placeholder="Enter Confirm Password"
                        />
                        {errors.confirmpassword && <p style={{ color: 'red' }}>{errors.confirmpassword}</p>}
                    </div>
                    <br />
                    <div className="input-wrapper">
                        <input
                            type="text"
                            className="input-field"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            placeholder="Enter City"
                        />
                        {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
                    </div>
                    <br />
                    <div className="input-wrapper">
                        <input
                            type="text"
                            className="input-field"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            placeholder="Enter Address"
                        />
                        {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
                    </div>
                    <br />
                    <div className="input-wrapper">
                        <input
                            type="text"
                            className="input-field"
                            value={mobile}
                            onChange={(event) => setMobile(event.target.value)}
                            placeholder="Enter Mobile Number"
                        />
                        {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile}</p>}
                    </div>
                    <br />
                    <div className="input-wrapper">
                        <button className="input-field" onClick={handleSignUp}>Signup</button>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default Page;
