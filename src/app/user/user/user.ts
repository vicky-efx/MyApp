import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/userService';


@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent implements OnInit, OnDestroy {
  userId!: number;
  images: any[] = [];
  wsSub!: Subscription;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private cd: ChangeDetectorRef

  ) { }

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    if (!user) return;  // safety check
    this.userId = user.id;

    this.loadImages();
  }

  loadImages() {
    this.userService.getUserImages(this.userId).subscribe(res => {
      this.images = res.map((img: any) => ({
        ...img,
        imagePath: "data:image/jpeg;base64," + img.base64Image
      }));
      console.log("Images loaded:", this.images);

      // Force Angular to update view
      this.cd.detectChanges();
    });
  }

  logout() {
    this.auth.logout();
  }


  ngOnDestroy() {
    if (this.wsSub) this.wsSub.unsubscribe();
  }

}
