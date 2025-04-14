import './Menu.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Menu({ menuOpen, setMenuOpen }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = async () => {
        if (!token) return;

        try {
            await axios.post('http://localhost:8080/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem('token');
            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
            alert('Logout failed');
        }
    };

    return (
        <div className={"menu " + (menuOpen && "active")}>
            <ul>
                <li onClick={() => setMenuOpen(false)}>
                    <a href="#intro">Home</a>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                    <a href="#portfolio">Portfolio</a>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                    <a href="#works">Works</a>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                    <a href="#contact">Contact</a>
                </li>

                {token && (
                    <li onClick={() => { setMenuOpen(false); handleLogout(); }}>
                        <span style={{ cursor: 'pointer' }}>გასვლა</span>
                    </li>
                )}
            </ul>
        </div>
    );
}
