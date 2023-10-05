import React from 'react'
import LoginForm from '../components/login';

export default function Profile(props) {
    
    const [formType, setFormType] = useState('');

    const handleSubmit = async (account: UserAccount, type: string) => {
        let response;
        if (type === 'login') {
            response = await loginUser(account);
        } else {
            response = await registerUser(account);
        }

        if (response) {
            dispatch({ type: 'LOGIN' });
        }
        setModalIsOpen(false);
    }
    
    return (
        <>
            <div>
                <LoginForm onSubmit={(account, type) => handleSubmit(account, type)} formType={formType} />
            </div>
        </>
    )
}
