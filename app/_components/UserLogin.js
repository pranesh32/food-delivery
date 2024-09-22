import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const router = useRouter();

    // Validation function
    const validateForm = () => {
        let formErrors = {};

        if (!email) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = "Email format is invalid";
        }

        if (!password) formErrors.password = "Password is required";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleLogin = async () => {
        // First validate the form
        if (!validateForm()) {
            return;
        }

        let response = await fetch('http://localhost:3000/api/user/login', {
            method: 'post',
            body: JSON.stringify({ email, password }) // body takes data in string format 
        });

        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('user', JSON.stringify(result));
            if (props?.redirect?.order) {
                router.push('/');
            }
        } else {
            alert("Please enter correct login details");
        }
    };

    return (
        <div>
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
                <button className="input-field" onClick={handleLogin}>Login</button>
            </div>
            <br />
        </div>
    );
}

export default UserLogin;
