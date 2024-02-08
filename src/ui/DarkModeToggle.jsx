import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import ButtonIcon from '../ui/ButtonIcon';
import { useDarkMode } from '../context/DarkModeContext';
function DarkModeToggle() {
    const { isDarkMode, darkModeToggle } = useDarkMode();
    return (
        <ButtonIcon onClick={darkModeToggle}>
            {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
        </ButtonIcon>
    );
}

export default DarkModeToggle;
