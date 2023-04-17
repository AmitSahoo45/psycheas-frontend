import { createContext, useState } from 'react';

const ContextStore = createContext();

const ProviderContext = ({ children }) => {
    const [user, setUser] = useState({
        isPresent: false,
        name: "",
        uid: "",
        email: "",
        jwtToken: ""
    });

    return (
        <ContextStore.Provider
            value={{
                user, setUser
            }}
        >
            {children}
        </ContextStore.Provider>
    );
};

export { ContextStore, ProviderContext };