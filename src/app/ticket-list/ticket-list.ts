import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Ticket {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  status: 'Aberto' | 'Em Andamento' | 'Aguardando' | 'Resolvido';
  categoria: 'Hardware' | 'Software' | 'Acesso' | 'Rede' | 'Outros';
  criadoPor: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

@Component({
  selector: 'app-ticket-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList {
  searchTerm: string = '';
  statusFiltro: string = 'Todos os Status';
  prioridadeFiltro: string = 'Todas Prioridades';

  tickets: Ticket[] = [
    {
      id: 'TKT-1001',
      titulo: 'Computador não liga após atualização',
      descricao: 'O computador da sala 205 não está ligando depois da última atualização do Windows.',
      prioridade: 'Alta',
      status: 'Aberto',
      categoria: 'Hardware',
      criadoPor: 'João Silva',
      dataCriacao: '2025-11-25 09:15',
      dataAtualizacao: '2025-11-25 09:15'
    },
    {
      id: 'TKT-1002',
      titulo: 'Solicitação de acesso ao sistema financeiro',
      descricao: 'Novo funcionário precisa de acesso ao sistema SAP financeiro.',
      prioridade: 'Média',
      status: 'Em Andamento',
      categoria: 'Acesso',
      criadoPor: 'Maria Santos',
      dataCriacao: '2025-11-25 08:30',
      dataAtualizacao: '2025-11-25 10:22'
    },
    {
      id: 'TKT-1003',
      titulo: 'Impressora offline na área administrativa',
      descricao: 'A impressora HP LaserJet da área administrativa está offline há 2 dias.',
      prioridade: 'Baixa',
      status: 'Aguardando',
      categoria: 'Hardware',
      criadoPor: 'Pedro Costa',
      dataCriacao: '2025-11-24 14:20',
      dataAtualizacao: '2025-11-24 16:45'
    },
    {
      id: 'TKT-1004',
      titulo: 'Erro ao acessar servidor de arquivos',
      descricao: 'Não consigo acessar o servidor de arquivos compartilhados desde ontem.',
      prioridade: 'Alta',
      status: 'Em Andamento',
      categoria: 'Rede',
      criadoPor: 'Ana Oliveira',
      dataCriacao: '2025-11-25 07:00',
      dataAtualizacao: '2025-11-25 11:30'
    },
    {
      id: 'TKT-1005',
      titulo: 'Instalação de software específico',
      descricao: 'Preciso instalar o Adobe Creative Suite no meu computador.',
      prioridade: 'Média',
      status: 'Aberto',
      categoria: 'Software',
      criadoPor: 'Carlos Mendes',
      dataCriacao: '2025-11-25 10:15',
      dataAtualizacao: '2025-11-25 10:15'
    },
    {
      id: 'TKT-1006',
      titulo: 'Reset de senha de email',
      descricao: 'Esqueci minha senha do email corporativo e preciso resetar.',
      prioridade: 'Baixa',
      status: 'Resolvido',
      categoria: 'Acesso',
      criadoPor: 'Fernanda Lima',
      dataCriacao: '2025-11-24 09:00',
      dataAtualizacao: '2025-11-24 10:30'
    },
    {
      id: 'TKT-1007',
      titulo: 'Problema com conexão WiFi',
      descricao: 'A conexão WiFi está muito lenta no terceiro andar.',
      prioridade: 'Média',
      status: 'Em Andamento',
      categoria: 'Rede',
      criadoPor: 'Roberto Alves',
      dataCriacao: '2025-11-25 08:45',
      dataAtualizacao: '2025-11-25 12:00'
    },
    {
      id: 'TKT-1008',
      titulo: 'Solicitação de novo equipamento',
      descricao: 'Preciso de um novo monitor para minha estação de trabalho.',
      prioridade: 'Baixa',
      status: 'Aguardando',
      categoria: 'Hardware',
      criadoPor: 'Juliana Ferreira',
      dataCriacao: '2025-11-23 15:30',
      dataAtualizacao: '2025-11-24 09:15'
    }
  ];

  ticketsFiltrados: Ticket[] = [...this.tickets];

  get totalTickets(): number {
    return this.tickets.length;
  }

  get ticketsAbertos(): number {
    return this.tickets.filter(t => t.status === 'Aberto').length;
  }

  get ticketsEmAndamento(): number {
    return this.tickets.filter(t => t.status === 'Em Andamento').length;
  }

  get ticketsAltaPrioridade(): number {
    return this.tickets.filter(t => t.prioridade === 'Alta').length;
  }

  filtrarPorStatus(status: string) {
    if (status === 'Todos os Status') {
      this.statusFiltro = 'Todos os Status';
    } else {
      this.statusFiltro = status;
    }
    this.aplicarFiltros();
  }

  filtrarPorPrioridade(prioridade: string) {
    if (prioridade === 'Todas Prioridades') {
      this.prioridadeFiltro = 'Todas Prioridades';
    } else {
      this.prioridadeFiltro = prioridade;
    }
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.ticketsFiltrados = this.tickets.filter(ticket => {
      const matchStatus = this.statusFiltro === 'Todos os Status' || ticket.status === this.statusFiltro;
      const matchPrioridade = this.prioridadeFiltro === 'Todas Prioridades' || ticket.prioridade === this.prioridadeFiltro;
      const matchSearch = !this.searchTerm || 
        ticket.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ticket.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ticket.descricao.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchStatus && matchPrioridade && matchSearch;
    });
  }

  onSearchChange() {
    this.aplicarFiltros();
  }

  getBadgeClassPrioridade(prioridade: string): string {
    switch(prioridade) {
      case 'Alta': return 'bg-danger';
      case 'Média': return 'bg-warning';
      case 'Baixa': return 'bg-info';
      default: return 'bg-secondary';
    }
  }

  getBadgeClassStatus(status: string): string {
    switch(status) {
      case 'Aberto': return 'bg-primary';
      case 'Em Andamento': return 'bg-info';
      case 'Aguardando': return 'bg-warning';
      case 'Resolvido': return 'bg-success';
      default: return 'bg-secondary';
    }
  }
}
