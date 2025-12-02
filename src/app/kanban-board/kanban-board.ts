import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TicketService, Ticket } from '../services/ticket';

@Component({
  selector: 'app-kanban-board',
  imports: [CommonModule, RouterModule, DragDropModule],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.css',
})
export class KanbanBoard implements OnInit {
  private ticketService = inject(TicketService);

  backlog: Ticket[] = [];
  aFazer: Ticket[] = [];
  emAndamento: Ticket[] = [];
  emRevisao: Ticket[] = [];
  concluido: Ticket[] = [];

  ngOnInit() {
    this.carregarTickets();
  }

  carregarTickets() {
    const tickets = this.ticketService.getTickets();
    
    // Mapear status dos tickets para colunas do Kanban
    // Backlog: Aguardando
    this.backlog = tickets.filter(t => t.status === 'Aguardando');
    // A Fazer: Aberto
    this.aFazer = tickets.filter(t => t.status === 'Aberto');
    // Em Andamento: Em Andamento
    this.emAndamento = tickets.filter(t => t.status === 'Em Andamento');
    // Em Revisão: vazio por padrão (pode ser preenchido movendo cards)
    this.emRevisao = [];
    // Concluído: Resolvido
    this.concluido = tickets.filter(t => t.status === 'Resolvido');
  }

  drop(event: CdkDragDrop<Ticket[]>) {
    if (event.previousContainer === event.container) {
      // Move dentro da mesma coluna
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move entre colunas
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      // Atualizar status do ticket baseado na coluna de destino
      const ticket = event.container.data[event.currentIndex];
      this.atualizarStatusTicket(ticket, event.container.id);
    }
  }

  atualizarStatusTicket(ticket: Ticket, containerId: string) {
    switch(containerId) {
      case 'backlog':
        ticket.status = 'Aguardando';
        break;
      case 'a-fazer':
        ticket.status = 'Aberto';
        break;
      case 'em-andamento':
        ticket.status = 'Em Andamento';
        break;
      case 'em-revisao':
        ticket.status = 'Aguardando';
        break;
      case 'concluido':
        ticket.status = 'Resolvido';
        if (!ticket.dataResolucao) {
          ticket.dataResolucao = new Date().toISOString().slice(0, 16).replace('T', ' ');
        }
        break;
    }
    ticket.dataAtualizacao = new Date().toISOString().slice(0, 16).replace('T', ' ');
  }

  get totalTarefas(): number {
    return this.backlog.length + this.aFazer.length + this.emAndamento.length + 
           this.emRevisao.length + this.concluido.length;
  }

  getBadgeClassPrioridade(prioridade: string): string {
    switch(prioridade) {
      case 'Alta': return 'bg-danger';
      case 'Média': return 'bg-warning';
      case 'Baixa': return 'bg-info';
      default: return 'bg-secondary';
    }
  }

  trackByTicketId(index: number, ticket: Ticket): string {
    return ticket.id;
  }
}
