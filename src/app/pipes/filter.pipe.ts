import { Pipe, PipeTransform } from '@angular/core';
import { TransactionDTO } from '../models/transaction/transaction-dto';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(transactions: TransactionDTO[], currentPage: number = 1, pageSize: number = 5): TransactionDTO[] {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return transactions.slice(startIndex, endIndex);
  }
}
