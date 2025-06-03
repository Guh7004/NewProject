// Ícones SVG para os serviços
const serviceIcons = {
     coloracao: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="30" r="15" fill="#8a4fff" opacity="0.3"/>
        <circle cx="35" cy="30" r="15" fill="#8a4fff" opacity="0.3"/>
    </svg>`,
    cilios: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="30" r="5" fill="#8a4fff"/>
        <circle cx="40" cy="30" r="5" fill="#8a4fff"/>
        <path d="M15 40C15 40 20 45 30 45C40 45 45 40 45 40" stroke="#8a4fff" stroke-width="2"/>
    </svg>`,
    unhas: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="20" fill="#8a4fff" opacity="0.3"/>
        <circle cx="30" cy="30" r="15" fill="#8a4fff" opacity="0.4"/>
        <circle cx="30" cy="30" r="10" fill="#8a4fff" opacity="0.5"/>
        <circle cx="30" cy="30" r="5" fill="#8a4fff" opacity="0.6"/>
    </svg>`,
    maquiagem: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="25" r="5" fill="#8a4fff"/>
        <circle cx="40" cy="25" r="5" fill="#8a4fff"/>
        <rect x="15" y="40" width="30" height="5" rx="2.5" fill="#8a4fff"/>
        <rect x="20" y="35" width="20" height="5" rx="2.5" fill="#8a4fff"/>
    </svg>`,
    tratamentos: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="5" height="30" rx="2.5" fill="#8a4fff"/>
        <rect x="25" y="15" width="5" height="30" rx="2.5" fill="#8a4fff"/>
        <rect x="35" y="15" width="5" height="30" rx="2.5" fill="#8a4fff"/>
        <rect x="45" y="15" width="5" height="30" rx="2.5" fill="#8a4fff"/>
    </svg>`
};

// Função para criar e inserir os ícones SVG
function insertServiceIcons() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const title = card.querySelector('h3').textContent.trim().toLowerCase();
        let iconKey = '';
        
        if (title.includes('corte')) iconKey = 'corte';
        else if (title.includes('coloração')) iconKey = 'coloracao';
        else if (title.includes('cílios')) iconKey = 'cilios';
        else if (title.includes('unhas')) iconKey = 'unhas';
        else if (title.includes('maquiagem')) iconKey = 'maquiagem';
        else if (title.includes('tratamentos')) iconKey = 'tratamentos';
        
        if (iconKey && serviceIcons[iconKey]) {
            const iconContainer = card.querySelector('.service-icon');
            iconContainer.innerHTML = serviceIcons[iconKey];
        }
    });
}

// Navegação entre páginas
function setupNavigation() {
    // Links de navegação no menu
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });
    
    // Botões da página inicial
    const agendarBtn = document.getElementById('agendar-btn');
    const servicosBtn = document.getElementById('servicos-btn');
    
    if (agendarBtn) {
        agendarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPage('contato');
        });
    }
    
    if (servicosBtn) {
        servicosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPage('servicos');
        });
    }
    
    // Botão de agendar na página de serviços
    const agendarServicosBtn = document.getElementById('agendar-servicos-btn');
    
    if (agendarServicosBtn) {
        agendarServicosBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPage('contato');
        });
    }
}

// Função para navegar entre páginas
function navigateToPage(pageId) {
    // Remover classe active de todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Adicionar classe active à página de destino
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Atualizar links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Validação do formulário
function validateForm(event) {
    const form = document.getElementById('appointment-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const serviceSelect = document.getElementById('service');
    
    let isValid = true;
    
    // Validação do nome
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Por favor, informe seu nome');
        isValid = false;
    } else {
        removeError(nameInput);
    }
    
    // Validação do telefone
    const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phonePattern.test(phoneInput.value) && phoneInput.value.trim() !== '') {
        showError(phoneInput, 'Formato: (99) 99999-9999');
    } else if (phoneInput.value.trim() === '') {
        showError(phoneInput, 'Por favor, informe seu telefone');
        isValid = false;
    } else {
        removeError(phoneInput);
    }
    
    // Validação do serviço
    if (serviceSelect.value === '') {
        showError(serviceSelect, 'Por favor, selecione um serviço');
        isValid = false;
    } else {
        removeError(serviceSelect);
    }
    
    if (!isValid) {
        event.preventDefault();
    } else {
        // Simulação de envio (em um caso real, enviaria para o backend)
        event.preventDefault();
        showSuccessMessage();
        form.reset();
    }
}

// Função para mostrar erro
function showError(input, message) {
    const formGroup = input.parentElement;
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
}

// Função para remover erro
function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        formGroup.removeChild(errorElement);
    }
    
    input.classList.remove('error');
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage() {
    const form = document.getElementById('appointment-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Agendamento enviado com sucesso! Entraremos em contato em breve.';
    
    // Remover mensagem anterior se existir
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    form.parentElement.insertBefore(successMessage, form);
    
    // Remover a mensagem após 5 segundos
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Máscara para o campo de telefone
function applyPhoneMask(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove não-dígitos
    
    if (value.length > 0) {
        // Formata como (99) 99999-9999
        value = value.substring(0, 11); // Limita a 11 dígitos
        
        let formattedValue = '';
        
        if (value.length > 2) {
            formattedValue += `(${value.substring(0, 2)}) `;
        } else {
            formattedValue += `(${value}`;
        }
        
        if (value.length > 7) {
            formattedValue += `${value.substring(2, 7)}-${value.substring(7)}`;
        } else if (value.length > 2) {
            formattedValue += value.substring(2);
        }
        
        input.value = formattedValue;
    }
}

// Envio de email (simulado)
function setupEmailButton() {
    const emailButton = document.querySelector('.email-btn');
    
    if (emailButton) {
        emailButton.addEventListener('click', function() {
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            if (name && phone && service) {
                // Em um caso real, enviaria para um serviço de email
                const mailtoLink = `mailto:contato@gccabeleireiro.com.br?subject=Agendamento: ${service}&body=Nome: ${name}%0ATelefone: ${phone}%0AServiço: ${service}%0AMensagem: ${message}`;
                window.location.href = mailtoLink;
            } else {
                alert('Por favor, preencha todos os campos obrigatórios antes de enviar por email.');
            }
        });
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inserir ícones SVG
    insertServiceIcons();
    
    // Configurar navegação
    setupNavigation();
    
    // Configurar validação do formulário
    const form = document.getElementById('appointment-form');
    if (form) {
        form.addEventListener('submit', validateForm);
    }
    
    // Configurar máscara de telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', applyPhoneMask);
    }
    
    // Configurar botão de email
    setupEmailButton();
});
