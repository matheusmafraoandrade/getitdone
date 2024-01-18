import { useEffect } from "react";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useUsersContext } from "@/hooks/useUsersContext";

function MemberSkeleton() {
  return (
    <div className="flex items-center gap-2.5 py-2.5">
      <Skeleton className="h-3 w-3 rounded-full" />
      <Skeleton className="h-3 w-[120px]" />
    </div>
  );
}

export default function Membersbar({ setSelectedChat, setChatIsOpen, chats }) {
  const { user } = useAuthContext();
  const { users } = useUsersContext();
  const usersLength = Number(localStorage.getItem("usersLength"));

  const openChat = (userId, userName) => {
    const chat = chats.find(
      (chat) =>
        chat.participants.includes(userId) &&
        chat.participants.includes(user.uid)
    );
    setChatIsOpen(true);
    setSelectedChat({
      id: chat?.id,
      recipient: userName,
      participants: [userId, user.uid],
    });
  };

  useEffect(() => {
    if (users) {
      Number(localStorage.setItem("usersLength", users.length));
    }
  }, [users]);

  return (
    <aside className="h-screen w-[200px] border border-border px-5 py-3">
      <h2 className="font-medium text-lg mb-5">Membros</h2>
      {users
        ? users
            .filter((u) => u.id !== user.uid)
            .map((user) => (
              <div
                key={user.id}
                className="flex gap-2 items-center text-sm py-2.5"
                role="button"
                onClick={() => openChat(user.id, user.name)}
              >
                <div
                  className={`${
                    user.online ? "bg-green-500" : "bg-red-500"
                  } h-2 w-2 rounded-full`}
                />
                <p className="font-normal">{user.name}</p>
              </div>
            ))
        : [...Array(usersLength)].map((_, index) => (
            <MemberSkeleton key={index} />
          ))}
    </aside>
  );
}
