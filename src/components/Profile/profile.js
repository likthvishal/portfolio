import React, { useEffect, useRef, useState } from 'react'
import './profile.css'
import parse from 'html-react-parser';
import details from '../../assets/data.json'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import LeftPanel from '../Left-panel/left-panel.js';
import emailjs from '@emailjs/browser';

const Profile = () => {
    const [isBrainOpen, setIsBrainOpen] = useState(false);
    const [showSparks, setShowSparks] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    };

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
        // Reset form and status when opening modal
        setFormData({ name: '', email: '', mobile: '', message: '' });
        setSubmitStatus({ type: '', message: '' });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'unset';
    };

    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            // EmailJS configuration
            const SERVICE_ID = 'service_4qzbh1e';
            const TEMPLATE_ID = 'template_zdc3rhf';
            const PUBLIC_KEY = 'ifC51dGEGLR_2yy_A';

            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.mobile,
                    message: formData.message
                },
                PUBLIC_KEY
            );

            setSubmitStatus({
                type: 'success',
                message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!'
            });
            setFormData({ name: '', email: '', mobile: '', message: '' });

            // Close modal after 3 seconds on success
            setTimeout(() => {
                closeModal();
            }, 3000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Oops! Something went wrong. Please try again or email me directly at likithvishal20@gmail.com'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const createElectricalEffect = () => {
        setShowSparks(true);

        // Add shake effect to robot head and device
        const robotHead = document.querySelector('.robot-head');
        const device = document.querySelector('.futuristic-device');
        if (robotHead) {
            robotHead.classList.add('electric-shock');
        }
        if (device) {
            device.classList.add('electric-shock');
        }

        // Create lightning bolts
        const overlay = document.createElement('div');
        overlay.className = 'electrical-overlay active';
        document.body.appendChild(overlay);

        // Generate random lightning bolts
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const spark = document.createElement('div');
                spark.className = 'spark';

                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * (window.innerHeight * 0.3);
                const height = 100 + Math.random() * 200;
                const angle = -30 + Math.random() * 60;

                spark.style.left = startX + 'px';
                spark.style.top = startY + 'px';
                spark.style.height = height + 'px';
                spark.style.transform = `rotate(${angle}deg)`;

                overlay.appendChild(spark);
            }, i * 50);
        }

        // Create flash effect
        const flash = document.createElement('div');
        flash.className = 'spark-flash active';
        document.body.appendChild(flash);

        // Create particles
        const particleContainer = document.createElement('div');
        particleContainer.className = 'electric-particles';
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '50%';
        particleContainer.style.left = '50%';
        particleContainer.style.transform = 'translate(-50%, -50%)';
        particleContainer.style.zIndex = '9999';
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 150 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particleContainer.appendChild(particle);
        }

        // Clean up after animation
        setTimeout(() => {
            overlay.remove();
            flash.remove();
            particleContainer.remove();
            setShowSparks(false);
            setIsBrainOpen(true);
        }, 800);
    };

    const handleOpenBrain = () => {
        createElectricalEffect();
    };

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all elements with animation classes
        const animatedElements = document.querySelectorAll('.fade-in-section, .slide-in-left, .slide-in-right, .scale-in');
        animatedElements.forEach(el => observer.observe(el));

        return () => {
            animatedElements.forEach(el => observer.unobserve(el));
        };
    }, []);

    // Intersection Observer for About Me section - close brain when scrolling away
    useEffect(() => {
        const aboutMeSection = document.getElementById('about-me');

        if (!aboutMeSection) return;

        const observerOptions = {
            root: null,
            rootMargin: '-100px',
            threshold: 0.1
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                // If the section is not visible and brain is open, close it
                if (!entry.isIntersecting && isBrainOpen) {
                    setIsBrainOpen(false);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(aboutMeSection);

        return () => {
            observer.unobserve(aboutMeSection);
        };
    }, [isBrainOpen]);

    // TODO- store contact us these to a csv or a data file on s3
  return (
    <div className='profile'>  
        <section className='media-panel'>
            <LeftPanel/>
        </section>
        <section id='about-me' className='fade-in-section'>
            <h2 className='section-heading' style={{marginTop:0}} onClick={() => scrollToSection('about-me')}>
                <div className='highlight'>01.</div>About Me<div className='line'></div></h2>

            <div className='about-me-container'>
                {!isBrainOpen && (
                    <div className='robot-brain-wrapper'>
                        <div className='robot-head'>
                            <div className='robot-antenna'>
                                <div className='antenna-bulb'></div>
                            </div>
                            <div className='robot-eyes'>
                                <div className='eye'></div>
                                <div className='eye'></div>
                            </div>
                            <div className='robot-mouth'></div>

                            {/* Robot Arm with Futuristic Device */}
                            <div className='robot-arm'>
                                <div className='arm-segment'></div>
                                <div className='arm-joint'></div>
                                <div className='robot-hand'>
                                    <div className='futuristic-device' onClick={handleOpenBrain}>
                                        <div className='device-border'></div>
                                        <div className='device-screen'>
                                            Open My<br/>Brain
                                        </div>
                                    </div>
                                    <div className='robot-fingers'>
                                        <div className='finger'></div>
                                        <div className='finger'></div>
                                        <div className='finger'></div>
                                        <div className='finger'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`about-me ${isBrainOpen ? 'revealed' : ''}`}>
                    <h3>Machine Learning | Big Data | Web Development | Cloud Computing </h3>
                    {Object.entries(details['about-me']).map(([key, value]) => (
                        <p key={key}>{parse(value)}</p>
                    ))}
                </div>
            </div>
        </section>
        <section id='skills' className='fade-in-section'>
            <h2 className='section-heading' onClick={() => scrollToSection('skills')}>
                <div className='highlight'>03.</div>Skills<div className='line'></div></h2>
            <div className='skills-container'>
                {Object.entries(details.skills).map(([type, value]) => (
                    <div key={type} className='scale-in'>
                        <h3 key={type} className='type-heading'>{type}</h3>
                        <div className='skills-grid'>
                        {Object.entries(value).map(([skill, icon]) => (
                            <div key={skill} className='skills-item'>
                                {icon.toLowerCase().startsWith('fa') ? React.createElement(require(`react-icons/fa`)[icon], { className: "social-icon" }) : 
                                icon.toLowerCase().startsWith('si') ? React.createElement(require(`react-icons/si`)[icon], { className: "social-icon" }) : 
                                icon.toLowerCase().startsWith('io') ? React.createElement(require(`react-icons/io5`)[icon], { className: "social-icon" }) : 
                                icon.toLowerCase().startsWith('vsc') ? React.createElement(require(`react-icons/vsc`)[icon], { className: "social-icon" }) :
                                icon.toLowerCase().startsWith('go') ? React.createElement(require(`react-icons/go`)[icon], { className: "social-icon" }) :
                                icon.toLowerCase().startsWith('pi') ? React.createElement(require(`react-icons/pi`)[icon], { className: "social-icon" }) :
                                icon.toLowerCase().startsWith('tb') ? React.createElement(require(`react-icons/tb`)[icon], { className: "social-icon" }) :
                                null}
                                {skill}
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
        <section id='experience' className='fade-in-section'>
            <h2 className='section-heading' onClick={() => scrollToSection('experience')}>
                <div className='highlight'>02.</div>Experience<div className='line'></div></h2>
            <div className='timeline'>
                <div className='mid'>
                    <div className='undergrad'></div>
                    <div className='grad'></div>
                    <div className='arcs'></div>
                    <div className='info'></div>
                </div>
                {Object.entries(details.experiences).map(([key, experience]) => (
                    <div key={key} className={key}>
                        <h3>{experience.name && experience.name.includes("@") ? <a href={experience.name.split("@")[1]} target="_blank" rel="noopener noreferrer">{experience.name.split("@")[0]}</a> :
                            experience.name} {experience.comment && experience.comment.includes("@") ? (<a href={experience.comment.split("@")[1]} target="_blank" rel="noopener noreferrer">{experience.comment.split("@")[0]}<br/></a>) : 
                           experience.comment && (<span style={{ color: 'var(--text-color)', opacity: 0.8 }}>{experience.comment}<br/></span>)}
                           </h3>
                        <p>{experience.years}<br/>
                          {experience.position}<br/>
                           {experience.location}</p>
                    </div>
                ))}
            </div>
        </section>
        <section id='publications' className='fade-in-section'>
            <h2 className='section-heading' onClick={() => scrollToSection('publications')}>
                <div className='highlight'>03.</div>Publications<div className='line'></div></h2>
            <div className='publications-container'>
                {Object.entries(details.publications).map(([key, publication]) => (
                    <div key={key} className='publication-item scale-in'>
                        <div className='publication-header'>
                            {publication.link ? (
                                <a href={publication.link} target="_blank" rel="noopener noreferrer">
                                    <h3>{publication.title}<FaArrowUpRightFromSquare className='arrow-icon' /></h3>
                                </a>
                            ) : (
                                <h3 style={{color: 'var(--accent-color)'}}>{publication.title}</h3>
                            )}
                            <span className='publication-year'>{publication.year} | {publication.status}</span>
                        </div>
                        <p className='publication-authors'>{publication.authors}</p>
                        {publication.conferenceLink ? (
                            <p className='publication-venue'>
                                <a href={publication.conferenceLink} target="_blank" rel="noopener noreferrer">
                                    {publication.venue}
                                </a>
                            </p>
                        ) : (
                            <p className='publication-venue'>{publication.venue}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
        <section id='projects' className='fade-in-section'>
            <h2 className='section-heading' onClick={() => scrollToSection('projects')}>
                <div className='highlight'>04.</div>Projects<div className='line'></div></h2>
                {Object.entries(details.projects).slice(0, 5).map(([key, project], index) => (
                    <div key={key} className={`project-container scale-in stagger-animation`}>
                        <div className='project-image'>{project.image && <img src={require(`../../assets/${project.image}`)} alt={project.name} />}</div>
                        <div className='project-item'>
                            <div className='description'>
                                {project.link ? (<a href={project.link} target="_blank" rel="noopener noreferrer"><h3>{project.name}<FaArrowUpRightFromSquare className='arrow-icon' /></h3></a>) :
                                (<h3 style={{color: 'var(--accent-color)'}}>{project.name}</h3>)}
                                {project.description && <p>{project.description}</p>} 
                            </div>
                            {project.skills && <div className='resources'>{project.skills?.map(skill => skill === 'github' ? 
                            (<a key={skill} className='github-a' href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub className='github-icon' /></a>):
                            (<span key={skill}>{skill} </span>)
                            )}</div>}
                        </div>
                    </div>
                ))}
        </section>
        <section id='contact' className='fade-in-section'>
            <h2 className='section-heading' onClick={() => scrollToSection('contact')}>
                <div className='highlight'>05.</div>Contact me<div className='line'></div></h2>
            <div className='contact-div'>
                <div className='contact-widget scale-in'>
                    <h3>Let's Connect!</h3>
                    <p>Ready to bring your ideas to life? I'd love to hear about your project and discuss how we can work together to create something amazing.</p>
                    <button className='contact-now-btn' onClick={openModal}>
                        Contact Now
                    </button>
                </div>
            </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
            <div className='modal-overlay active' onClick={handleModalClick}>
                <div className='modal-content'>
                    <button className='modal-close' onClick={closeModal}>×</button>
                    <div className='contact-form'>
                        <h3>Leave a message and let's connect!</h3>
                        {submitStatus.message && (
                            <div className={`submit-message ${submitStatus.type}`}>
                                {submitStatus.message}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                            />
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                            />
                            <label htmlFor="mobile">Phone No:</label>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                            />
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                            />
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )}
        <section className="footer">
            <a className="built-by" href="https://github.com/likthvishal/portfolio" target="_blank" rel="noopener noreferrer">
                <div>Designed &amp; Built by Likith Vishal Boddeda</div>
            </a>
            <div className="copy-right">
                <span>Copyright &copy; 2025 Likith Vishal Boddeda | All rights reserved.</span>
            </div>
        </section>
      </div>
  )
}

export default Profile