import React from 'react'
import Logo from '../assets/images/logo.svg';
import Search from '../assets/images/search.svg'
import Store from '../assets/images/store.svg'
import "./nav.css"
function Nav() {
    return (<nav className='nav-wrapper'>
        <div className='nav-content'>
            <ul className='list-styled'>
                <li>
                    <img src={Logo} alt="Apple"></img>
                </li>
                <li>
                    <a className="link-styled">Store</a>
                </li>
                <li>
                    <a className="link-styled">Mac</a>
                </li>
                <li>
                    <a className="link-styled">ipad</a>
                </li>
                <li>
                    <a className="link-styled">iphone</a>
                </li>
                <li>
                    <a className="link-styled">watch</a>
                </li>
                <li>
                    <a className="link-styled">Support</a>
                </li>
                <li className='search'><img src={Search} alt="Search" /></li>
                <li className='store'><img src={Store} alt="Store" /></li>
                
                
            
            </ul>
        </div>
    </nav>  );
}

export default Nav;