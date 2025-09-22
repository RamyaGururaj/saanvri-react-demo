import react from 'react';
import OptionCards from './optioncards';
import Dashboard from './Dashboard';



const Navbar = ({ activeSection, setActiveSection }) => {
    // const [activeSection, setActiveSection] = useState("dashboard");
    return (
        <div className="container">
            <div className="header">
                <h1>🌸 Saanvri 🌸</h1>
                <p>Your gentle cycle companion and wellness bestie</p>
            </div>
            <OptionCards activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
    );
}

export default Navbar;