import { Component, Input, inject } from '@angular/core';
import Chart from 'chart.js/auto'
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-balance-chart',
  templateUrl: './balance-chart.component.html',
  styleUrls: ['./balance-chart.component.css']
})
export class BalanceChartComponent {
  @Input() labels: string[] = [];
  @Input() income!: number[];
  @Input() expenses!: number[];

  documentBalance!: HTMLCanvasElement | null;

  createChart() {
    const labels = this.labels;
    if(this.documentBalance != null) {
      new Chart(
        this.documentBalance,
        {
          type: 'bar',
          data:  {
            labels: labels,
            datasets: [
              {
                label: 'Ingresos',
                data: this.income,
                borderRadius: 100,
                stack: 'Stack 0',
              },
              {
                label: 'Egresos',
                data: this.expenses,
                borderRadius: 100,
                stack: 'Stack 1',
              },
            ]
          }
        }
      );
    }
  }

  ngOnInit() {
    this.documentBalance = document.querySelector("#balance-chart");
    this.createChart();
  }
}
