import React, { useState, useRef, useEffect } from 'react'
import './Navbar.css'
import { FaSearch } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { RiAccountCircle2Line } from "react-icons/ri";
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Navbar({ setCartOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initial = params.get('q') || '';
  const [query, setQuery] = useState(initial);
  const timerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getUsernameFromToken = (token) => {
    try {
      const payload = token.split('.')[0];
      const decoded = JSON.parse(atob(payload));
      return decoded.sub;
    } catch {
      return null;
    }
  };

  const username = isLoggedIn ? getUsernameFromToken(localStorage.getItem('token')) || '' : '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate('/');
  };

  // clear debounce timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    // debounce navigation
    if (timerRef.current) clearTimeout(timerRef.current);
    // fetch suggestions and navigate on enter or clear
    timerRef.current = setTimeout(async () => {
      const q = v.trim();
      if (q.length > 0) {
        // fetch suggestions (limit 6)
        try {
          const res = await fetch(`http://localhost:8080/api/product/search?q=${encodeURIComponent(q)}`);
          const data = await res.json();
          setSuggestions(data.slice(0,6));
          setShowSuggestions(true);
          setActiveIndex(-1);
        } catch (err) {
          console.error('suggestion fetch error', err);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        navigate('/shop');
      }
    }, 250);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);
    const q = query.trim();
    if (q.length > 0) navigate(`/shop?q=${encodeURIComponent(q)}`);
    else navigate('/shop');
  };

  const onSuggestionClick = (product) => {
    setShowSuggestions(false);
    navigate(`/product/${product.id}`);
  };

  const onKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        onSuggestionClick(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className='navbar'>
      <h2>Logo</h2>
      <div className='links'>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <form className='search' onSubmit={onSubmit}>
        <FaSearch  className='search-icon'/>
        <input
          value={query}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => { if (suggestions.length) setShowSuggestions(true); }}
          type="search"
          placeholder='Search...'
          className='search-bar'
          aria-label="Search products"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="search-suggestions" role="listbox">
            {suggestions.map((p, idx) => (
              <li
                key={p.id}
                role="option"
                aria-selected={idx === activeIndex}
                className={idx === activeIndex ? 'active' : ''}
                onMouseDown={(ev) => { ev.preventDefault(); onSuggestionClick(p); }}
              >
                <div className='sugg-name'>{p.name}</div>
                <div className='sugg-sub'>{p.category ? p.category.name : (p.underCategory ? p.underCategory.name : '')}</div>
              </li>
            ))}
          </ul>
        )}
      </form>
      <div className='actions'>
        <LuShoppingCart size={30}  onClick={setCartOpen}/>
        <div className='account-container' ref={dropdownRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
          {isLoggedIn && <span className='username'>{username}</span>}
          <RiAccountCircle2Line size={30} style={{ cursor: 'pointer' }}/>
          {dropdownOpen && (
            <div className='dropdown-menu'>
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className='dropdown-item'>Login</Link>
                  <Link to="/register" className='dropdown-item'>Register</Link>
                </>
              ) : 
              <div className='dropdown-item' onClick={handleLogout}>Logout</div>
            }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
