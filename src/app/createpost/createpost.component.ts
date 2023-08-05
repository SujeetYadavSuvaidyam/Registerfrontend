import { Component, Inject } from '@angular/core';
import { BlogService, Iblog } from '../service/blog.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent {
  constructor(private httpblog: BlogService,
    private builder: FormBuilder, private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public editData: Iblog, private toast: ToastrService, private dialog: MatDialogRef<CreatepostComponent>) { }

  actionbtn: string = 'Post Blog'
  receivedData: any;

  postblog = this.builder.group({
    title: this.builder.control('', Validators.compose([Validators.required])),
    description: this.builder.control('', Validators.compose([Validators.required])),
  });
  ngOnInit() {
    
    console.log(this.editData)
    this.updatesetValue()
    
  }
  proceedBlog() {
    if (!this.editData) {
      if (this.postblog.valid) {
        this.httpblog.postBlog(this.postblog.value as Iblog).subscribe((res) => {
          console.log(res)
          this.toast.success('Post Created Successfully');
          this.router.navigate(['/home'])
        })
      } else {
        this.toastr.warning('Please enter valid data Post')
      }
    } else {
      this.updateBlogdata()
    }
    this.postblog.reset()
  }

  updatesetValue() {
    if (this.editData) {
      this.actionbtn = 'UpdatePost'
      this.postblog.controls.title.setValue(this.editData.title)
      this.postblog.controls.description.setValue(this.editData.description)
    }
  }

  updateBlogdata() {
    this.httpblog.updateData(this.editData.id as unknown  as Iblog, this.postblog.value as Iblog,).subscribe((res) => {
      console.log(res)
      this.dialog.close()
    })
  }
}
