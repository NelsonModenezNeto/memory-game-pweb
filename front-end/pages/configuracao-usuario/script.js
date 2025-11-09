const API_URL = "http://localhost/memory-game-pweb/back-end";

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('userConfigForm');
  const cancelButton = document.getElementById('cancelBtn');
  const backArrow = document.getElementById('back-arrow');
  
  let originalData = {};

  // Carregar dados do usuário ao iniciar
  async function loadUserData() {
    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        console.error('Erro ao carregar dados do usuário:', result.error);
        alert('Erro ao carregar dados do usuário. Por favor, recarregue a página.');
        return;
      }

      const user = result.data;
      originalData = { ...user };

      // Preencher campos editáveis
      document.getElementById('nome').value = user.name || '';
      document.getElementById('telefone').value = user.phone || '';
      document.getElementById('email').value = user.email || '';

      // Preencher campos somente leitura
      document.getElementById('username').value = user.username || '';
      document.getElementById('cpf').value = user.cpf || '';
      
      // Formatar data de nascimento
      if (user.birthday) {
        const birthdayDate = new Date(user.birthday);
        const formattedDate = birthdayDate.toLocaleDateString('pt-BR');
        document.getElementById('birthday').value = formattedDate;
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      alert('Erro ao carregar dados do usuário. Verifique sua conexão.');
    }
  }

  // Salvar dados do usuário
  async function saveUserData() {
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    // Validações
    if (!nome || !email) {
      alert('Nome e email são obrigatórios.');
      return false;
    }

    if (senha && senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return false;
    }

    if (senha && senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }

    const payload = {
      name: nome,
      phone: telefone || null,
      email: email
    };

    if (senha) {
      payload.password = senha;
    }

    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro na requisição: ${response.status}`);
      }

      const result = await response.json();
      console.log('Dados atualizados:', result);
      
      // Limpar campos de senha
      document.getElementById('senha').value = '';
      document.getElementById('confirmar-senha').value = '';
      
      // Atualizar dados originais
      originalData = { ...result.data };
      
      alert('Dados atualizados com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('Erro ao salvar dados: ' + error.message);
      return false;
    }
  }

  // Cancelar alterações
  function cancelChanges() {
    if (confirm('Deseja descartar as alterações e restaurar os dados originais?')) {
      document.getElementById('nome').value = originalData.name || '';
      document.getElementById('telefone').value = originalData.phone || '';
      document.getElementById('email').value = originalData.email || '';
      document.getElementById('senha').value = '';
      document.getElementById('confirmar-senha').value = '';
    }
  }

  // Event listeners
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    await saveUserData();
  });

  if (cancelButton) {
    cancelButton.addEventListener('click', cancelChanges);
  }

  if (backArrow) {
    backArrow.addEventListener('click', () => {
      window.location.href = '/pages/home/home.html';
    });
  }

  // Carregar dados ao iniciar
  loadUserData();
});

