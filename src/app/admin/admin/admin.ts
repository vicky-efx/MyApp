import { Component } from '@angular/core';
import { UserService } from '../../services/userService';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent {
  users: any[] = [];
  selectedUsers: number[] = [];
  selectedFile!: any;
  message = "";

  constructor(private userService: UserService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(res => this.users = res);
  }

  toggleUser(e: any) {
    const userId = Number(e.target.value);

    if (e.target.checked) {
      this.selectedUsers.push(userId);
    } else {
      this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
    }
  }

  onFileChange(e: any) {
    this.selectedFile = e.target.files[0];
  }

  send() {
    // Validation
    if (this.selectedUsers.length === 0 || !this.selectedFile) {
      this.message = "Select at least one user and choose an image.";
      return;
    }

    // Call service to send image
    this.userService.sendImageToMultipleUsers(this.selectedUsers, this.selectedFile)
      .subscribe({
        next: () => {
          // Success message
          this.message = "Image sent to selected users successfully!";

          // Reset selections
          this.selectedUsers = [];
          this.selectedFile = undefined;

          // Reset checkboxes in the DOM
          const checkboxes = document.querySelectorAll<HTMLInputElement>('.user-item input[type="checkbox"]');
          checkboxes.forEach(cb => cb.checked = false);

          // Reset file input
          const fileInput = document.querySelector<HTMLInputElement>('.file-input-wrapper input[type="file"]');
          if (fileInput) fileInput.value = '';

        },
        error: () => {
          this.message = "Failed to send";
        }
      });
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['/']); // redirect to login or home page
  }
}
