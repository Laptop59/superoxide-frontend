import logo from '../assets/logo.svg';

function Toolbox() {
    return (
        <div className='toolbar'>
            <div className='logo'>
                <img src={logo} />
            </div>
        </div>
    );
}

export default Toolbox;