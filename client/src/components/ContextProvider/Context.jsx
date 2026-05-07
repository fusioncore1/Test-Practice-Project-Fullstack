// external libraries/modules/packages:
import { createContext, useState } from 'react';

// creating the login context:
export const LoginContext = createContext('');

const Context = ({ children }) => {
	const [loginData, setLoginData] = useState('');

	return (
		<>
			<LoginContext.Provider value={{ loginData, setLoginData }}>
				{children}
			</LoginContext.Provider>
		</>
	)
}

export default Context;