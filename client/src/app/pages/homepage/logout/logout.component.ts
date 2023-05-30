import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  confirmModal?: NzModalRef;

  constructor(
    private modal: NzModalService,
    public authService: AuthService,
    private router: Router
  ) {}

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Confirm Logout?',
      nzContent: '',
      nzOkText: 'Yes',
      nzCancelText: 'Cancel',
      nzOnOk: async () =>
        new Promise((resolve, reject) => {
          setTimeout(resolve, 500);
        }).then(() => {
          this.authService.SignOut();
        }),
    });
  }
}
