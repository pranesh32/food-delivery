import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [errors, setErrors] = useState({});
    const router = useRouter();

    // Validation function
    const validateForm = () => {
        let formErrors = {};

        if (!name) formErrors.name = "Name is required";
        if (!email) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = "Email format is invalid";
        }
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

    const handleSignUp = async (props) => {
        // First validate the form
        if (!validateForm()) {
            return;
        }

        let response = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, city, address, mobile }) // body takes data in string format
        });

        response = await response.json();
        if (response.success) {
            alert("User signed up successfully");
            const { result } = response;
            delete result.password;
            localStorage.setItem('user', JSON.stringify(result));
            if (props?.redirect?.order) {
                router.push('/order');
            } else {
                router.push('/');
            }
        } else {
            alert(response.message || 'Sign up failed');
        }
    };

    return (
        <div>
            <div className="input-wrapper">
                <input type="text" className="input-field" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter Name" />
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </div>
            <br />

            <div className="input-wrapper">
                <input type="text" className="input-field" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email" />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <br />

            <div className="input-wrapper">
                <input type="password" className="input-field" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter Password" />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
            <br />

            <div className="input-wrapper">
                <input type="password" className="input-field" value={confirmpassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Enter Confirm Password" />
                {errors.confirmpassword && <p style={{ color: 'red' }}>{errors.confirmpassword}</p>}
            </div>
            <br />

            <div className="input-wrapper">
                <input type="text" className="input-field" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Enter City" />
                {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
            </div>
            <br />

            <div className="input-wrapper">
                <input type="text" className="input-field" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter Address" />
                {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
            </div>
            <br />

            <div className="input-wrapper">
                <input type="text" className="input-field" value={mobile} onChange={(event) => setMobile(event.target.value)} placeholder="Enter Mobile Number" />
                {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile}</p>}
            </div>
            <br />

            <div className="input-wrapper">
                <button className="input-field" onClick={handleSignUp}>Signup</button>
            </div>
            <br />
        </div>
    );
}

export default UserSignUp;
