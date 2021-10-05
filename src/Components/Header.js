import React from 'react';
const Header = () => {
    return (
        <div className="nav">
            <div className="container">
                <div className="nav-wrap">
                    <div class="nav-navbar">
                        <div className="nav-right">
                            <a className="nav-link link link--io" href="#">Shop</a>
                            <a className="nav-link link link--io" href="#">About</a>
                            <a className="nav-link link link--io" href="#">Contact</a>
                        </div>
                        <a href="#" className="nav-logo">Origin </a>
                        <div className="nav-left">
                            <a className="nav-link link link--io" href="#">Search</a>
                            <a className="nav-link link link--io" href="#">Log in</a>
                            <a className="nav-link link link--io" href="#">Cart</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
