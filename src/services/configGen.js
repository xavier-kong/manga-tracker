const configGen = () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const token = `bearer ${user.token}`;
  const config = {
    headers: { Authorization: token },
  };
  return config
}

export default configGen