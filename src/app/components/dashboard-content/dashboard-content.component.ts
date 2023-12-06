import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountDetailDTO } from 'src/app/models/account/account-detail-dto';
import { CardDTO } from 'src/app/models/card/card-dto';
import { Transaction } from 'src/app/models/transaction/transaction';
import { TransactionDTO } from 'src/app/models/transaction/transaction-dto';
import { TransactionReponseChartDTO } from 'src/app/models/transaction/transaction-response-chart-dto';
import { User } from 'src/app/models/user/user';
import { UserDTO } from 'src/app/models/user/user-dto';
import { AccountService } from 'src/app/services/account.service';
import { CardService } from 'src/app/services/card.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent {
  private cardService = inject(CardService);
  private userService = inject(UserService);
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);
  private router = inject(Router);

  user!: UserDTO;
  userAccount!: AccountDetailDTO;
  userTransactions: TransactionDTO[] = [];
  userCard: CardDTO = {
    cardNumber: '',
    balance: 0,
    cardHolder: '',
    validUntil: new Date()
  };
  cardholder!: string;
  incomeBalance: number = 0;
  outFlowBalance: number = 0;
  lastFourNumbersInCard: string = "";
  validUntilFormated: string = "";
  userNamesTransactions: { [idAccount: string]: string } = {};
  statusCompleted: string = "COMPLETED";
  statusCanceled: string = "CANCELED";
  statusPending: string = "PENDING";

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages!: number;

  labels: string[] = [];
  income: number[] = [];
  expenses: number[] = [];

  loadCard() {
    try {
      let userString: string | null = window.localStorage.getItem("User");
      let accountString: string | null = window.localStorage.getItem("Account");
      if (userString != null) {
        this.user = JSON.parse(userString);
        if (accountString != null) {
          this.userAccount = JSON.parse(accountString);
          this.cardService.getByUserDocument(this.user.documentNumber).subscribe(
            {
              next: (card: CardDTO) => {
                this.cardholder = `${this.user.name} ${this.user.lastname}`;
                this.lastFourNumbersInCard = `**** **** **** ${card.cardNumber.substring(12)}`;
                this.validUntilFormated = this.formateDate(card.validUntil);
                this.userCard = card;
              },
              error: (error) => {
                console.log("Error load card: " + error.message);
              }
            }
          )
        } else {
          window.localStorage.clear();
          this.router.navigate(["/"]);
        }
      } else {
        window.localStorage.clear();
        this.router.navigate(["/"]);
      }

    } catch (error) {
      console.error("Error JSON: " + error);
    }
  }

  loadIncomeBalance() {
    this.transactionService.getIncomeBalanceByAccount(this.userAccount.idAccount).subscribe(
      {
        next: (incomeBalance: number) => {
          this.incomeBalance = incomeBalance;
        },
        error: (error) => {
          console.log("Error load income balance: " + error.message);
        }
      }
    )
  }

  loadOutflowBalance() {
    this.transactionService.getOutflowBalanceByAccount(this.userAccount.idAccount).subscribe(
      {
        next: (outFlowBalance: number) => {
          this.outFlowBalance = outFlowBalance;
        },
        error: (error) => {
          console.log("Error load outflow balance: " + error.message);
        }
      }
    )
  }

  loadAllTransactions() {
    this.transactionService.getAllByAccount(this.userAccount.idAccount).subscribe(
      {
        next: (transactions: TransactionDTO[]) => {
          this.userTransactions = transactions;
          this.loadNamesOfTransactions(transactions);
          this.totalPages = Math.ceil(transactions.length / 5)
        },
        error: (error) => {
          console.log("Error load transactions: " + error.message);
        }
      }
    )
  }

  loadNamesOfTransactions(transactions: TransactionDTO[]) {
    for (let transaction of transactions) {
      const idAccount = transaction.idReceiverAccount === this.userAccount.idAccount
        ? transaction.idSenderAccount
        : transaction.idReceiverAccount;
      if (!this.userNamesTransactions[idAccount]) {
        this.userService.getByAccount(idAccount).subscribe(
          {
            next: (user: UserDTO) => {
              this.userNamesTransactions[idAccount] = user.name;
            },
            error: (error) => {
              console.log("Error loading user name by account: " + error.message);
            }
          }
        );
      }
    }
  }
  

  loadLastWeekBalance() {
    this.transactionService.getTransactionWeek(this.userAccount.idAccount).subscribe(
      {
        next: (transactionInTheLastWeek: TransactionReponseChartDTO[]) => {
          for (let transaction of transactionInTheLastWeek) {
            this.labels.push(transaction.date);
            this.income.push(transaction.receiverAmount);
            this.expenses.push(transaction.senderAmount);
          }
        },
        error: (error) => {
          console.log("Error load last weak balance: " + error.message);
        }
      }
    )
  }

  formateDate(date: Date) {
    let dateString = date.toString();
    let dateFormated: string = `${dateString.substring(5, 7)}/${dateString.substring(2, 4)}`;
    return dateFormated;
  }

  generatePageNumbers(): number[] {
    const pageNumbers = [];
    if (this.totalPages < 3) {
      pageNumbers.push(1);
      pageNumbers.push(2);
    } else {
      for (let i = this.currentPage + 1; i <= this.currentPage + 3; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  }

  nextPage() {
    if (this.currentPage + 1 <= this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage - 1 > 0) {
      this.currentPage--
    }
  }

  ngOnInit() {
    this.loadCard();
    this.loadLastWeekBalance();
    this.loadAllTransactions();
    this.loadIncomeBalance();
    this.loadOutflowBalance();
  }
}
