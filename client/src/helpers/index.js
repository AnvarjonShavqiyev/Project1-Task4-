const validateToken = (token) => {
    const payload = token.split(".")[1];
    if (payload) {
      try {
        const exp = JSON.parse(atob(payload)).exp;
        const now = new Date().getTime() / 1000;
        if (exp > now) {
          return true;
        }
        localStorage.removeItem("Token");
        return false;
      } catch (error) {
        localStorage.removeItem("Token");
        return false;
      }
    } else {
      localStorage.removeItem("Token");
      return false;
    }
  };
  
  export { validateToken };