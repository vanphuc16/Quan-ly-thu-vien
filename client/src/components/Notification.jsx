import { useState } from "react";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { retrieveNotificationsApi } from "../api/endPointsApi"
import { useAuth } from "../security/authContext";

export default function Notification() {

    const authContext = useAuth();
    const navigate = useNavigate();
    const user_id = authContext.getId();
    const [notifications, setNotifications] = useState([{}]);
    const [hasNotifications, setHasNotifications] = useState(false);

    useEffect(()=>{
        authContext.refresh()
        retrieveNotificationsApi(user_id)
            .then((response)=>{
                setHasNotifications(response.data.length > 0)
                setNotifications(response.data)
            })
            .catch((error)=>{
                console.log(error)
                navigate('/error')
            })
    },[authContext, user_id, navigate])
    return (
        <div className="notifications">
            <div className="container pt-4 text-start" style={{color: "white"}}>
                <h2>Thông báo</h2>
                <hr style={{color: "white"}}/>
                {hasNotifications &&
                    notifications.map((notification, index)=>(
                        <div key={index} className="form-control mb-2" style={{ backgroundColor: "#eff7f6" }}>
                            <h6>{notification.description}</h6>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}