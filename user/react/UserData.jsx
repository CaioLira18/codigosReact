import React from 'react'

const UserData = () => {
   useEffect(() => {
      const storedUser = localStorage.getItem('user');
  
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
  
          fetch(`${API_URL}/users`)
            .then((res) => res.json())
            .then((allUsers) => {
              const fullUser = allUsers.find(user => user.id === parsedUser.id);
  
              if (fullUser) {
                console.log('👤 Usuário encontrado:', fullUser);
                setCurrentUser(fullUser);
                setIsAuthenticated(true);
                setIsAdmin(fullUser.role === 'ADMIN');
                setName(fullUser.name || '');
              } else {
                localStorage.removeItem("user");
                setIsAuthenticated(false);
                setIsAdmin(false);
                setName('');
              }
            })
            .catch((err) => {
              console.error("Erro ao buscar usuários:", err);
              localStorage.removeItem("user");
              setIsAuthenticated(false);
              setIsAdmin(false);
              setName('');
            });
        } catch (parseError) {
          localStorage.removeItem("user");
        }
      } else {
        console.log('❌ Nenhum usuário encontrado no localStorage');
      }
    }, []);
}

export default UserData
