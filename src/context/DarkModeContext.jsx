import { Children, createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        false,
        'isDarkMode'
    );

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
        }
    });
    function darkModeToggle() {
        setIsDarkMode((isdark) => !isdark);
    }
    return (
        <DarkModeContext.Provider value={{ isDarkMode, darkModeToggle }}>
            {children}
        </DarkModeContext.Provider>
    );
}

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined)
        throw new Error('DarkModeContext is used outside the provider');
    return context;
}

export { useDarkMode, DarkModeProvider };
