import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService, Iblog } from '../service/blog.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CreatepostComponent } from '../createpost/createpost.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private http: BlogService, private toastr: ToastrService, private dialog: MatDialog, private router: Router) { }
  displayedColumns: string[] = ['id', 'title', 'description', 'edit', 'delete'];
  getData: Iblog[] = [];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource!: Iblog[] | any;
  @ViewChild(MatSort) sort!: MatSort

  ngOnInit() {
    this.getBlogData();
  };

  getBlogData() {
    this.http.getBlog().subscribe((data: Iblog[] | any) => {
      this.getData = data?.results;
      this.dataSource = new MatTableDataSource<Iblog>(this.getData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      // console.log(this.getData)
    });
  };

  editData(data: Iblog) {
    const dialogRef = this.dialog.open(CreatepostComponent, {
      width: '50%',
      // height: '65%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: "2000ms",
      data
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.getBlogData();
      }
    });


    // this.router.navigate(['/createpost'], { state: { editData: element } });

    // console.log(element)
  };

  deleteData(id: any) {
    this.http.deleteData(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Post deleted successfully')
        this.getBlogData()
      }
    }

    )
    // console.log(id)
  };

  logout() {
    this.http.logout();
    this.toastr.success('Logout Sucessfully');
  };

}