import React, { useState } from 'react';
import './EventPage.css';

const EventPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('ongoing');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const ongoingEvents = [
        {
            image: "/event1.png",
        },
        {
            image: "/event2.png",
        },
        {
            image: "/event3.png",
        },
        {
            image: "/event4.png",
        },
        {
            image: "/event5.png",
        },
        {
            image: "/event6.png",
        },
        {
            image: "/event7.png",
        }
    ];

    const endedEvents = [
        {
            image: "/eventend1.png",
        },
        {
            image: "/eventend2.png",
        },
        {
            image: "/eventend3.png",
        }
    ];

    return (
        <div className="event-page">
            <hr className="eventhr1" />
            <h1
                style={{ fontSize: "3rem", marginBottom: "-20px", marginTop: "55px" }}>Season Event</h1>
            <hr className="eventhr2" />
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'ongoing' ? 'active' : ''}`}
                    onClick={() => handleTabClick('ongoing')}
                >
                    진행중 이벤트
                </button>
                <button
                    className={`tab ${activeTab === 'ended' ? 'active' : ''}`}
                    onClick={() => handleTabClick('ended')}
                >
                    종료된 이벤트
                </button>
            </div>
            <div className="event-container">
                {(activeTab === 'ongoing' ? ongoingEvents : endedEvents).map((event, index) => (
                    <div className="event-item" key={index}>
                        <img src={event.image} alt={`Event ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventPage;
