
const Logout = () => {
  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  };

  return (
    <>
      <button onClick={logout}>LogOut</button>
    </>
  );
};

export default Logout;
