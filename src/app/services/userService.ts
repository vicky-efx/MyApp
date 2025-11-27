import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserModel {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export interface UserImage {
  id: number;
  imageUrl: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/users`);
  }

  getUserById(id: number) {
    return this.http.get<UserModel>(`${environment.apiUrl}/users/${id}`);
  }

  sendImageToMultipleUsers(userIds: number[], file: File) {
    const fd = new FormData();
    fd.append('file', file);

    userIds.forEach(id => fd.append('userIds', id.toString()));

    return this.http.post(
      `${environment.apiUrl}/admin/send-image-multiple`,
      fd,
      { responseType: 'text' }
    );

  }

  getUserImages(userId: number) {
    const params = new HttpParams().set('userId', String(userId));
    return this.http.get<UserImage[]>(`${environment.apiUrl}/user/images`, { params });
  }
}
