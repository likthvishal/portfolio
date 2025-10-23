import React from 'react';
import './left-panel.css';
import parse from 'html-react-parser';
import { FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import { SiGmail } from "react-icons/si";
import photo from '../../assets/profile.jpg';
import details from '../../assets/data.json'

const LeftPanel = () => {
    const emails = details.emails.reduce((emails, email, index) => {
        emails[index + 1] = email;
        return emails;}, {});

    const handleEmailClick = () => {
        const emailOptions = Object.entries(emails)
            .map(([key, email]) => `${key}) ${email}`)
            .join('\n');

        const option = prompt(`Please choose an email: \n${emailOptions}`);

        if (!option) return;

        const selectedEmail = emails[option];
        if (selectedEmail) {
            window.location.href = `mailto:${selectedEmail}`;
        } else {
            alert('Invalid option selected.');
        }
    };

    return (
        <div className='left-panel-org'>
            <div className='profile-image'>
                <img src={photo} alt='Profile' />
            </div>
            <h1 className='profile-name'>{details['profile-name']}</h1>
            <p className='profile-description'>
                {parse(details['profile-description'])}
            </p>
            <div className='social-links'>
                <a href="https://www.linkedin.com/in/likith-vishal-1aa45114a/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="social-icon" />
                </a>
                <a href="https://github.com/likthvishal" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="social-icon" />
                </a>
                <div onClick={handleEmailClick}>
                    <SiGmail className="social-icon" />
                </div>
                <a href="tel:+1 (408) 752-6185" target="_blank" rel="noopener noreferrer">
                    <FaPhone className="social-icon" />
                </a>
            </div>
        </div>
    );
};

export default LeftPanel;
