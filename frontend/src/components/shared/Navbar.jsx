import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, Menu, Moon, Sun, User2, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                isOpen &&
                !e.target.closest('#mobileMenu') &&
                !e.target.closest('#burger')
            ) {
                closeMenu();
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen]);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    }

    return (
        <div className='bg-slate-100 dark:bg-zinc-900 dark:text-white shadow-sm  w-full z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>

                {/* Burger icon for mobile */}
                <div className='sm:hidden' id='burger'>
                    <Button variant='ghost' size='icon' onClick={toggleMenu}>
                        {isOpen ? <X /> : <Menu />}
                    </Button>
                </div>

                {/* Logo */}
                <div className='mx-auto sm:mx-0 text-center sm:text-left'>
                    <h1 className='text-xl sm:text-2xl font-bold'>Job<span className='text-[#F83002]'>Scan</span></h1>
                </div>

                {/* Right side */}
                <div className='hidden sm:flex items-center gap-4'>
                    {/* Nav Links */}
                    <ul className='flex gap-6 font-medium'>
                        {
                            user?.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {/* Dark Mode Toggle */}
                    <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </Button>

                    {/* Auth Buttons */}
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button variant="outline" className="text-sm">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white text-sm">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                    <div className='flex gap-3 items-center'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 mt-4 text-gray-600 dark:text-gray-300'>
                                        {user?.role === 'student' && (
                                            <div className='flex items-center gap-2'>
                                                <User2 />
                                                <Link to="/profile">
                                                    <Button variant="link">View Profile</Button>
                                                </Link>
                                            </div>
                                        )}
                                        <div className='flex items-center gap-2'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div id='mobileMenu' className='sm:hidden px-4 py-3 bg-white dark:bg-zinc-900 space-y-3 shadow-md'>
                    <ul className='flex flex-col gap-3'>
                        {
                            user?.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    <div className='flex justify-between items-center'>
                        {/* Dark Mode Toggle */}
                        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </Button>

                        {/* Auth Buttons */}
                        {!user ? (
                            <div className='flex gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button>Signup</Button></Link>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-2'>
                                {user?.role === 'student' && (
                                    <Link to="/profile">
                                        <Button variant="link" className='flex items-center gap-2'>
                                            <User2 size={18} /> View Profile
                                        </Button>
                                    </Link>
                                )}
                                <Button onClick={logoutHandler} variant="link" className='flex items-center gap-2'>
                                    <LogOut size={18} /> Logout
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
