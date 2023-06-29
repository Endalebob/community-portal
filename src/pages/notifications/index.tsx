import {
  useGetNotificationsQuery,
  useReadAllNotificationsMutation,
} from "<@>/store/notifications/notifications-api";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Notification } from "<@>/types/notifications/notifications";
import Head from "next/head";

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnreadNotification, sethasUnreadNotification] =
    useState<Boolean>(false);

  const { data, isLoading, isError, refetch } = useGetNotificationsQuery();
  const [readAllNotifications] = useReadAllNotificationsMutation();
  const [currNotification, setCurrNotification] = useState<Notification | null>(
    null
  );

  useEffect(() => {
    if (data?.isSuccess) {
      setNotifications(data.value.items);
    }
  }, [data]);

  const handleReadAllClick = () => {
    readAllNotifications().then(() => {
      refetch();
    });
  };

  useEffect(() => {
    const hasUnreadNotificationValue = notifications.some(
      (notification) => !notification.isRead
    );
    sethasUnreadNotification(hasUnreadNotificationValue);
  }, [notifications]);

  if (isError) {
    <div className="justify-center items-center">
      <p>couldn't fetch notifications.</p>
    </div>;
  }

  const getDate = (curr_date: Date) => {
    const dateObj = new Date(curr_date);
    const date = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getFullYear();

    return `${date} ${month} ${year}`;
  };

  // notifications card popup

  return (
    <>
      <Head>
        <title>Notifications</title>
      </Head>
      <section className="w-3/4 lg:w-1/2 mx-auto mt-5 mb-10">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-800 mb-10">
            Notifications
          </h1>
          {hasUnreadNotification && (
            <button
              className="bg-primary hover:bg-blue-400 text-white font-bold py-2 px-4 h-10 rounded"
              onClick={handleReadAllClick}
            >
              Read All
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-y-4">
            {Array(4)
              .fill(4)
              .map((_item, index) => (
                <div
                  className="bg-white rounded-lg shadow-lg p-6 animate-pulse"
                  key={index}
                >
                  <h2 className="text-xl font-semibold mb-2 bg-gray-300 h-6 w-3/4 lg:w-1/2 rounded"></h2>
                  <p className="text-gray-700 mb-4 bg-gray-300 h-4 w-3/4 rounded"></p>
                  <div className="flex items-center text-gray-600">
                    <div className="bg-gray-300 h-4 w-4 rounded-full mr-2"></div>
                    <span className="bg-gray-300 h-4 w-16 rounded"></span>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col gap-y-4">
            {notifications && notifications.length != 0 ? (
              notifications.map(
                ({ title, content, dateCreated, isRead }, index) => (
                  <div
                    key={index}
                    className={
                      isRead
                        ? "bg-white rounded-lg shadow-lg p-6"
                        : "bg-white rounded-lg shadow-lg p-6 border border-red-400"
                    }
                  >
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <p className="text-gray-700 mb-4">{content}</p>
                    <div className="flex items-center text-gray-600">
                      <FaRegCalendarAlt className="mr-2" />
                      <span>{getDate(dateCreated)}</span>
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-600 text-start">
                You don't have any notifications.
              </p>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Notifications;
