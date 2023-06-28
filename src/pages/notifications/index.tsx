import { useGetNotificationsQuery } from "<@>/store/notifications/notifications-api";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

const Notifications = () => {
  const { data, isLoading, isError } = useGetNotificationsQuery();

  const [notifications, setNotifications] = useState();

  return (
    <section className="w-1/2 mx-auto mt-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Notifications</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-2">My Title</h2>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
          eros ut nisi suscipit dignissim. Donec euismod purus vel sem pulvinar,
          vel hendrerit est dictum.
        </p>
        <div className="flex items-center text-gray-600">
          <FaRegCalendarAlt className="mr-2" />
          <span>June 21, 2023</span>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
