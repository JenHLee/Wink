import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../authentication/StoreProvider";
import { MessageContext } from "./MessageContext";

const Notification = () => {
    const storeContext = useContext(StoreContext);
    const [notification, setNotification] = useState(false);
    const [unread, setUnread] = useState(0);
    const socket = useContext(MessageContext).socketRef;

    useEffect(() => {
        socket.on("notification", (data) => {
          console.log("received notification", data);
          setNotification(true);
        });
      }, []);

      useEffect(() => {
if (storeContext.store) {
            const getNotifications = async () => {
                try {
                    const data = {

                        user: storeContext.store.User_idUser,
                        store: storeContext.store.Store_idStore,
                    };
                    console.log("sending notification request: ", data);
                    const response = await fetch("/api/notifications", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    });
                    if (response.status === 200) {
                        console.log(response);
                        const theNotifications = JSON.parse(await response.text());
                        // console.log("we have the notifications", theNotifications);
                        setUnread(theNotifications);
                        setNotification(false);
                    } else {
                        console.log("failed to get notification");
                        setUnread(0);
                    }
                } catch (err) {
                    console.log("error getting notification", err);
                }
            }
            getNotifications(storeContext.store);
        
}}, [storeContext.store, notification]);


  return (
    <div>{unread}</div>
  )
}

export default Notification