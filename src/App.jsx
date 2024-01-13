import "./App.css";
import MembersBar from "./components/Membersbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Tasks from "./pages/Tasks/Tasks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import { useAuthContext } from "./hooks/useAuthContext";
import Loading from "./components/Loading";
import Profile from "./pages/Profile/Profile";
import Chat from "./components/Chat";
import ChatButton from "./components/ChatButton";
import { useState } from "react";
import { useCollection } from "./hooks/useCollection";
import { Toaster } from "./shadcn/components/ui/toaster";
import { UserDocProvider } from "./contexts/UserDocContext";
import { UsersProvider } from "./contexts/UsersContext";
import { useDocument } from "./hooks/useDocument";
import useMediaQuery from "./hooks/useMediaQuery";
import Topbar from "./components/Topbar";

const UserDocWrapper = ({ user, children }) => {
  const { document: userDoc } = useDocument("users", user?.uid);
  if (!userDoc) return <Loading />;
  return children(userDoc);
};

function App() {
  const { user, authIsReady } = useAuthContext();
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [rerender, setRerender] = useState(false);
  const { documents: users } = useCollection("users");
  const { documents: chats } = useCollection("chats");
  const isMobile = useMediaQuery("(max-width: 640px");

  if (!chats) return <Loading />;

  if (!authIsReady) return <Loading />;

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex flex-col sm:flex-row justify-center">
        <Toaster />
        <BrowserRouter>
          {user ? (
            <UserDocProvider user={user}>
              <UserDocWrapper user={user}>
                {(userDoc) => {
                  return (
                    <UsersProvider userDoc={userDoc}>
                      <>
                        {isMobile ? (
                          <Topbar />
                        ) : (
                          <div className="w-[240px] h-screen fixed top-0 left-0 overflow-y-auto">
                            <Sidebar
                              selectedPriority={selectedPriority}
                              setSelectedPriority={setSelectedPriority}
                              rerender={rerender}
                            />
                          </div>
                        )}
                        <div className="mt-6 sm:mt-0 flex-grow h-screen sm:ml-[240px] sm:mr-[200px]">
                          <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route
                              path="/profile"
                              element={
                                <Profile
                                  rerender={rerender}
                                  setRerender={setRerender}
                                />
                              }
                            />
                            <Route
                              path="/tasks"
                              element={
                                <Tasks selectedPriority={selectedPriority} />
                              }
                            />
                            <Route path="*" element={<Home />} />
                          </Routes>
                        </div>
                        {!isMobile && (
                          <div className="w-[200px] h-screen fixed top-0 right-0 overflow-y-auto">
                            <MembersBar
                              users={users}
                              chats={chats}
                              setSelectedChat={setSelectedChat}
                              setChatIsOpen={setChatIsOpen}
                            />
                          </div>
                        )}
                        {chatIsOpen && (
                          <Chat
                            users={users}
                            setSelectedChat={setSelectedChat}
                            setChatIsOpen={setChatIsOpen}
                            chats={chats}
                            selectedChat={selectedChat}
                          />
                        )}
                        <ChatButton
                          setChatIsOpen={setChatIsOpen}
                          setSelectedChat={setSelectedChat}
                        />
                      </>
                    </UsersProvider>
                  );
                }}
              </UserDocWrapper>
            </UserDocProvider>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Signup />} />
            </Routes>
          )}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
