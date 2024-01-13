import getMessagePosition from "@/utils/getMessagePosition";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Message({ message }) {
  const { user } = useAuthContext();
  return (
    <div
      key={message.id}
      className={`${getMessagePosition(
        message.author,
        user.uid
      )} py-1.5 px-2.5 w-fit rounded-lg mb-2.5 text-sm`}
    >
      {message.content}
    </div>
  );
}
