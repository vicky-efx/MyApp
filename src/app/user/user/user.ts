import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Websocket } from '../../services/websocket';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/userService';


@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent {
  userId!: number;
  images: any[] = [];
  wsSub!: Subscription;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private ws: Websocket
  ) { }

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    this.userId = user!.id;

    console.log('user',user)
    console.log('ID',this.userId)

    this.loadImages();
  }

  loadImages() {
    this.userService.getUserImages(this.userId).subscribe(res => {
      this.images = res.map((img: any) => ({
        ...img,
        imagePath: img.imagePath || img.url || img  // adjust if your API returns the full string directly
      }));
      console.log("Images loaded:", this.images);
    });
  }

}
