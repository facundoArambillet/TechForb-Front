import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/models/menu-item/menu-item';
import { AuthService } from 'src/app/services/auth.service';
import { MenuItemService } from 'src/app/services/menu-item.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent {
  private menuItemService = inject(MenuItemService);
  private router = inject(Router)
  itemSelected: number = 0;
  menuItems!: MenuItem[];

  loadMenuItems() {
    this.menuItemService.getAll().subscribe(
      {
        next: (menuItems: MenuItem[]) => {
          this.menuItems = menuItems
        },
        error: (error) => {
          if(error.status == 403) {
            window.localStorage.clear();
            this.router.navigate(["/"]);
          }
          console.log("Error load menu items: " + error.message);
        }
      }
    )
  }

  toogleItemSelected(positionItem: number) {
    this.itemSelected = positionItem;
  }
  logOut() {
    window.localStorage.clear();
    this.router.navigate(['/']);
  }
  ngOnInit() {
    this.loadMenuItems();
  }
}
