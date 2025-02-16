import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { RiDeleteBinFill } from "react-icons/ri";

const Messages = () => {
    const [messages, setMessages] = useState({ ESS: [], EEP: [], EWC: [] });
    const [selectedBusiness, setSelectedBusiness] = useState("ESS");
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            setErrMsg(null);
            try{
                const res = await axios.get(`${import.meta.env.VITE_LOCAL_API_URL}/api/fetch_messages`);
                setMessages(res.data);
            } catch (err) {
                setErrMsg("Failed to fetch messages. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    const deleteMessage =  async (msg_id) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;
        
        try {
            const res = await axios.delete(`${import.meta.env.VITE_LOCAL_API_URL}/api/delete_message/${msg_id}`);
            if (res.status === 201) {
                alert("Message successfully deleted");

                setMessages(prevMessages => ({
                    ...prevMessages,
                    [selectedBusiness]: prevMessages[selectedBusiness].filter(msg => msg._id !== msg_id)
                }));
            } else {
                alert("Failed to delete the message.");
            }
        } catch (err) {
            console.error(err);
            alert("Error deleting message. Please try again.");
        }
    };

    if(loading){
        return <div>
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#e5be5c"
                secondaryColor="#3a464e"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass="loader"
            />
        </div>
    };

    return (
        <section className='message_section'>
            <h2>Messages</h2>
            <div className='msg_buttons'>
                <ButtonGroup className='button_group' aria-label="Basic example">
                    <Button className={`msg_button ${selectedBusiness === "ESS" ? "active" : ""}`} onClick={() => setSelectedBusiness("ESS")}>Express Shuttle Services</Button>
                    <Button className={`msg_button ${selectedBusiness === "EEP" ? "active" : ""}`} onClick={() => setSelectedBusiness("EEP")}>Express Plumbing and Electrical</Button>
                    <Button className={`msg_button ${selectedBusiness === "EWC" ? "active" : ""}`} onClick={() => setSelectedBusiness("EWC")}>Express Water Damage and CleanUp</Button>
                </ButtonGroup>
            </div>

            <div className='card_container'>
                {
                    messages[selectedBusiness]?.length > 0 ? (
                        messages[selectedBusiness].map((msg) => (
                            <div key={msg._id} className='msg_card'>
                                <h3>{msg.name}</h3>
                                <p className="service">{msg.service}</p>
                                <p className="message">{msg.message || "No message provided."}</p>
                                <div className="card_footer">
                                   {msg.email} | {msg.phone}
                                </div>
                                <span className='delete_button' onClick={() => deleteMessage(msg._id)}><RiDeleteBinFill /></span>
                            </div>
                        ))
                    ) : (
                        <div className="no-messages">{errMsg}</div>
                    )
                }
            </div>
        </section>
    )
};

export default Messages;