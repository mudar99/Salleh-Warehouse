import React, { useEffect, useState } from "react";
import { fetchToken, onMessageListener } from "./firebase";

const Notifications = () => {
  const [notificaiton, setNotificaiton] = useState({ title: "", body: "" });
  const [fcmToken, setFcmToken] = useState("");
  useEffect(() => {
    if (notificaiton) {
      console.log(notificaiton);
    }
  }, [notificaiton]);

  fetchToken(setFcmToken).then((payload)=>{
    console.log(payload)
  });

  onMessageListener()
    .then((payload) => {
      console.log(payload);
      setNotificaiton({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return <div>Notifications</div>;
};

export default Notifications;
