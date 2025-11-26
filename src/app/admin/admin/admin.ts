import { Component } from '@angular/core';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent {
  users: any[] = [];
  selectedUsers: number[] = [];
  selectedFile!: File;
  message = "";

  constructor(private userService: UserService) { }

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
    if (this.selectedUsers.length === 0 || !this.selectedFile) {
      this.message = "Select at least one user and choose an image.";
      return;
    }

    this.userService.sendImageToMultipleUsers(this.selectedUsers, this.selectedFile)
      .subscribe({
        next: () => this.message = "Image sent to selected users successfully!",
        error: () => this.message = "Failed to send"
      });
  }
}
