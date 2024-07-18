import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-customer-chart',
  templateUrl: './customer-chart.component.html',
  styleUrls: ['./customer-chart.component.css'],
})
export class CustomerChartComponent implements OnInit {
  @ViewChild('chart') chart: any;
  public chartOptions: ChartOptions;

  customers: any[] = [];
  transactions: any[] = [];
  selectedCustomerId: number | null = null;
  chartData: any[] = [];

  constructor(private dataService: DataService) {
    this.chartOptions = {
      series: [
        {
          name: 'Transaction Amount',
          data: [],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      title: {
        text: 'Customer Transactions',
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Amount',
        },
      },
    };
  }

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe((data) => {
      this.customers = data;
    });

    this.dataService.getTransactions().subscribe((data) => {
      this.transactions = data;
    });
  }

  updateChart(): void {
    if (this.selectedCustomerId !== null) {
      // Ensure selectedCustomerId is a number
      const selectedId = Number(this.selectedCustomerId);

      const customerTransactions = this.transactions.filter((t) => {
        const customerId = Number(t.customer_id);
        return customerId === selectedId;
      });

      this.chartData = customerTransactions.map((t) => ({
        name: t.date,
        value: t.amount,
      }));
      this.chartOptions.series = [
        {
          name: 'Transaction Amount',
          data: this.chartData.map((d) => d.value),
        },
      ];
      this.chartOptions.xaxis = {
        categories: this.chartData.map((d) => d.name),
      };
    } else {
      this.chartOptions.series = [
        {
          name: 'Transaction Amount',
          data: [],
        },
      ];
      this.chartOptions.xaxis = {
        categories: [],
      };
    }

    // Ensure chart is defined before calling updateSeries
    if (this.chart && this.chart.updateSeries) {
      this.chart.updateSeries(this.chartOptions.series, true);
      this.chart.updateOptions(
        {
          xaxis: this.chartOptions.xaxis,
          yaxis: this.chartOptions.yaxis,
          title: this.chartOptions.title,
        },
        true,
        true
      );
    } else {
      console.error('Chart is not properly defined:', this.chart);
    }
  }
}
