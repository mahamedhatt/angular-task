import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  nameFilter: string = '';
  amountFilter: number | null = null;
  customersLoaded: boolean = false;
  selectedFilter: 'name' | 'amount' | null = null; // Initialize with null or 'name' based on your default preference

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe((data) => {
      this.customers = data;
      this.customersLoaded = true;
      this.applyFilters(); // Apply filters once customers are loaded
    });

    this.dataService.getTransactions().subscribe((data) => {
      this.transactions = data;
      this.filteredTransactions = data;
    });
  }

  applyFilters(): void {
    this.filteredTransactions = this.transactions.filter((transaction) => {
      const customer = this.customers.find(
        (c) => c.id === transaction.customer_id
      );
      const nameMatches =
        customer &&
        customer.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      const amountMatches = this.amountFilter
        ? transaction.amount >= this.amountFilter
        : true;
      return nameMatches && amountMatches;
    });
  }

  filterTypeChanged(): void {
    // Method to handle change in selected filter type
    this.nameFilter = ''; // Reset name filter
    this.amountFilter = null; // Reset amount filter
    this.applyFilters(); // Apply filters with updated values
  }

  getCustomerName(customerId: number): string {
    const customer = this.customers.find((c) => c.id === customerId);

    return customer ? customer.name : 'Unknown';
  }
}
