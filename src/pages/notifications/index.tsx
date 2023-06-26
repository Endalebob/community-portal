import { useGetNotificationsQuery } from "<@>/store/notifications/notifications-api";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Notification } from "<@>/types/notifications/notifications";

const Notifications = () => {
  const { data, isLoading, isError } = useGetNotificationsQuery();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (data) {
      setNotifications(data.value.items);
    }
  }, []);

  if (isLoading) {
    {
      Array(4).map((_item, index) => (
        <div
          className="bg-white rounded-lg shadow-lg p-6 animate-pulse"
          key={index}
        >
          <h2 className="text-xl font-semibold mb-2 bg-gray-300 h-6 w-1/2 rounded"></h2>
          <p className="text-gray-700 mb-4 bg-gray-300 h-4 w-3/4 rounded"></p>
          <div className="flex items-center text-gray-600">
            <div className="bg-gray-300 h-4 w-4 rounded-full mr-2"></div>
            <span className="bg-gray-300 h-4 w-16 rounded"></span>
          </div>
        </div>
      ));
    }
  }

  if (isError) {
    <div className="justify-center items-center">
      <p>couldn't fetch notifications</p>
    </div>;
  }

  console.log("notifications", notifications);
  console.log("data", data);

  return (
    <section className="w-1/2 mx-auto mt-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Notifications</h1>

      {notifications ? (
        notifications.map(({ title, description, date, isRead }, index) => (
          <div
            key={index}
            className={
              isRead
                ? "bg-white rounded-lg shadow-lg p-6 border border-red-400"
                : "bg-white rounded-lg shadow-lg p-6"
            }
          >
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700 mb-4">{description}</p>
            <div className="flex items-center text-gray-600">
              <FaRegCalendarAlt className="mr-2" />
              <span>{date.toDateString()}</span>
            </div>
          </div>
        ))
      ) : (
        <p>You don't have any notifications</p>
      )}
    </section>
  );
};

export default Notifications;
