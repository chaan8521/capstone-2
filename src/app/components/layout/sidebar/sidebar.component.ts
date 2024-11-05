import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'] // Corrected to styleUrls
})
export class SidebarComponent {
  @Input() active!: boolean;
  sideItems: MenuItem[] = [];
  userName:String | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadModules();
    this.userName = localStorage.getItem('userName');
    
  }
  
  loadModules() {
    let userType = localStorage.getItem('userType');

    if(userType == "Student"){
      this.sideItems = [
       
        {
          label: 'Evaluation',
          icon: 'pi pi-desktop',
          routerLink: '/application/evaluation',
        },
      
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          items: [
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => this.logout(), 
            },
          ],
        },
      ];
    }
    else if(userType == "Teacher"){
      this.sideItems = [
          
        {
          label: 'Schedule',
          icon: 'pi pi-desktop',
          routerLink: '/application/schedule',
        },
        {
          label: 'Result',
          icon: 'pi pi-table',
          routerLink: '/application/result',
        },
      
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          items: [
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => this.logout(), 
            },
          ],
        },
      ];
    }else{
      this.sideItems = [
        {
          label: 'User',
          icon: 'pi pi-user',
          routerLink: '/application/user',
        },
        {
          label: 'Department',
          icon: 'pi pi-user',
          routerLink: '/application/department',
        },
        {
          label: 'Assigned Schedule',
          icon: 'pi pi-calendar',
          routerLink: '/application/assigned-schedule',
        },
        {
          label: 'Questionnaire',
          icon: 'pi pi-file',
          routerLink: '/application/questionaire',
        },
        
        {
          label: 'Subject',
          icon: 'pi pi-book',
          routerLink: '/application/subject',
        },
        {
          label: 'Schedule',
          icon: 'pi pi-clock',
          routerLink: '/application/schedule',
        },
        {
          label: 'System Table',
          icon: 'pi pi-table',
          routerLink: '/application/system-table',
        },
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          items: [
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => this.logout(), 
            },
          ],
        },
      ];
    }
   
  }

  logout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    this.router.navigate(['/login']);
  }
}
 